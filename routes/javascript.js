var express = require('express');
var router = express.Router();
var util = require('util');
var javascript = 'console.time("%s");console.log("start execution of %s");var result = 0;var now = new Date().getTime();while(new Date().getTime() < now + (%d)){result += Math.random()*Math.random()};console.log("stop execution of %s");console.timeEnd("%s");';

router.get('/:delay?/:size?/:time?/:name.js', function(req, res) {
  var start = new Date();

  // name: a name for the resource to identify easily in the developer-tools network waterfall
  res.set('X-Content-Name', req.params.name);

  // delay: response time in seconds
  var delay = parseInt(req.params.delay || 0);
  res.set('X-Content-Delay', delay);

  // time: runtime of the script when running in the browser in seconds
  var time = parseInt(req.params.time || 0);
  var name = req.params.name + '.js';
  var js = util.format(javascript, name, name, time, name, name)

  // size: size of document in kilo-bytes
  var size = js.length;
  size = Math.max(parseInt(req.params.size || 0), size);
  res.set('X-Content-Size', size + ' kb');
  var body = new Buffer(size);
  body.fill(' ', body.write(js));

  // response body
  setTimeout(function() {
    res.type('js');
    res.set('X-Response-Time', (new Date() - start) + ' ms');
    res.send(body.toString());
  }, delay * 1000);
});

module.exports = router;

