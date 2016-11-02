var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    message: 'Starting CRUD with MongoDB',
      user: req.user
  });
});

router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/login');
});

module.exports = router;
