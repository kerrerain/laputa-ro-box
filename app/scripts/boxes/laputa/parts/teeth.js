var _ = require('lodash')();

module.exports = function () {
  'use strict';

  var TOOTH_WIDTH = 4;
  var TOOTH_LENGTH = 55;

  var K = 0.90; // Spring constant
  var M = 0.25; // Mass
  var D = 0.90; // Damping between 0 and 1

  var vibrationDelay = 500;

  function Tooth() {
    this.twistX = 0;
    this.twistZ = 0;

    this.acceleration = 0;
    this.velocity = 0;
  }

  Tooth.prototype.computetwistX = function() {
    this.restoringForce = - K * this.twistX; // Restoring force of a spring: f=-kx
    this.acceleration = this.restoringForce / M;
    this.velocity = D * (this.velocity + this.acceleration); // D is between 0 and 1 --> reduces velocity
    this.twistX = this.twistX + this.velocity;

    if (Math.abs(this.velocity) < 0.1 && Math.abs(this.acceleration) < 0.1) {
      this.restoringForce = 0;
      this.acceleration = 0;
      this.velocity = 0;
      this.twistX = 0;
    }
  };

  Tooth.prototype.display = function(processing, positionX) {
    processing.pushMatrix();
    processing.translate(positionX - (TOOTH_WIDTH / 2), 20 + TOOTH_LENGTH);

    this.computetwistX();

    var absTwistX = Math.abs(this.twistX);
    var absTwistZ = Math.abs(this.twistZ) / 5;

    processing.beginShape();
    processing.vertex(0, 0);
    processing.bezierVertex(0, TOOTH_LENGTH / 8 + absTwistZ, 0, TOOTH_LENGTH / 1.5 + absTwistZ, 0 - this.twistX - absTwistZ, TOOTH_LENGTH + absTwistZ);
    processing.vertex(TOOTH_WIDTH - this.twistX + absTwistZ, TOOTH_LENGTH + absTwistZ);
    processing.bezierVertex(TOOTH_WIDTH, TOOTH_LENGTH / 1.5 + absTwistZ, TOOTH_WIDTH, TOOTH_LENGTH / 8 + absTwistZ, TOOTH_WIDTH, 0);
    processing.vertex(0, 0);
    processing.endShape();

    processing.popMatrix();
  };

  Tooth.prototype.triggerVibration = function() {
    var self = this;

    self.twisted = true;

    var interval = window.setInterval(function() {
      self.twistZ += 0.1;
    }, 10);

    window.setTimeout(function() {
      self.twistX = self.twistZ;
      self.twistZ = 0;
      self.twisted = false;
      window.clearInterval(interval);
    }, vibrationDelay);

  };

  function Teeth(numberOfTeeth, toothWidth, toothMargin) {
    this.teeth = [];
    this.numberOfTeeth = numberOfTeeth || 12;
    this.toothWidth = toothWidth || 4;
    this.toothMargin = toothMargin || 2;
    this.offsetLeft = this.numberOfTeeth * (this.toothWidth + this.toothMargin) / 2;

    for (var i = 0; i < this.numberOfTeeth; i++) {
      this.teeth.push(new Tooth());
    }
  }

  Teeth.prototype.getToothPositionX = function(index) {
    return index * (this.toothWidth + this.toothMargin) - this.offsetLeft;
  };

  Teeth.prototype.display = function (processing) {
    // Draw each tooth
    for (var i = 0; i < this.numberOfTeeth; i++) {
      this.teeth[i].display(processing, this.getToothPositionX(i));
    }
    // Reset translation
    processing.translate(0, 0);
  };

  Teeth.prototype.triggerVibration = function(index) {
    this.teeth[index].triggerVibration();
  };

  return Teeth;

};
