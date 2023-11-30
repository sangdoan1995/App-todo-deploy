import mongoose from "mongoose";

export interface IPrice extends mongoose.Document {
  date: string,
  last_price: string,
  opening_price: string,
  highest_price: string,
  lowest_price: string,
  volume: string,
  change_percent: string,
}
export interface IPriceModel extends IPrice, mongoose.Document {
  billingAddress(): string;
  comparePassword(password: string, cb: any): string;
  validPassword(password: string, cb: any): string;
  gravatar(_size: number): string;
}
