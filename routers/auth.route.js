const route=require("express").Router()
const AuthController=require('../controllers/auth.controller')
const body=require('express').urlencoded({extended:true})
const guardAuth=require("./guardAuth")

route.get("/login",guardAuth.isNotAuth,AuthController.getLoginPage)
route.get("/register",guardAuth.isNotAuth,AuthController.getRegisterPage)



route.post("/register",body,AuthController.postRegisterPage)
route.post("/login",body,AuthController.postLoginPage)
route.post("/logout",body,AuthController.postLogoutPage)

module.exports=route