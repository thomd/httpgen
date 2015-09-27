'use strict';

var express = require('express');
var router  = express.Router();
var sleep   = require('sleep');


// QR-code image containing URL
router.get('/:delay?/qr.png', function(req, res) {

  // create iamge
  var qr = require('qr-image');
  var url = req.protocol + '://' + req.hostname + req.originalUrl;
  res.set('X-QR-Content', url);
  var code = qr.image(url, { type: 'png' });

  // delay: response time in seconds
  var delay = parseInt(req.params.delay || 0);
  res.set('X-Content-Delay', delay);
  sleep.sleep(delay);

  // response
  res.type('png');
  code.pipe(res);
});


// color png
router.get('/:delay?/:size?/color.png', function(req, res){

  // create iamge
  var image = require('pngjs-image').createImage(100, 100);
  image.fillRect(0, 0, 100, 100, {red: 255, green: 0, blue: 0, alpha: 100});
  var body = new Buffer(image.toBlobSync(), 'binary');

  // response
  res.type('png');
  res.send(body);
})

module.exports = router;

