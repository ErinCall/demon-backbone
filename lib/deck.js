/* jshint node:true */

'use strict';
var _ = require('lodash');
var shuffle = require('knuth-shuffle').knuthShuffle;

module.exports = {
  newDeck: function() {
    var deck = _.range(1, 14).reduce(function(accum, value) {
      return accum.concat(_.zip([value, value, value, value], ['hearts', 'spades', 'diamonds', 'clubs']));
    }, []);
    deck.shuffle = function() {
      shuffle(this);
      return this;
    };
    return deck;
  }
};
