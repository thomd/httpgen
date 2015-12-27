'use strict';

var express = require('express')
var router  = express.Router()
var sleep   = require('sleep')
var color   = require('color')(require('random-hex-color')()).lighten(0.4)


router.get('/:delay?/:size?/:name.css', function(req, res) {
  var start = new Date;

  // name: a name for the resource to identify easily in the developer-tools network waterfall
  res.set('X-Content-Name', req.params.name);

  // delay: response time in seconds
  var delay = parseInt(req.params.delay || 0);
  res.set('X-Content-Delay', delay);
  sleep.sleep(delay);

  // size: size of document in kilo-bytes
  var css     = 'body { background-color: ' + color + '; }';
  var size = css.length;
  size = Math.max(parseInt(req.params.size || 0) * 1000, size);
  res.set('X-Content-Size', size);
  var body = new Buffer(size);
  body.fill(' ', body.write(css));

  // response
  res.type('css');
  var ms = new Date - start;
  res.set('X-Response-Time', ms + 'ms');
  res.send(body.toString());
});

module.exports = router;
