const route=require("express").Router()
const AuthController=require('../controllers/auth.controller')

route.get("/register",AuthController.getRegisterPage)

module.exports=route