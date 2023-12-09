const express=require('express');
const router=express.Router();
const userController=require("../controller/userController");
const passport=require('passport');

router.post("/signin", passport.authenticate('local', { failureRedirect: '/signin' }),userController.signIn)
router.post('/signup',userController.signUP);
router.get('/getuser',userController.getUser);

module.exports=router;