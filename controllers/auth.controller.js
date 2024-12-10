const authModel=require('../models/auth.model')







exports.postRegisterPage = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        req.flash('error', 'All fields are required');
        return res.redirect('/register');
    }

    authModel.registerFunModel(req.body.name, req.body.email, req.body.password)
        .then((user) => {
            res.redirect('/login');
        })
        .catch((err) => {
            console.log(err);
            req.flash('error', err); // Store error message in flash
            res.redirect('/register'); // Redirect to the register page
        });
};





exports.postLoginPage = (req, res) => {
    if (!req.body.email || !req.body.password) {
        req.flash('error', 'All fields are required');
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
            req.flash('error', err);
            const errorMessage = req.flash('error')[0] || null; 
            res.render('login', { 
                verifUser: req.session.userId,
                message: errorMessage
            }); 
        });
};

exports.postLogoutPage=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/login',)
    })
 }





 exports.getRegisterPage=(req,res)=>{
    const errorMessage = req.flash('error')[0] || null ;
    console.log(errorMessage,'register page') // Retrieve the flash message
    console.log("Flash message:", errorMessage); // Debug log
    res.render('register',{
        verifUser:req.session.userId,
        message:errorMessage 
    })
    
    

}
 exports.getLoginPage=(req,res)=>{
    const errorMessage = req.flash('error')[0] || null ;
    console.log(errorMessage,'login page') // Retrieve the flash message
    res.render('login',{
        verifUser:req.session.userId,
        message:errorMessage
    })

}