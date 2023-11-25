const jwt = require("jsonwebtoken");
const SendOtp = require("sendotp");
const express = require('express');
const twilio =require('twilio');
require('events').EventEmitter.defaultMaxListeners = 15;

const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
require("dotenv").config();

//#region send sms
const sendSMS =(req,res)=>{
    const client = new twilio(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN);
    return client.messages.create({
        from:process.env.FROM_PHONE,
        body:req.body.message,
        to:process.env.TO_PHONE
    }).then(message=> res.status(200).json(message))
        .catch(err=>res.status(400).json(err.message))
}

//#region sendOtp
const sendOtp = new SendOtp(process.env.AUTH_KEY)
const sendOTP = (req, res) => {
   sendOtp.send(req.body.mobile || process.env.PHONE, process.env.TWILIO_SID, (err, data) => {
      if (err) return res.json({ error: err.message });
      data.type == 'success' ? res.json({ success: data.type }) : res.json({ success: false });
   })
}



//#region verifyOTP
const verifyOTP = async (req, res) => {
   let otp = Math.floor(100000 + Math.random() * 999999);
   console.log(otp)
   sendOtp.verify(req.body.mobile || process.env.TO_PHONE, req.body.otp || otp, (err, data) => {
      if (data.type == "success") {
         let { mobile } = req.body.mobile;
         User.findOne({ mobile }, (err, user) => {
            if (err) return res.json({ err })
            if (!user) {
               User.create(req.body, (err, data) => {
                  if (err) return res.json({ err });
                  jwt.sign({ userId: _id, mobile: user.mobile }, process.env.AUTH_KEY, (err, signuptoken) => {
                     if (err) return res.json({ err });
                     res.json({
                        success: true,
                        signuptoken,
                        userId: user._id,
                        message: 'register successfully'
                     })
                  })
               })
            }
            if (user) {
               jwt.sign({
                  userId: user._id,
                  mobile: user.mobile
               }, process.env.AUTH_KEY, (err, logintoken) => {
                  if (err) return res.json({ err });
                  res.json({
                     logintoken,
                     userId: user._id
                  })
               })
            }
         })
      }
      if (data.type == 'error') {
         res.json({
            success: false,
            message: data.message
         })
         console.log(data)
      }
   })
}
//#region phase 2
//#region api User
const apiUser= async (req, res) => {
	try {
		const data = validate(req.body);

		if (data.error) {

			return res.status(404).send({ message: data.error });
		}

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email Leave Annual", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
};

//#region verify User
const verifyUser= async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) {
			return res.status(400).send({ message: "Invalid link" });
		} else {
			await User.updateOne({ _id: user._id, verified: true });
			await token.deleteOne();

			return res.status(200).send({ message: "Email verified successfully" });
		}

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error", err: error.message });
	}
};


module.exports = { sendOTP, verifyOTP,sendSMS,apiUser,verifyUser }
