const mongoose = require("mongoose");

require("dotenv").config();

exports.Connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).
    then(()=>{console.log("DB connection successfull")})
    .catch((err)=>{
        console.log("DB connection issues");
        console.log(err);
        process.exit(1);
    })
}

