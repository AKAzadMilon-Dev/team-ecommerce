const User = require('../models/User')
const token = require('../utils')
var bcrypt = require('bcryptjs');

const registrationController = (req,res)=>{
    const {name,email,password,confirmpassword} = req.body

    if(!name || !email || !password || !confirmpassword){
        return res.status(400).json({success:false,meg:"please fill form"})
    }
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return res.status(400).json({success:false,meg:"please enter valid email"})
    }
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)){
        return res.status(400).json({success:false,meg:"please enter valid password ('Min 1 uppercase,Min 1 lowercase,Min 1 number,Min 8 characters')"})
    }

    if(password != confirmpassword){
        return res.status(400).json({success:false,meg:"Confirm Password does not match"})
    }
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, async(err, hash)=>{
            const newuser = new User({
                name:name,
                email:email,
                password:hash
            })
            await newuser.save()
            return res.status(200).json({success:true,meg:"create successul"})
        });
    });
}

const loginController = async (req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(!req.body.email || !req.body.password ){
        return res.status(400).json({success:false,meg:"please fill form"})
    }
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:token(user)
            })
            return
        }else{
            return res.status(401).send({success:false,meg:"Invelid Password"})
        }
    }else{
        return res.status(401).send({success:false,meg:"Invelid Email"})
    }
}

module.exports = {registrationController,loginController}