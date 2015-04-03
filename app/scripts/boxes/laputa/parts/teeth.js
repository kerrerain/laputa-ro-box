module.exports = function () {
  'use strict';

  function Teeth() {}

  function drawTeeth(processing, x) {
    processing.pushMatrix();
    processing.translate(x, 0);
    processing.rect(0, 100, 3, 53);
    processing.popMatrix();
  }

  Teeth.prototype.display = function (processing) {
    for (var i = -28; i < 28; i += 5) {
      drawTeeth(processing, i);
    }
    // Reset translation
    processing.translate(0, 0);
  };

  return Teeth;

};
