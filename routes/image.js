'use strict';

var express  = require('express');
var router   = express.Router();
var hex2rgba = require('hex-and-rgba').hexToRgba;
var pngjs    = require('pngjs-image');
var sleep    = require('sleep');

// color png
router.get('/:delay?/:width?/:height?/:color.png', function(req, res){
  var start = new Date;

  // create image
  var width = parseInt(req.params.width || 100);
  var height = parseInt(req.params.height || width);
  var color = hex2rgba('#' + req.params.color);
  var image = pngjs.createImage(width, height);
  image.fillRect(0, 0, width, height, {red: color[0], green: color[1], blue: color[2], alpha: color[3] * 255});
  var data = new Buffer(image.toBlobSync(), 'binary');

  // delay: response time in seconds
  var delay = parseInt(req.params.delay || 0);
  res.set('X-Content-Delay', delay);
  sleep.sleep(delay);

  // response
  res.type('png');
  var ms = new Date - start;
  res.set('X-Response-Time', ms + 'ms');
  res.send(data);
})

module.exports = router;

