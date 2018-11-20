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

module.exports = router;
