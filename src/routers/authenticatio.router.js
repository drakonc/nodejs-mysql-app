const express = require("express");
const router = express.Router();
const passport = require('passport');
const { isLoggedIN } = require('../lib/auth')

router.get( "/signup", ( req, res )=>{
    res.render("auth/signup");
});

router.get("/signin", (req, res) => {
    res.render("auth/signin");
});

router.post("/signin", passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}));

router.post("/signup", ( req, res, next ) => {
    passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/singnin',
        failureFlash: true
    })( req, res, next);
});

router.get("/profile", isLoggedIN, (req, res) => {
    res.render('profile');
});

router.get("/logout", ( req, res ) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;
