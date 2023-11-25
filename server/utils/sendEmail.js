'use strict';
const nodemailer = require("nodemailer");
const mailconfig = require("../config/mailConfig");
const SMTPServer = require('smtp-server').SMTPServer;
const fs = require('fs');
const tls = require('tls');
const path = require('path')

require('dotenv').config()

module.exports = async (toemail, subject, url) => {
	// const checkTLS = () => {
	// 	const socket = tls.connect({
	// 		host: mailconfig.HOST,
	// 		port: mailconfig.PORT
	// 	}, () => {
	// 		console.log('Connected to SMTP server');
	// 	});

	// 	socket.on('secureConnect', () => {
	// 		console.log(socket)
	// 		SendMailAfterSocket(socket)
	// 		console.log('Secure TLS connection established');
	// 		// Continue with your logic here
	// 	});

	// 	socket.on('close', () => {
	// 		console.log('Connection closed');
	// 	});

	// 	socket.on('error', (err) => {
	// 		console.error('Error:', err.message);
	// 	});
	// }

	// const SendMailAfterSocket = async (socket) => {
	let transporter = nodemailer.createTransport({
		host: mailconfig.HOST,
		// host: '127.0.0.1',
		port: mailconfig.PORT,
		secure: false,
		auth: {
			// user: 'sangdd@admin.com',
			user: 'sangdoan123456789@gmail.com',
			pass: 'grntmhbgrxbcfool'
			// pass: 'Ducsang1995py@',
		},
		// requireTLS: true,


		tls: {
			// ca: [fs.readFileSync(path.resolve(__dirname, '../../../../cert.pem'))],
			// ciphers: "SSLv3",
			// maxVersion: "TLSv1.2",
			rejectUnauthorized: false,
			// // secureProtocol: "TLSv2_method"
		}
	});

	let mailOptions = {
		// from: '"admin DUSA"<sangdd@admin.com>',
		from: '"📧 ADMIN_KHDT_MOBIFONE 📧 "<sangdoan123456789@gmail.com>',
		to: toemail,
		subject: subject,
		text: url,
	};

	let info = await transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log("Error send mail " + err);
		} else {
			console.log("Send Mail Success " + data.messageId)
		}
	})
	console.log(`Message sent `, mailOptions)


	// socket.end();

	// }
	// checkTLS();
	// transporter.verify(function (err, success) {
	// 	if (err) {
	// 		console.log("err" + err)
	// 	} else {
	// 		console.log('Server is ready to take our messages' + success)
	// 	}
	// 



	// const server = new SMTPServer({
	// 	secure: false,
	// 	authOptional: true,
	// 	onData(stream, callback) {
	// 		let message = '';
	// 		stream.on('data', (chunk) => {
	// 			message += chunk;
	// 		});

	// 		stream.on('end', () => {
	// 			const email = {
	// 				from: mailconfig.FROM_USER,
	// 				to: toemail,
	// 				subject: subject,
	// 				text: url,
	// 			};

	// 			// Gửi email bằng Nodemailer
	// 			sendEmail(email);

	// 			callback();
	// 		});
	// 	},
	// });

	// // Khởi động máy chủ SMTP
	// server.listen(2525, 'localhost', (data) => {

	// 	console.log('SMTP server is running on localhost:2525');
	// 	console.log("Server sent...", data.messageId)
	// });

	// // Hàm gửi email bằng Nodemailer
	// const sendEmail = (email) => {
	// 	const transporter = nodemailer.createTransport({
	// 		host: 'localhost',
	// 		port: 2525,
	// 		secure: false,
	// 	});

	// 	transporter.sendMail(email, (error, info) => {
	// 		if (error) {
	// 			return console.error("Send Mail Error", error);
	// 		}
	// 		console.log('Email sent:', info.messageId);
	// 	});
	// }
};
