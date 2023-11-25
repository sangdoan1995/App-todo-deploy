require("dotenv").config();

module.exports = {
    HOST: process.env.HOST,
    PORT: process.env.EMAIL_PORT,
    USERNAME: process.env.USER,
    PASSWORD: process.env.PASS,
    FROM_USER: process.env.FROM_USER
}