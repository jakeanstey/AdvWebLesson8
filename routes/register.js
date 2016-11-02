/**
 * Created by JakeAnstey on 2016-11-02.
 */
var express = require('express');
var router = express.Router();

var Account = require('../models/account');
var passport = require('passport');

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('register', {
        title: 'Register',
        message: 'Starting CRUD with MongoDB',
        user: req.user
    });
});

router.post('/', function(req, res, next){
   //create a new account
    Account.register(new Account({ username: req.body.username}), req.body.password,
        function(err, account){
            if(err){
                console.log(err);
                res.redirect('/error');
            }else{
                res.redirect('/login');
            }
        }
    );
});

module.exports = router;