'use strict';

var express = require('express');
var router = express.Router();
var util = require('util');
var javascript = 'function go(){if(go.count < %d){console.log(go.count++);window.setTimeout(go,1000);}}go.count=0;go();';

router.get('/:delay?/:size?/:time?/:name.js', function(req, res) {
  var start = new Date();

  // name: a name for the resource to identify easily in the developer-tools network waterfall
  res.set('X-Content-Name', req.params.name);

  // delay: response time in seconds
  var delay = parseInt(req.params.delay || 0);
  res.set('X-Content-Delay', delay);

  // time: runtime of the script when running in the browser in seconds
  var time = parseInt(req.params.time || 0);
  var js = util.format(javascript, time)

  // size: size of document in kilo-bytes
  var size = js.length;
  size = Math.max(parseInt(req.params.size || 0) * 1000, size);
  res.set('X-Content-Size', size + ' kb');
  var body = new Buffer(size);
  body.fill(' ', body.write(js));

  // response body
  setTimeout(function() {
    res.type('javascript');
    res.set('X-Response-Time', (new Date() - start) + ' ms');
    res.send(body.toString());
  }, delay * 1000);
});

module.exports = router;

