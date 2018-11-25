var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/hotel');

router.get('/', function (req, res) {
    var collection = db.get('rooms');
    collection.find({}, function (err, rooms) {
        if (err) throw err;
        res.json(rooms);
    });
});
router.get('/type', function (req, res) {
    var collection = db.get('rooms');
    collection.find({}, function (err, rooms) {
        if (err) throw err;
        //res.json(rooms);


        var result = [];
        for (var i = 0, arrayLen = rooms.length; i < arrayLen; i++) {
            for (var j = 0, resLen = result.length; j < resLen; j++) {
                if (result[j] == rooms[i].type) {
                    break;
                }
            }
            if (j == resLen) {
                result.push(rooms[i].type)
            }
        }
        res.json(result);
    });
});
router.post('/search', function (req, res) {
    var collection = db.get('rooms');
    collection.find({}, function (err, rooms) {
        if (err) throw err;
        //res.json(rooms);

        var bag={};
        var result = [];


        for (var i = 0, arrayLen = rooms.length; i < arrayLen; i++)
        {//judge date
            if(rooms[i].available=='unavailable') // unavailable or not
            {
                continue;
            }
            if(rooms[i].reserved_time==null||rooms[i].reserved_time.length==0)
            {
                result.push(rooms[i]);
                continue;
            }
            for (var j = 0, indexLen = rooms[i].reserved_time.length; j < indexLen; j++)  //judge date
            {
                var userStart = new Date(req.body.start);
                console.log(userStart.getTime);
                var userEnd = new Date(req.body.end);
                var roomStart = new Date(rooms[i].reserved_time[j].start);
                var roomEnd = new Date(rooms[i].reserved_time[j].end);
                if (Math.max(userStart.getTime(),roomStart.getTime()) < Math.min(userEnd.getTime(),roomEnd.getTime()))
                {
                    //time overlap
                    break;
                }
                else
                {
                    result.push(rooms[i]);
                    break;
                }
            }
        }
        //from here result means room in available time slot  ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

        bag['result']=result;
        //res=JSON.stringify(result);
        res.json(bag);

    });
});
router.get('/capacity', function (req, res) {
    var collection = db.get('rooms');
    collection.find({}, function (err, rooms) {
        if (err) throw err;
        //res.json(rooms);


        var result = [];
        for (var i = 0, arrayLen = rooms.length; i < arrayLen; i++) {
            for (var j = 0, resLen = result.length; j < resLen; j++) {
                if (result[j] == rooms[i].occupancy) {
                    break;
                }
            }
            if (j == resLen) {
                result.push(rooms[i].occupancy)
            }
        }
        res.json(result);
    });
});

router.post('/', function (req, res) {
    var collection = db.get('rooms');
    collection.insert({
        room_number: req.body.room_number,
        type: req.body.type,
        occupancy: req.body.occupancy,
        price: req.body.price,
        available: req.body.available,
        reserved_time: req.body.reserved_time
    }, function (err, room) {
        if (err) throw err;

        res.json(room);
    });
});

router.get('/:id', function (req, res) {
    var collection = db.get('rooms');
    collection.findOne({_id: req.params.id}, function (err, room) {
        if (err) throw err;

        res.json(room);
    });
});

router.put('/:id', function (req, res) {
    var collection = db.get('rooms');
    collection.update({
            _id: req.params.id
        },
        {
            room_number: req.body.room_number,
            type: req.body.type,
            occupancy: req.body.occupancy,
            price: req.body.price,
            available: req.body.available,
            reserved_time: req.body.reserved_time
        }, function (err, room) {
            if (err) throw err;

            res.json(room);
        });
});

router.delete('/:id', function (req, res) {
    var collection = db.get('rooms');
    collection.remove({_id: req.params.id}, function (err, room) {
        if (err) throw err;

        res.json(room);
    });
});

module.exports = router;