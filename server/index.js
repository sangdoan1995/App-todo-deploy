require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const webRouter = require("./routes/router")
require('dotenv').config()
// const https = require("https");
// const fs = require("fs");

// const options = {
//     key: fs.readFileSync("/home/dds/key.pem"),
//     cert: fs.readFileSync("/home/dds/cert.pem"),

// }
// const server = https.createServer(options, (req, res) => {
//     res.end('hello sangdoan')
// })
// database connection
connection();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
// app.use(function(req,res,next){
//     next(createError(404))
// });
// app.use(function(err,req,res,next){

//     res.status(err.status||500);
//     res.json({err})
// })

// routes
webRouter(app);
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, console.log(`Listening on port ${port}...`));
// const port = 443;
// server.listen(port, () => {
//     console.log(`server run port${port}....`)
// })
