'use strict';

var express = require('express');
var router  = express.Router();
var sleep   = require('sleep');

// QR-code image containing URL
router.get('/:delay?/:content.png', function(req, res) {

  // create iamge
  var qr = require('qr-image');
  var content = req.params.content;
  res.set('X-QR-Content', content);
  var code = qr.image(content, { type: 'png' });

  // delay: response time in seconds
  var delay = parseInt(req.params.delay || 0);
  res.set('X-Content-Delay', delay);
  sleep.sleep(delay);

  // response
  res.type('png');
  code.pipe(res);
});

module.exports = router;

