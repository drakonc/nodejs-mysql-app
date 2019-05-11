const express = require("express");
const router = express.Router();
const passport = require('passport');

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

router.get("/profile", (req, res) => {
    res.send('este es tu perfil Perfil');
});

module.exports = router;
