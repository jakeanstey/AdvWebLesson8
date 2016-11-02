var express = require('express');
var router = express.Router();

//link to the teams global
var Team = require('../models/team');

//Route to teams.ejs
router.get('/', isLoggedIn, function(req, res, next){
    //use team model to get the list of teams from mongodb
    Team.find(function(err, teams){
        if(err){
            console.log(err);
            res.redirect('error');
        }else{
            res.render('teams', {
                title: "Teams",
                teams: teams,
                user: req.user
            });
        }
    });
});

router.get('/add', isLoggedIn, function(req, res, next){
   res.render('add-team', {
       title: 'Add a new Team',
       user: req.user
   })
});

router.post('/add', isLoggedIn, function(req, res, next){
    //use the mongoose model to add a new record and redirect to updated teams view
    Team.create({
        city: req.body.city,
        nickname: req.body.nickname,
        wins: req.body.wins,
        losses: req.body.losses
    }, function(err, Team){
        if(err){
            console.log(err);
            res.redirect('/error');
        }else{
            res.redirect('/teams');
        }
    });
});

router.get('/delete/:id', isLoggedIn, function(req, res, next){
    //get the id parameter from the url
    var id = req.params.id;

    Team.remove( {
        _id: id
    }, function(err){
       if(err){
           console.log(err);
           res.render('error', {error: err});
       } else{
            res.redirect('/teams');
       }
    });
});

router.get('/:id', isLoggedIn, function(req, res, next){
    var id = req.params.id;

    Team.findById(id, function(err, team){
        if(err){
            console.log(err);
            res.render('error', { error: err });
        }else{
            res.render('edit-teams', {
                title: "Team Details",
                team: team,
                user: req.user
            });
        }
    });
});

router.post('/:id', isLoggedIn, function(req, res, next){
    var id = req.params.id;

    var team = new Team({
        _id: id,
        city: req.body.city,
        nickname: req.body.nickname,
        wins: req.body.wins,
        losses: req.body.losses
    });

    Team.update({_id: id }, team, function(err){
        if(err){
            console.log(err);
            res.render('error');
        }else{
            res.redirect('/teams');
        }
    });
});

//check if the user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }else{
        res.redirect('/login');
    }
}

module.exports = router;