import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import {IPriceModel} from "../interfaces/IPrice";

const PriceSchema = new mongoose.Schema({
  'date': {type: String, required: true},
  'last_price': {type: String, required: true},
  'opening_price': {type: String, required: true},
  'highest_price': {type: String, required: true},
  'lowest_price': {type: String, required: true},
  'volume': {type: String, required: true},
  'change_percent': {type: String, required: true},
});

const validate = (data) => {
  // const schema = Joi.object({
  //   firstName: Joi.string().required().label("First Name"),
  //   lastName: Joi.string().required().label("Last Name"),
  //   email: Joi.string().email().required().label("Email"),
  //   password: passwordComplexity().required().label("Password"),
  // });
  //
  // return schema.validate(data);
};

// module.exports = {Price, validate};
const Price = mongoose.model<IPriceModel>('Price', PriceSchema);

export default Price;