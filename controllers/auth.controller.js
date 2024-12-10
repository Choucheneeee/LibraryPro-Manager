const authModel = require('../models/auth.model');

// Register POST handler
exports.postRegisterPage = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        req.flash('error', 'All fields are required');
        return res.redirect('/register'); // Redirect back to the register page
    }

    authModel.registerFunModel(req.body.name, req.body.email, req.body.password)
        .then(() => {
            res.redirect('/login'); // Redirect to the login page on successful registration
        })
        .catch((err) => {
            console.error('Registration error:', err);
            req.flash('error', err); // Store error message in flash
            res.redirect('/register'); // Redirect back to the register page
        });
};

// Login POST handler
exports.postLoginPage = (req, res) => {
    if (!req.body.email || !req.body.password) {
        req.flash('error', 'All fields are required');
        return res.redirect('/login'); // Redirect back to the login page
    }

    authModel.loginFunModel(req.body.email, req.body.password)
        .then((id) => {
            console.log('id controller', id);
            req.session.userId = id; // Save the user ID in the session
            res.redirect('/'); // Redirect to the home page on successful login
        })
        .catch((err) => {
            console.error('Login error:', err);
            req.flash('error', err); // Store error message in flash
            const errorMessage = req.flash('error')[0] || null;
            res.render('login', { 
                verifUser: req.session.userId,
                message: errorMessage, // Pass the error message to the view
            });
        });
};

// Logout POST handler
exports.postLogoutPage = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login'); // Redirect to the login page after logout
    });
};

// Register GET handler
exports.getRegisterPage = (req, res) => {
    const errorMessage = req.flash('error')[0] || null; // Retrieve the flash message
    console.log('Flash message (register):', errorMessage);
    res.render('register', {
        verifUser: req.session.userId,
        message: errorMessage, // Pass the error message to the view
    });
};

// Login GET handler
exports.getLoginPage = (req, res) => {
    const errorMessage = req.flash('error')[0] || null; // Retrieve the flash message
    console.log('Flash message (login):', errorMessage);
    res.render('login', {
        verifUser: req.session.userId,
        message: errorMessage, // Pass the error message to the view
    });
};
