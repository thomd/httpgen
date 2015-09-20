var express = require('express');
var router = express.Router();
var sleep = require('sleep');

router.get('/:delay', function(req, res, next) {
  sleep.sleep(parseInt(req.params.delay));
  var css = '#foo .bar .baz { color: #F00; }';
  res.set('Content-Type', 'text/css');
  res.send(css);
});

module.exports = router;
