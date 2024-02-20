

const jwt = require("jsonwebtoken");
require("dotenv").config();

// Next is used for follow up middleware
// auth middlerware is used to check you are valid user or not. 
// It is used for authentication of user.
exports.auth = (req,res,next)=>{
    try{
        // Extract JWT Token
        // Pending: other ways to fetch token
        // Bearer token is much safer than other ways to parse token.why??
        const token = req.cookies.token|| req.body.token || req.header("Authorization").replace("Bearer ","");
        console.log("cookie",req.cookies.token);
        console.log("cookie",req.body.token);
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token Missing'
            });
        }
        // Verify the token
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;
            console.log(payload);
            
        
        }catch(err){
            res.status(401).json({
                success:false,
                message:"Something went wrong after veryfying"
            })
        }
        next();

    }catch(err){
        console.log(err);
        return res.json(401).json({
            success:true,
            message:"Something went wrong after veryfying"
        });
    }
}
// It is used for a authorization of user that is it student or not.
exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for student"
            });
        }
        next();
    } catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        });
    }
}
// It is used for a authorization of user that is it admin or not.
exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin"
            });
            
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        });
    }
}
// HW - What is cookie parser