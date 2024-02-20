const express = require("express");
const app = express();
const userRoutes = require("./routes/user")
require("dotenv").config();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT||3000;

app.use(express.json());
// Used to parse the cookie
app.use(cookieParser());
app.use("/api/v1",userRoutes);
require("./config/database").Connect();
app.listen(PORT,()=>{
    console.log(`APP is listening at ${PORT}`)
})