'use strict';

var express = require('express');
var router  = express.Router();
var sleep   = require('sleep');
var util    = require('util');
var qr      = require('qr-image');


// QR-code image containing URL
router.get('/:delay?/qr.png', function(req, res) {

  // create iamge
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

//
//router.get('image/:delay?/:size?/:name.png', function(req, res){
//})

module.exports = router;

