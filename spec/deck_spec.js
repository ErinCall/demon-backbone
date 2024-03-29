/* jshint node:true, jasmine:true */

'use strict';

var deck = require('../lib/deck');

describe('generate a deck', function() {
  it('generates a sorted deck', function() {
    expect(deck.newDeck()).toEqual(
      [
        [1, 'hearts'],
        [1, 'spades'],
        [1, 'diamonds'],
        [1, 'clubs'],
        [2, 'hearts'],
        [2, 'spades'],
        [2, 'diamonds'],
        [2, 'clubs'],
        [3, 'hearts'],
        [3, 'spades'],
        [3, 'diamonds'],
        [3, 'clubs'],
        [4, 'hearts'],
        [4, 'spades'],
        [4, 'diamonds'],
        [4, 'clubs'],
        [5, 'hearts'],
        [5, 'spades'],
        [5, 'diamonds'],
        [5, 'clubs'],
        [6, 'hearts'],
        [6, 'spades'],
        [6, 'diamonds'],
        [6, 'clubs'],
        [7, 'hearts'],
        [7, 'spades'],
        [7, 'diamonds'],
        [7, 'clubs'],
        [8, 'hearts'],
        [8, 'spades'],
        [8, 'diamonds'],
        [8, 'clubs'],
        [9, 'hearts'],
        [9, 'spades'],
        [9, 'diamonds'],
        [9, 'clubs'],
        [10, 'hearts'],
        [10, 'spades'],
        [10, 'diamonds'],
        [10, 'clubs'],
        [11, 'hearts'],
        [11, 'spades'],
        [11, 'diamonds'],
        [11, 'clubs'],
        [12, 'hearts'],
        [12, 'spades'],
        [12, 'diamonds'],
        [12, 'clubs'],
        [13, 'hearts'],
        [13, 'spades'],
        [13, 'diamonds'],
        [13, 'clubs']
      ]
    );
  });
});
