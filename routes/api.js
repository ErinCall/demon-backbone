/* jshint node:true */

'use strict';

var express = require('express');
var router = express.Router();
var deck = require('../lib/deck');

/* GET home page. */
router.get('/deck/shuffled', function(request, response) {
  var cards = deck.newDeck().shuffle();
  response.json(cards);
});

module.exports = router;
