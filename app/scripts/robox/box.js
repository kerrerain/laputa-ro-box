var Drawer = require('./drawer')();
var Player = require('./player')();
var _ = require('lodash');

module.exports = function () {

  var b, Box = function (box, options) {

    b = this;

    // --------------------------
    // -- Parts of the drawing --
    // --------------------------

    b.cylinder = new box.cylinder();
    b.teeth = new box.teeth();
    b.bodyParts = [];

    box.parts.forEach(function(part) {
      b.bodyParts.push(new part());
    });

    b.cylinder.teeth = b.teeth;

    // ------------------------
    // -- Options management --
    // ------------------------

    var defaultOptions = {
      scale: 1,
      width: 100,
      height: 100,
      backgroundColor: 200
    };

    _.assign(defaultOptions, options);
    _.assign(defaultOptions, box.options);

    b.drawer = new Drawer(defaultOptions, b.cylinder, b.teeth, b.bodyParts);
    b.player = new Player();

    b.player.subscribe(b.cylinder);
    b.player.loadFile('assets/scores/melody.json');
    b.player.start();
  };

  Box.prototype.draw = function (processing) {
    b.drawer.draw(processing);
  };

  return Box;

};
