'use strict';

var express = require('express');
var router = express.Router();

// QR-code image containing URL
router.get('/:delay?/:content.png', function(req, res) {
  var start = new Date();

  // create iamge
  var qr = require('qr-image');
  var content = req.params.content;
  res.set('X-QR-Content', content);
  var code = qr.image(req.get(content) || content, { type: 'png' });

  // delay: response time in seconds
  var delay = parseInt(req.params.delay || 0);
  res.set('X-Content-Delay', delay);

  // response body
  setTimeout(function() {
    res.type('png');
    res.set('X-Response-Time', (new Date() - start) + ' ms');
    code.pipe(res);
  }, delay * 1000);
});

module.exports = router;

