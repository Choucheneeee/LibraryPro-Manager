const authModel=require('../models/auth.model')






exports.getRegisterPage=(req,res)=>{
    const errorMessage = req.flash('error')[0]; // Retrieve the flash message
    console.log("Flash message:", errorMessage); // Debug log
    res.render('register',{
        verifUser:req.session.userId,
        message:errorMessage
    })
    
    

}
exports.postRegisterPage=(req,res)=>{
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send('All fields are required');
    }
    authModel.registerFunModel(req.body.name,req.body.email,req.body.password)
    .then((user)=>{
     res.render('login')
    }).catch((err)=>{
    console.log(err)
    req.flash('error',err)
    res.redirect('/register')
     
    })
 
 }


 exports.getLoginPage=(req,res)=>{
    res.render('login',{
        verifUser:req.session.userId,
        message:req.flash('error')[0]

    })

}

exports.postLoginPage=(req,res)=>{
    if (!req.body.email || !req.body.password) {
        return res.status(400).send('All fields are required');
    }
    authModel.loginFunModel(req.body.email,req.body.password).then((id)=>{
        console.log("id controller",id)
        req.session.userId=id
        res.redirect('/')


    }).catch((err)=>{
        console.log(err)
        req.flash('error',err)
        res.redirect('/login')

    })
 
 }
exports.postLogoutPage=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/login',)
    })


 }