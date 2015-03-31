module.exports = function() {
  function Player() {
    this.data = [];
    this.tempo = 100;
    this.repeat = true;
    this.subscribers = {};
  }

  function parseData(data) {
    return JSON.parse(data);
  }

  Player.prototype.loadFile = function(filePath, onSuccess) {
    var self = this;
    var xmlhttp;

    if (!window.XMLHttpRequest) {
      return;
    }
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 ) {
        if(xmlhttp.status === 200){
          self.data = parseData(xmlhttp.responseText);
          onSuccess.call(this, self.data);
        }
        else if(xmlhttp.status === 400) {
          throw('File not found');
        }
        else {
          throw('The file could not be loaded');
        }
      }
    };

    xmlhttp.open("GET", filePath, true);
    xmlhttp.send();
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

  Player.prototype.publish = function() {
    this.subscribers.forEach(function(listener) {
      var data = {}; // ?
      listener.call(this, data);
    });
  };

  Player.prototype.stop = function() {

  };

  Player.prototype.start = function() {

  };

  Player.prototype.resume = function() {

  };

  Player.prototype.pause = function() {

  };

  return Player;
};
