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
    var absTwistZ = 0;

    var K = 0.90; // Spring constant
    var M = 0.5; // Mass
    var D = 0.90; // Damping between 0 and 1
    var restoringForce = 0;
    var acceleration = 0;
    var velocity = 0;

    processing.setup = function () {
      processing.size(400, 400);
    };

    processing.draw = function () {
      processing.background(200);
      processing.scale(2);
      processing.pushMatrix();

      processing.text("acceleration: " + acceleration.toFixed(2), 15, 15);
      processing.text("velocity: " + velocity.toFixed(2), 15, 30);
      processing.text("twistX: " + twistX.toFixed(2), 15, 45);

      processing.text("K: " + K, 15, 80);
      processing.text("M: " + M, 15, 95);
      processing.text("D: " + D, 15, 110);

      processing.translate(200 / 2, 70);
      processing.strokeWeight(1);

      // Center the shape
      processing.translate(-offset, 0);

      restoringForce = - K * twistX;
      acceleration = restoringForce / M;
      velocity = D * (velocity + acceleration);
      twistX = twistX + velocity;

      if (Math.abs(velocity) < 0.1 && Math.abs(acceleration) < 0.1) {
        restoringForce = 0;
        acceleration = 0;
        velocity = 0;
        twistX = 0;
      }

      absTwistZ = Math.abs(twistZ) / 5;

      processing.beginShape();
      processing.vertex(0, 0);
      processing.bezierVertex(0, length / 4 + absTwistZ, 0, length / 1.5 + absTwistZ, 0 - twistX - absTwistZ, length + absTwistZ);
      processing.vertex(width - twistX + absTwistZ, length + absTwistZ);
      processing.bezierVertex(width, length / 1.5 + absTwistZ, width, length / 4 + absTwistZ, width, 0);
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
      twistX = twistZ;
      twistZ = 0;
    };

    processing.mouseDragged = function() {
      twistZ = (processing.mouseY - originMouseZ) / 15;
      velocity = 0;
      acceleration = 0;
    };
  };
  return new Test();
};
