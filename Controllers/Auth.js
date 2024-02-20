const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async(req,res)=>{
    try{
        // get data
        const{name,email,password,role} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                sucess:false,
                message:'User already Exists'
            })
        }
        let hashedPassword;
        // 10 means rounds of hashing
        try{
            hashedPassword = await bcrypt.hash(password,10);
            
        }catch(err){
            return res.status(500).json({
                success:false,
                message:'Error in hashing Password'
            })
        }
        // create entry for User
        const user = await User.create({
            name,email,password:hashedPassword,role
        })
        return res.status(200).json({
            success:true,
            message:"User Created Successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be created, Please try again"
        })
    }
}

exports.login = async(req,res)=>{
    try{
        // Fetch data
        const{email,password} = req.body;
        //  Check for correct registration
        if((!email) || (!password)){
            return res.status(400).json({
                success:false,
                message:"Fill the details correctly"
            })
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not registered"
            })
        }
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role
        }
        if(await bcrypt.compare(password,user.password)){
            // password match
            // Creation of token using jwt.sign() 
            let token = jwt.sign(payload,
                        process.env.JWT_SECRET ,
                        {
                            expiresIn:"2h",
                        }   );
            user = user.toObject();
            // We are passing token in user to verify user on middleware
            // by taking data from token
            user.token = token;
            user.password = undefined;
            const options={
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully"

            })
        }else{
            return res.status(403).json({
                sucess:false,
                message:"Password Incorrect"
            })
        }


    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Login Failure"
        })
    }
}