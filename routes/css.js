'use strict';

var express = require('express')
var router = express.Router()

router.get('/:delay?/:size?/:name.css', function(req, res) {
  var start = new Date();

  // name: a name for the resource to identify easily in the developer-tools network waterfall
  res.set('X-Content-Name', req.params.name);

  // delay: response time in seconds
  var delay = parseInt(req.params.delay || 0);
  res.set('X-Content-Delay', delay);

  // size: size of document in kilo-bytes
  var color = require('color')(require('random-hex-color')()).lighten(0.3).rgb()
  var css = 'body { background-color: rgb(' + color.r + ', ' + color.g + ', ' + color.b + '); }';
  var size = css.length;
  size = Math.max(parseInt(req.params.size || 0) * 1000, size);
  res.set('X-Content-Size', size + ' kb');
  var body = new Buffer(size);
  body.fill(' ', body.write(css));

  // response body
  setTimeout(function() {
    res.type('css');
    res.set('X-Response-Time', (new Date() - start) + ' ms');
    res.send(body.toString());
  }, delay * 1000);
});

module.exports = router;
