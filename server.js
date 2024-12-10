const express=require("express")
const logger=require("morgan")
const mongo=require('mongoose')
const path=require("path")
const flash=require("connect-flash")
const app=express()
const session=require("express-session")
const MongoDbStore=require("connect-mongodb-session")(session)

const RouterBook= require('./routers/book')
const RouterAuth= require('./routers/auth.route')
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads


app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'assets')))

var Store=new MongoDbStore({
    uri: 'mongodb://localhost:27017/Library',
    collection:"session",

})
app.use(flash())
app.use(session({
    secret:'Secret Key',
    cookie:{
        maxAge: 900000
    },
    store:Store,
    resave:true,
    saveUninitialized:true,

}))

app.use("/",RouterBook)
app.use("/",RouterAuth)


app.get("/contact",(req,res)=>{
    res.render("contact",{verifUser:req.session.userId})

})

app.get("/about",(req,res)=>{
    res.render("about",{verifUser:req.session.userId})

})
app.get("/product",(req,res)=>{
    res.render("product",{verifUser:req.session.userId})

})








app.listen(3000,()=>{console.log("server is running on port 3000")}) 