const authModel=require('../models/auth.model')






exports.getRegisterPage=(req,res)=>{
    const errorMessage = req.flash('error')[0]; // Retrieve the flash message
    console.log("Flash message:", errorMessage); // Debug log
    res.render('register',{
        verifUser:req.session.userId,
        message:errorMessage|| null 
    })
    
    

}
exports.postRegisterPage = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        req.flash('error', 'All fields are required')[0];
        return res.redirect('/register');
    }

    authModel.registerFunModel(req.body.name, req.body.email, req.body.password)
        .then((user) => {
            res.render('login');
        })
        .catch((err) => {
            console.log(err);
            req.flash('error', err)[0]; // Store error message in flash
            res.redirect('/register'); // Redirect to the register page
        });
};



 exports.getLoginPage=(req,res)=>{
    res.render('login',{
        verifUser:req.session.userId,
        message:req.flash('error')[0]

    })

}

exports.postLoginPage = (req, res) => {
    if (!req.body.email || !req.body.password) {
        req.flash('error', 'All fields are required')[0];
        return res.redirect('/login');
    }

    authModel.loginFunModel(req.body.email, req.body.password)
        .then((id) => {
            console.log("id controller", id);
            req.session.userId = id;
            res.redirect('/'); // Redirect to home page
        })
        .catch((err) => {
            console.log(err);
            req.flash('error', err)[0]; // Store error message in flash
            res.redirect('/login'); // Redirect to login page
        });
};

exports.postLogoutPage=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/login',)
    })


 }