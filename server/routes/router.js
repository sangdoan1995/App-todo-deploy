const express =require('express');
const controller =require("../controller/UserController");
const authController = require("../controller/AuthController.js")
const router = express.Router();

const webRouter = (app)=>{

    router.post('/sendotp',controller.sendOTP);
    router.post('/sendsms',controller.sendSMS);
    router.post('/verify',controller.verifyOTP);

    router.get('/api/users/:id/verify/:token',controller.verifyUser);
    router.post('/api/users',controller.apiUser);
    
    router.post('/api/auth',authController.authLogin);

    
    return app.use('/',router)
}
module.exports=webRouter;
