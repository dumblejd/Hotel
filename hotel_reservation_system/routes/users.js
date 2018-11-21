var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/hotel');

//Get all user
router.get('/', function(req, res) {
    var collection = db.get('users');
    collection.find({}, function(err, users){
        if (err) throw err;
        res.json(users);
    });
});

//Add user
router.post('/', function(req, res){
    var collection = db.get('users');
    collection.insert({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        fullname: req.body.fullname,
        phone: req.body.phone,
        level: req.body.level
    }, function(err, user){
        if (err) throw err;

        res.json(user);
    });
});

//Get one user
router.get('/:id', function(req, res) {
    var collection = db.get('users');
    collection.findOne({ _id: req.params.id }, function(err, user){
        if (err) throw err;

        res.json(user);
    });
});

//Update user
router.put('/:id', function(req, res){
    var collection = db.get('users');
    collection.update({
            _id: req.params.id
        },
        {
            username: req.body.username,
	        password: req.body.password,
	        email: req.body.email,
	        fullname: req.body.fullname,
	        phone: req.body.phone,
	        level: req.body.level
        }, function(err, user){
            if (err) throw err;

            res.json(user);
        });
});

//Check username exist
router.get('/username/:username', function(req,res){
	var collection = db.get('users');
	collection.findOne({username: req.params.username}, function(err, user){
		if (err) throw err;

		res.json(user);
	});
});

router.post('/signIn', function(req, res){
    var collection = db.get('users');
    var username = req.body.username;
    var password = req.body.password;
    collection.findOne({
        username: username,
        password: password
    }, function(err, user){
        if (err) throw err;
        if (user != null){
            res.json({status: true});
        }
        else{
            res.json({status: false})
        }
    })
});

module.exports = router;
