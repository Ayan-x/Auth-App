const express = require("express");
const router = express.Router();

const{login,signup} = require("../Controllers/Auth");
const{auth,isStudent,isAdmin} = require("../middlerware/auth");

router.post("/login",login);
router.post("/signup",signup);

// Protected route

router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for Test'
    })
})
    

router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for Student'
    })
})

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for Admin'
    })
})

module.exports=router;