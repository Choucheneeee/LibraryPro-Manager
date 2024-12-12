const express=require("express")
const logger=require("morgan")
const mongo=require('mongoose')
const path=require("path")
const flash=require("connect-flash")
const app=express()
const session=require("express-session")
const MongoDbStore=require("connect-mongodb-session")(session)
const PORT = process.env.PORT || 3000;
const axios = require('axios');
require('dotenv').config();



const RouterBook= require('./routers/book')
const RouterAuth= require('./routers/auth.route')
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads


app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'assets')))
const url=process.env.url;

var Store=new MongoDbStore({
    uri:url,
    collection:"session",
    connectionOptions: {
        serverSelectionTimeoutMS: 30000, // Wait 30 seconds for server selection
    },

})

app.use(session({
    secret:'Secret Key',
    cookie:{
        maxAge: 900000
    },
    
    store:Store,
    resave:false,
    saveUninitialized:true,

}))
app.use(flash())

app.use("/",RouterBook)
app.use("/",RouterAuth)


app.get("/contact",(req,res)=>{
    res.render("contact",{verifUser:req.session.userId})

})

app.get("/about",(req,res)=>{
    res.render("about",{verifUser:req.session.userId})

})


app.listen(PORT,()=>{console.log("server is running on port ",PORT)}) 