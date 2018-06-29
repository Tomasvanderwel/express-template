var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    return res.sendStatus(200);
});

module.exports = router;