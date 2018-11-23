var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/hotel');

router.get('/', function(req, res) {
    var collection = db.get('reserves');
    collection.find({}, function(err, reserves){
        if (err) throw err;
        res.json(reserves);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('reserves');
    collection.findOne({ _id: req.params.id }, function(err, reserve){
        if (err) throw err;

        res.json(reserve);
    });
});


router.post('/', function(req, res){
    var collection = db.get('reserves');
    collection.insert({
        "username" : req.body.username,
        "room_number" : req.body.room_number,
        "date" : req.body.date
    }, function(err, reserve){
        if (err) throw err;

        res.json(reserve);
    });
});

module.exports = router;
