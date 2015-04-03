module.exports = function() {
  'use strict';

  function Player() {
    this.data = [];
    this.tempo = 100;
    this.repeat = true;
    this.subscribers = [];
  }

  function parseData(data) {
    return JSON.parse(data);
  }

  Player.prototype.loadFile = function(filePath, onSuccess) {
//    var self = this;
//    var xmlhttp;
//
//    if (!window.XMLHttpRequest) {
//      return;
//    }
//    xmlhttp = new XMLHttpRequest();
//
//    xmlhttp.overrideMimeType('text/plain; charset=x-user-defined');
//
//    xmlhttp.onreadystatechange = function() {
//      if (xmlhttp.readyState === 4 ) {
//        if(xmlhttp.status === 200){
//          self.data = parseData(xmlhttp.responseText);
//          onSuccess.call(this, self.data);
//        }
//        else if(xmlhttp.status === 400) {
//          throw('File not found');
//        }
//        else {
//          throw('The file could not be loaded');
//        }
//      }
//    };
//
//    xmlhttp.open("GET", filePath, true);
//    xmlhttp.send();
    this.data = [
      {
        "note": 0,
        "position": 4
      },
      {
        "note": 4,
        "position": 8
      },
      {
        "note": 6,
        "position": 8
      }
    ];
  };

  Player.prototype.subscribe = function(listener) {
    var self = this;

    // Add the listener to the queue
    var index = self.subscribers.push(listener) - 1;

    // Provide a function to remove the listener
    return {
      remove: function() {
        self.subscribers[index] = null;
      }
    };
  };

  Player.prototype.publish = function(note) {
    this.subscribers.forEach(function(listener) {
      listener.call(this, note);
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
      }, note * interval());
    });

  };

  Player.prototype.resume = function() {

  };

  Player.prototype.pause = function() {

  };

  return Player;
};
