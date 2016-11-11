module.exports = function () {
  'use strict';

  var d, Drawer = function (options, cylinder, teeth, parts) {
    this.options = options;
    this.cylinder = cylinder;
    this.teeth = teeth;
    this.parts = parts;
  };

  Drawer.prototype.draw = function (processing) {
    var self = this;

    processing.setup = function () {
      // Viewport
      processing.size(self.options.width * self.options.scale, self.options.height * self.options.scale);
    };

    processing.draw = function () {
      processing.background(self.options.backgroundColor);
      processing.scale(self.options.scale);
      //
      processing.pushMatrix();
      // Translate
      processing.translate(self.options.width / 2, 0);

      self.parts.forEach(function (part) {
        part.display(processing);
      });

      self.cylinder.display(processing);
      self.teeth.display(processing);

      processing.popMatrix();
    };
  };

  return Drawer;

};