var express = require('express');
var router = express.Router();

var Account = require('../models/account');
var passport = require('passport');

/* GET login page. */
router.get('/', function(req, res, next) {
    if(req.user){
        res.redirect('/teams');
    }

    res.render('login', {
        title: 'Login',
        failureMessage: '',
        user: req.user
    });
});

/**
 * Post login script
 */
router.post('/', passport.authenticate('local', {
    successRedirect: '/teams',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));

module.exports = router;