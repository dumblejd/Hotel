var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/hotel');

router.get('/', function(req, res) {
    var collection = db.get('rooms');
    collection.find({}, function(err, rooms){
        if (err) throw err;
        res.json(rooms);
    });
});

router.post('/', function(req, res){
    var collection = db.get('rooms');
    collection.insert({
        room_number: req.body.room_number,
        type: req.body.type,
        occupancy: req.body.occupancy,
        price: req.body.price,
        reserved_time: req.body.reserved_time
    }, function(err, room){
        if (err) throw err;

        res.json(room);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('rooms');
    collection.findOne({ _id: req.params.id }, function(err, room){
        if (err) throw err;

        res.json(room);
    });
});

router.put('/:id', function(req, res){
    var collection = db.get('rooms');
    collection.update({
            _id: req.params.id
        },
        {
            room_number: req.body.room_number,
            type: req.body.type,
            occupancy: req.body.occupancy,
            price: req.body.price,
            reserved_time: req.body.reserved_time
        }, function(err, room){
            if (err) throw err;

            res.json(room);
        });
});

module.exports = router;