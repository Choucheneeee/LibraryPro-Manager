const express=require("express")
const logger=require("morgan")
const mongo=require('mongoose')
const path=require("path")
const app=express()
const RouterBook= require('./routers/book')
const RouterAuth= require('./routers/auth.route')


app.set('view engine','ejs')
app.use(logger("dev"))
app.use(express.static(path.join(__dirname,'assets')))




app.use("/",RouterBook)
app.use("/",RouterAuth)



app.get("/contact",(req,res)=>{
    res.render("contact")

})

app.get("/about",(req,res)=>{
    res.render("about")

})
app.get("/product",(req,res)=>{
    res.render("product")

})

app.get("/login",(req,res)=>{
    res.render("login")

})







app.listen(3000,()=>{console.log("server is running on port 3000")}) 