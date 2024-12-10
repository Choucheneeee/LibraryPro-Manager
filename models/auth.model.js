const mongo = require('mongoose')
const bcrypt=require("bcrypt")
var schemaAuth=mongo.Schema({
    name:String,
    email:String,
    password:String

})

var User=mongo.model("user",schemaAuth)
const url = process.env.MONGO_URI || 'mongodb+srv://chouchene:chouchene@cluster0.w51ol.mongodb.net/Library?retryWrites=true&w=majority&appName=Cluster0';
console.log('url',url)
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
                reject('The email address is already in use. Please try logging in.');
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
                    resolve('User registered successfully.');
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

            console.log("Successfully connected to the database for login.");
            return User.findOne({email:email})

        }).then((user)=>{
            if(user){
                console.log("User exists");
                bcrypt.compare(password,user.password).then((verif)=>{
                    if(verif){  
                        mongo.disconnect()
                        resolve(user._id)
                    }
                    else{
                        mongo.disconnect()
                        reject('The password entered is incorrect.');
                    }
                })
            } 
            else{
                    mongo.disconnect()
                    reject('Invalid email address.');
                }
            
           
            
        }).catch((err)=>{
            mongo.disconnect()
            reject(err)
            })
        
            })
        }