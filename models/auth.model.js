const { name } = require('ejs')
const mongo = require('mongoose')

var schemaAuth=mongo.Schema({
    name:String,
    email:String,
    password:String

})

var User=mongo.model("user",schemaAuth)

exports.registerFunModel=()=>{
    
}