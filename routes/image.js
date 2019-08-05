'use strict';

var express = require('express');
var router = express.Router();
var hex2rgba = require('hex-and-rgba').hexToRgba;
var pngjs = require('pngjs-image');

// color png
router.get('/:delay?/:width?/:height?/:color.png', function(req, res){
  var start = new Date();

  // create image
  var width = parseInt(req.params.width || 100);
  var height = parseInt(req.params.height || width);
  var color = /^random/.test(req.params.color) ? hex2rgba(require('random-hex-color')()) : hex2rgba('#' + req.params.color);
  var image = pngjs.createImage(width, height);
  image.fillRect(0, 0, width, height, {red: color[0], green: color[1], blue: color[2], alpha: color[3] * 255});
  var data = new Buffer(image.toBlobSync(), 'binary');
  res.set('X-Content-Size', data.length + ' kb');

  // delay: response time in seconds
  var delay = parseInt(req.params.delay || 0);
  res.set('X-Content-Delay', delay);

  // response body
  setTimeout(function() {
    res.type('png');
    res.set('X-Response-Time', (new Date() - start) + ' ms');
    res.send(data);
  }, delay * 1000)
})

module.exports = router;

