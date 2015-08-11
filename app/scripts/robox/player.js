module.exports = function() {
  'use strict';

  var DELAY_BETWEEN_REPEATS = 1000;

  function Player() {
    this.data = [];
    this.tempo = 60;
    this.repeat = true;
    this.subscribers = [];
  }

  function parseData(data) {
    return JSON.parse(data);
  }

  Player.prototype.loadFile = function(filePath, onSuccess) {
    this.data = [
      {
        "position": 0,
        "time": 4
      },
      {
        "position": 4,
        "time": 8
      },
      {
        "position": 6,
        "time": 8
      },
      {
        "position": 2,
        "time": 24
      },
      {
        "position": 4,
        "time": 24
      },
      {
        "position": 11,
        "time": 30
      },
      {
        "position": 0,
        "time": 36
      }
    ];
  };

  Player.prototype.subscribe = function(listenerObject) {
    var self = this;

    // Add the listener to the queue
    var index = self.subscribers.push(listenerObject) - 1;

    // Provide a function to remove the listener
    return {
      remove: function() {
        self.subscribers[index] = null;
      }
    };
  };

  Player.prototype.publish = function(note) {
    this.subscribers.forEach(function(listenerObject) {
      listenerObject.onNoteEvent(note);
    });
  };

  Player.prototype.stop = function() {

  };

  Player.prototype.start = function() {
    var self = this;

    function interval() {
      return 60000 / (self.tempo * 8);
    }

    function publish(note) {
      return self.publish(note);
    }

    var data = self.data;

    data.forEach(function(note) {
      window.setTimeout(function() {
        publish(note);
      }, note.time * interval());

      if (self.repeat === true){
        window.setInterval(function() {
          window.setTimeout(function() {
            publish(note);
          }, note.time * interval());
        }, self.data[self.data.length - 1].time * interval() + DELAY_BETWEEN_REPEATS);
      }
    });
  };

  Player.prototype.resume = function() {

  };

  Player.prototype.pause = function() {

  };

  return Player;
};
