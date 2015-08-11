var _ = require('lodash')();

module.exports = function () {
  'use strict';

  var TOOTH_WIDTH = 4;
  var TOOTH_MARGIN = 0;
  var TOOTH_BASE_LENGTH = 55;
  var NUMBER_OF_TEETH = 16;

  var K = 0.40; // Spring constant
  var M = 0.15; // Mass
  var D = 0.95; // Damping between 0 and 1

  var vibrationDelay = 500;
  var teethDrawingStack = [];

  function Tooth(positionX, positionY, length) {
    this.twistX = 0;
    this.twistZ = 0;

    this.acceleration = 0;
    this.velocity = 0;

    this.positionX = positionX;
    this.positionY = positionY;
    this.length = length || TOOTH_BASE_LENGTH;
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

  Tooth.prototype.display = function(processing) {
    processing.pushMatrix();
    processing.translate(this.positionX - (TOOTH_WIDTH / 2), this.positionY);

    this.computetwistX();

    var absTwistZ = this.twistZ / 5;

    processing.beginShape();
    processing.vertex(0, 0);
    processing.bezierVertex(0, 0, 0, this.length / 1.5 + absTwistZ, 0 - this.twistX - absTwistZ, this.length + absTwistZ);
    processing.vertex(TOOTH_WIDTH - this.twistX + absTwistZ, this.length + absTwistZ);
    processing.bezierVertex(TOOTH_WIDTH, this.length / 1.5 + absTwistZ, TOOTH_WIDTH, 0, TOOTH_WIDTH, 0);
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

  function TeethBase(teeth) {
    this.width = 0;
    this.x1 = teeth[0].positionX - (TOOTH_WIDTH / 2);
    this.y1 = teeth[0].positionY;
    this.x2 = teeth[teeth.length - 1].positionX + (TOOTH_WIDTH / 2);
    this.y2 = teeth[teeth.length - 1].positionY;
    this.height = 35;
  }

  TeethBase.prototype.display = function(processing) {
    processing.pushMatrix();
    processing.beginShape();
    processing.vertex(this.x1, this.y1);
    processing.bezierVertex(this.x1 - 15, this.y1 - (this.height - 5), this.x1, this.y1 - this.height, this.x1, this.y1 - this.height);
    processing.bezierVertex((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2, this.x2 + 5, this.y1 - (this.height - 5), this.x2 + 5, this.y1 - (this.height - 5));
    processing.bezierVertex(this.x2 + 15, this.y2 - 5, this.x2 + 15, this.y2 - (this.height - 5), this.x2, this.y2);
    processing.vertex(this.x2, this.y2 + 5);
    processing.vertex(this.x1, this.y2 + 5);
    processing.vertex(this.x1, this.y1);
    processing.endShape();
    processing.popMatrix();

    //// Eyes
    processing.ellipse(this.x1 + 15, this.y1 - (this.height / 2) + 5, 15, 15);
    processing.ellipse(this.x2 - 15, this.y2 - (this.height / 2), 10, 10);
  };

  function Teeth(numberOfTeeth, toothWidth) {
    this.teeth = [];
    this.numberOfTeeth = numberOfTeeth || NUMBER_OF_TEETH;
    this.toothWidth = toothWidth || TOOTH_WIDTH;
    this.offsetLeft = this.numberOfTeeth * (this.toothWidth + TOOTH_MARGIN) / 2;

    for (var i = 0; i < this.numberOfTeeth; i++) {
      this.teeth.push(new Tooth(this.getToothPositionX(i), this.getToothPositionY(i), TOOTH_BASE_LENGTH - i));
    }

    this.teethBase = new TeethBase(this.teeth);
  }

  Teeth.prototype.getToothPositionX = function(index) {
    return index * (this.toothWidth + TOOTH_MARGIN) - this.offsetLeft;
  };

  Teeth.prototype.getToothPositionY = function(index) {
    return index;
  };

  Teeth.prototype.display = function (processing) {
    processing.translate(0, 75);
    // Draw the teeth base
    this.teethBase.display(processing);
    // Sort the teeth
    teethDrawingStack = [];
    this.teeth.forEach(function(tooth) {
      teethDrawingStack.push(tooth);
    });
    teethDrawingStack = teethDrawingStack.sort(function(a, b) {
      return a.twisted || Math.abs(a.twistX) - Math.abs(b.twistX);
    });
    // Draw each tooth
    for (var i = 0; i < this.teeth.length; i++) {
      teethDrawingStack[i].display(processing);
    }
    // Reset translation
    processing.translate(0, 0);
  };

  Teeth.prototype.triggerVibration = function(index) {
    this.teeth[index].triggerVibration();
  };

  return Teeth;

};
