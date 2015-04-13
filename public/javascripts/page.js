/* jshint browser:true, jquery:true */
/* global Backbone */

'use strict';

$(function() {

  var Card = Backbone.Model.extend({
    initialize: function(attrs) {
      this.value = attrs[0];
      this.suit = attrs[1];
    },
    imageUrl: function() {
      return "/images/cards/" + this.value + "_of_" + this.suit + ".svg";
    },
    backUrl: function() {
      return "/images/cards/back.svg";
    },
    description: function() {
      if (this.value > 1 && this.value < 11) {
        return this.value + " of " + this.suit;
      } else {
        return {
          1: 'ace',
          11: 'jack',
          12: 'queen',
          13: 'king'
        }[this.value] + " of " + this.suit;
      }
    }
  });

  var Deck = Backbone.Collection.extend({
    model: Card,
    url: '/api/deck/shuffled'
  });

  var Pile = Backbone.View.extend({
    initialize: function(cards) {
      this.cards = cards;
    }
  })

  var BuildPile = Pile.extend({
    render: function(offset) {
      var $pile = $('<div class="pile">');
      if (offset !== undefined) {
        // the offset we're given tells us we're rendering the nth pile.
        // Pile widths are basically the cards' width; cards are defined in terms
        // of viewport *height*, so the pile position also needs to be in those
        // terms. I've found a 10vh-wide pile is about right for 15vh-tall cards.
        $pile.css({left: (offset * 10) + 'vh'})
      }
      this.cards.forEach(function(card, index) {
        var $card = $('<img class="card">');
        $card.css({top: index + 'vh'})
        $card.attr('src', card.imageUrl());
        $card.attr('alt', card.description());
        $pile.append($card);
      })

      return $pile;
    }
  });

  var MainPile = Pile.extend({
    render: function() {
      var $pile = $('<div class="pile">'),
          topCard = this.cards[this.cards.length - 1],
          $card = $('<img class="card">');

      this.cards.slice(0, -1).forEach(function(card, index) {
        var $card = $('<img class="card">');
        $card.css({top: (index / 2) + 'vh'})
        $card.attr('src', card.backUrl());
        $card.attr('alt', 'unknown card');
        $pile.append($card);
      })

      $card.css({top: ((this.cards.length - 1) / 2) + 'vh'})
      $card.attr('src', topCard.imageUrl());
      $card.attr('alt', topCard.description());
      $pile.append($card);

      return $pile;
    }
  });

  var HomeArea = Backbone.View.extend({
    tagName: 'div',
    className: 'home-area',
    initialize: function() {
      this.deck = new Deck();
      this.deck.fetch().done(function() {
        this.mainPile = new MainPile(this.deck.slice(0, 13));
        this.deck = this.deck.slice(13);

        this.buildPiles = [
          new BuildPile([this.deck.shift()]),
          new BuildPile([this.deck.shift()]),
          new BuildPile([this.deck.shift()]),
          new BuildPile([this.deck.shift()])
        ];

        this.trigger('ready');
      }.bind(this));
    },
    render: function() {
      var $homeArea = $('<div class="home-area">');

      $homeArea.append(this.mainPile.render());

      this.buildPiles.forEach(function(buildPile, index) {
        $homeArea.append(buildPile.render(index + 1));
      });

      return $homeArea;
    }
  });

  var PlayArea = Backbone.View.extend({
    tagName: 'div',
    className: 'play-area',
    render: function() {
      return $('<div class="play-area">');
    }
  });

  var areasReady = 0;
  var playerHome = new HomeArea();
  var opponentHome = new HomeArea();
  var playArea = new PlayArea();

  function potentiallyRender() {
    var $container;
    areasReady += 1;

    if (areasReady >= 2) {
      $container = $('body');
      $container.find('*').remove();
      $container.append(opponentHome.render());
      $container.append(playArea.render());
      $container.append(playerHome.render());
    }
  }

  playerHome.once('ready', potentiallyRender);
  opponentHome.once('ready', potentiallyRender);
});
