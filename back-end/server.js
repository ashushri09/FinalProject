require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Authentication = require("./src/Routes/Authentication");
const app = express();
const {MONGO_URI , JWT_SECRET1} = require("./tokens")
const logger = require("./Config/logger")


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = process.env.PORT || 4444;


const uri = process.env.ATLAS_URI || MONGO_URI;
mongoose.connect(uri,{ useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true })
.then(()=>{
    console.log("Database is connected");
})
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, content-Type, Accept, Authorization"
    )
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD')
    next();
    })
app.use("/",Authentication);

app.get("/",(req,res)=>{
    res.send("hello ashutosh shrivastava");
})

app.listen(4444,()=>{
    console.log(`Server is running on port :${port}`);
    logger.log("info",`Server is running on port :${port}`);
})

module.exports = app;