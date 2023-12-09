
const User = require("../model/user")

module.exports.loginRedirect=async function(req,res){
   return res.status(402).json({"err":"invalid password"})
}
module.exports.signIn=async function(req,res){
    try{
        const{email}=req.body;
       
       return res.status(200).json({"mess":"success","userinfo":`${email}`})
    }catch(err){
        console.log(err)
    }



}

module.exports.signUP = async function (req, res) {


    try {


        console.log("sign up call")
        console.log(req.body)

        //user find out via email
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (user.password != req.body.password) {
                return res.status(422).json({ "err": "Password Mismatch" })

            }

            return res.status(422).json({ "err": "emai exist" })


        } else {
            const userres = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            if (userres) {
                return res.status(200).json({ "mess": "signup" })
            }

        }

    } catch (err) {
        console.log(err)
    }



}
module.exports.getUser=(req,res,next)=>{
    console.log(res.user)
    console.log(req.session)

}