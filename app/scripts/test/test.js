module.exports = function() {
  'use strict';
  function Test() {}

  function twistEasing(twist, easing) {
    var result = twist;
    if (Math.abs(result) > 0) {
      result += result < 0 ? easing : -easing;
      result = - result;
      if (Math.abs(result) < easing) {
        result = 0;
      }
    }
    return result;
  }

  Test.prototype.draw = function(processing) {

    var width = 6;
    var offset = width / 2;
    var twistZ = 0;
    var originMouseX = 0;
    var originMouseY = 0;
    var easing = 5;

    processing.setup = function () {
      processing.size(400, 400);
    };

    processing.draw = function () {
      processing.background(200);
      processing.scale(2);
      processing.pushMatrix();
      processing.translate(200 / 2, 50);
      processing.strokeWeight(1);

      // Center the shape
      processing.translate(-offset, 0);

      processing.beginShape();
      processing.vertex(0, 0);
      processing.bezierVertex(0, 50, 0, 50, 0 - twistZ, 50 + twistZ);
      processing.vertex(width + twistZ, 50 + twistZ);
      processing.bezierVertex(width - twistZ, 50, width, 0, width, 0);
      processing.vertex(0, 0);
      processing.endShape();

      processing.popMatrix();

      twistZ = twistEasing(twistZ, easing);
    };

    processing.mousePressed = function() {
      originMouseX = processing.mouseX;
      originMouseY = processing.mouseY;
    };

    processing.mouseReleased = function() {
      originMouseX = 0;
      originMouseY = 0;
    };

    processing.mouseDragged = function() {
      twistZ = processing.mouseY - originMouseY;
    };
  };
  return new Test();
};
