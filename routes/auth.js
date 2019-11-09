const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

// 5 Routes for our Auth

// Route 1 - GET Login
router.get('/login', (req, res, next) => {
    res.render('auth/login.pug', { error: req.flash('error') });
});

// Route 2 - POST Login ( Form Submission )
router.post(
    '/login',
    passport.authenticate('local', {
        failureFlash: 'There was an issue with your username or password',
        failureRedirect: '/login',
        successRedirect: '/'
    })
);

// Route 3 - GET Register
router.get('/register', (req, res, next) => {
    res.render('auth/register.pug', {});
});

// Route 4 - POST Register ( Form Submission )
router.post('/register', (req, res, next) => {
    // Register account using passport-local-mongoose
    User.register(
        new User({ username: req.body.username }),
        req.body.password, // Password for hasing
        function (err, account) {
            if (err) {
                // If there's an error, render the register page
                console.log(err);
                return res.render('register', { account: account });
            }

            // Login if successful
            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        }
    );
});

// Route 5 - GET Logout ( logout from nav )
router.get('/logout', (req, res, next) => {
    // Destroy session
    req.session.destroy(() => {
        // When done, redirect back to home
        res.redirect('/');
    });
});

router.get('/auth/github', passport.authenticate('github'));
router.get(
    '/callback/github',
    passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

module.exports = router;
