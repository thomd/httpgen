'use strict';

var express = require('express');
var router = express.Router();

// blackhole (simulating SPOF timeout)
router.get('', function(req, res) {
  return;
});

module.exports = router;

