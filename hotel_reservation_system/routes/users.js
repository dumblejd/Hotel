var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/hotel');

router.get('/', function(req, res) {
    var collection = db.get('users');
    collection.find({}, function(err, users){
        if (err) throw err;
        res.json(users);
    });
});

router.post('/', function(req, res){
    var collection = db.get('users');
    collection.insert({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }, function(err, user){
        if (err) throw err;

        res.json(user);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('users');
    collection.findOne({ _id: req.params.id }, function(err, user){
        if (err) throw err;

        res.json(user);
    });
});

router.put('/:id', function(req, res){
    var collection = db.get('users');
    collection.update({
            _id: req.params.id
        },
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }, function(err, user){
            if (err) throw err;

            res.json(user);
        });
});

module.exports = router;
