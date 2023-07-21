//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyparser= require("body-parser");
const mongoose = require("mongoose");
const md5 = require("md5");
const app = express();


app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}))
app.set("view engine", "ejs")
mongoose.connect("mongodb://127.0.0.1:27017/usersDB", {useNewUrlParser : true})

const userSchema =  new mongoose.Schema({
    email: String,
    password: String
})


const User = new mongoose.model("User", userSchema)



app.get("/", (req,res)=>{
    res.render("home")
})

app.get("/login", (req,res)=>{
    res.render("login")
})

app.get("/register", (req,res)=>{
    res.render("register")
})

app.post("/register", (req,res)=>{
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)

    })
    newUser.save(res.render("secrets"));
})

    



app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = md5(req.body.password)

    try {
        const foundUser = await User.findOne({email : username}) 
         if(foundUser.password === password){
            res.render("secrets")
        }
    
    } catch (err) {console.log(err) }

});


    










app.listen(3000, ()=>{
    console.log("server started")
})