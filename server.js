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

var Store=new MongoDbStore({
    uri: 'mongodb+srv://chouchene:chouchene@cluster0.w51ol.mongodb.net/Library?retryWrites=true&w=majority&appName=Cluster0',
    collection:"session",

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
app.get("/product",(req,res)=>{
    res.render("product",{verifUser:req.session.userId})

})







app.get('/get-ip', async (req, res) => {
    try {
        const { data } = await axios.get('https://api64.ipify.org?format=json');
        res.send(`Render Public IP: ${data.ip}`);
        console.log(data.ip)
    } catch (err) {
        res.status(500).send('Error fetching IP address');
    }
});

const mongoose = require('mongoose');

const url = process.env.MONGO_URI || 'mongodb+srv://chouchene:chouchene@cluster0.w51ol.mongodb.net/Library?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(url)

.then(() => console.log('Connected to MongoDB',url))
.catch((err) => console.error('Database connection error:', err));


app.listen(PORT,()=>{console.log("server is running on port ",PORT)}) 