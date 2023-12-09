const express=require('express');
const router=express.Router();
const passport=require("passport");
const userController=require("../controller/userController")
router.get('/signin', userController.loginRedirect);
router.use('/user',require('./user'));

module.exports=router;