var express = require('express');
var router = express.Router();

/* GET users listing. */
var monk = require('monk');
var db = monk('localhost:27017/hotel');

router.get('/', function(req, res) {
    var collection = db.get('users');
    collection.find({}, function(err, videos){
        if (err) throw err;
        res.json(videos);
    });
});

module.exports = router;
