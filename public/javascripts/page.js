/* jshint browser:true, jquery:true */
'use strict';

$(function() {

  var Card = Backbone.Model.extend({
    initialize: function(attrs) {
      this.value = attrs[0];
      this.suit = attrs[1];
    },
    imageUrl: function() {
      return "/images/cards/" + this.value + "_of_" + this.suit + ".svg"
    }
  });

  var Deck = Backbone.Collection.extend({
    model: Card,
    url: '/api/deck/shuffled'
  });

  var HomeArea = Backbone.View.extend({
    tagName: 'div',
    className: 'home-area',
    initialize: function() {
      this.deck = new Deck();
      this.deck.fetch();
    },
    render: function() {
      return '<div>I am a home area!</div>'
    }
  });

  var PlayArea = Backbone.View.extend({
    tagName: 'div',
    className: 'play-area',
    render: function() {
      return '<div>I am a play area!</div>'
    }
  });

  $('#play').click(function(event) {
    event.preventDefault();
    var playerHome = new HomeArea();
    var opponentHome = new HomeArea();
    var playArea = new PlayArea();
    var $container = $('.container');

    $container.find('*').remove();
    $container.append(opponentHome.render());
    $container.append(playArea.render());
    $container.append(playerHome.render());
  });
});
