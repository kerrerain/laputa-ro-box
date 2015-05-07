module.exports = function() {
  'use strict';
  function Test() {}

  Test.prototype.draw = function(processing) {

    var width = 6;
    var length = 50;
    var offset = width / 2;
    var twistX = 0;
    var twistZ = 0;
    var originMouseX = 0;
    var originMouseZ = 0;
    var absTwistX = 0;
    var absTwistZ = 0;
    var twistFactor = 10;

    var springConstant = 45;
    var mass = 50;
    var restoringForce = 0;
    var acceleration = 0;
    var velocity = 0;
    var friction = 0.75;

    processing.setup = function () {
      processing.size(400, 400);
    };

    processing.draw = function () {
      processing.background(200);
      processing.scale(2);
      processing.pushMatrix();

      processing.text("acceleration: " + acceleration.toFixed(2), 15, 15);
      processing.text("velocity: " + velocity.toFixed(2), 15, 30);
      processing.text("twistZ: " + twistX.toFixed(2), 15, 45);

      processing.translate(200 / 2, 70);
      processing.strokeWeight(1);

      // Center the shape
      processing.translate(-offset, 0);

      restoringForce = - springConstant * twistX;
      acceleration = restoringForce / mass - (acceleration * friction);
      velocity += acceleration;
      twistX += velocity;

      absTwistX = Math.abs(twistX) / twistFactor;
      absTwistZ = Math.abs(twistZ);

      processing.beginShape();
      processing.vertex(0, 0);
      processing.bezierVertex(0, length + absTwistX + absTwistZ, 0 - twistX - twistZ, length + absTwistX + absTwistZ, 0 - twistX - twistZ, length + absTwistX + absTwistZ);
      processing.vertex(width - twistX + twistZ, length + absTwistX + absTwistZ);
      processing.bezierVertex(width - twistX + twistZ, length + absTwistX + absTwistZ, width, length + absTwistX + absTwistZ, width, 0);
      processing.vertex(0, 0);
      processing.endShape();

      processing.popMatrix();
    };

    processing.mousePressed = function() {
      originMouseX = processing.mouseX;
      originMouseZ = processing.mouseY;
    };

    processing.mouseReleased = function() {
      originMouseX = 0;
      originMouseZ = 0;
      twistX = twistZ * twistFactor;
      twistZ = 0;
    };

    processing.mouseDragged = function() {
      twistZ = (processing.mouseY - originMouseZ) / twistFactor;
      velocity = 0;
      acceleration = 0;
    };
  };
  return new Test();
};
