'use strict';

var express = require('express');
var router  = express.Router();
var sleep   = require('sleep');
var css     = '#foo .bar .baz { color: #F00; }';


router.get('/:delay/:size', function(req, res) {

  // delay
  var delay = parseInt(req.params.delay || 0);
  res.set('X-Content-Delay', delay);
  sleep.sleep(delay);

  // size
  var size = parseInt(req.params.size || css.length);
  res.set('X-Content-Size', size);
  var body = new Buffer(size);
  body.fill(' ', body.write(css));

  // response
  res.set('Content-Type', 'text/css');
  res.send(body.toString());
});

module.exports = router;
