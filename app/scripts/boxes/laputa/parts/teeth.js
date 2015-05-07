var _ = require('lodash')();

module.exports = function () {
  'use strict';

  var width = 4;
  var length = 55;
  var offset = width / 2;
  var twistFactor = 20;

  var springConstant = 45;
  var mass = 50;
  var friction = 0.75;

  var vibrationDelay = 500;

  function Tooth() {
    this.twistX = 0;
    this.twistZ = 0;

    this.acceleration = 0;
    this.velocity = 0;
  }

  Tooth.prototype.computetwistX = function() {
    var restoringForce = - springConstant * this.twistX;
    this.acceleration = restoringForce / mass - (this.acceleration * friction);
    this.velocity += this.acceleration;
    this.twistX += this.velocity;
  };

  Tooth.prototype.display = function(processing, positionX) {
    processing.pushMatrix();
    processing.translate(positionX - offset, 20 + length);

    this.computetwistX();

    var absTwistX = Math.abs(this.twistX) / twistFactor;
    var absTwistZ = Math.abs(this.twistZ) / twistFactor;

    processing.beginShape();
    processing.vertex(0, 0);
    processing.bezierVertex(0, length + absTwistX + absTwistZ, 0 - this.twistX - this.twistZ, length + absTwistX + absTwistZ, 0 - this.twistX - this.twistZ, length + absTwistX + absTwistZ);
    processing.vertex(width - this.twistX + this.twistZ, length + absTwistX + absTwistZ);
    processing.bezierVertex(width - this.twistX + this.twistZ, length + absTwistX + absTwistZ, width, length + absTwistX + absTwistZ, width, 0);
    processing.vertex(0, 0);
    processing.endShape();

    processing.popMatrix();
  };

  Tooth.prototype.triggerVibration = function() {
    var self = this;

    self.twisted = true;

    var interval = window.setInterval(function() {
      self.twistZ += 1 / twistFactor;
    }, 10);

    window.setTimeout(function() {
      self.twistX = self.twistZ * twistFactor;
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
