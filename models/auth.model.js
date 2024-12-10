const mongo = require('mongoose')
const bcrypt=require("bcrypt")
var schemaAuth=mongo.Schema({
    name:String,
    email:String,
    password:String

})

var User=mongo.model("user",schemaAuth)
var url="mongodb://localhost:27017/Library"
exports.registerFunModel=(name,email,password)=>{
    // test email if exit 
    //(true go to login)
    //(false add this user to collection)

    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{

        
        return User.findOne({email:email})

        }).then((User)=>{
            if(User){
                mongo.disconnect()
                reject('email is used try to login')
            }
            else{
                return bcrypt.hash(password,10)
            }
            
        }).then((hpassword)=>{
            let user=new User({
                name:name,
                email:email,
                password:hpassword
            })
                return user.save()
        }).then((user)=>{
                if (user) {
                    mongo.disconnect();
                    resolve('User added successfully');
                }
            }).catch((err)=>{
                mongo.disconnect()
                reject(err)
        
            })

        })
    
}

exports.loginFunModel=(email,password)=>{
    // test email if exit 
    //(true go to login)
    //(false add this user to collection)

    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{

        console.log("connected to database to login")
        return User.findOne({email:email})

        }).then((user)=>{
            if(user){
                console.log("user exist")
                bcrypt.compare(password,user.password).then((verif)=>{
                    if(verif){  
                        mongo.disconnect()
                        resolve(user._id)
                    }
                    else{
                        mongo.disconnect()
                        reject('password is incorrect')
                        }
                })
            } 
            else{
                    mongo.disconnect()
                    reject('Invalide Email')
                }
            
           
            
        }).catch((err)=>{
            mongo.disconnect()
            reject(err)
            })
        
            })
        }