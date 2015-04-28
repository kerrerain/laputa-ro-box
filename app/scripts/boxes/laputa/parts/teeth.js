module.exports = function () {
  'use strict';

  function Tooth() {
    this.easing = 0.05;
    this.twistX = 0;
    this.twistZ = 0;
  }

  Tooth.prototype.display = function(processing, positionX) {
    processing.pushMatrix();
    processing.translate(positionX, 25);
//    processing.rect(0, 100, 3 + this.twistX, 53);

    processing.beginShape();

    processing.curveVertex(0, 53);
    processing.curveVertex(0, 53);
    processing.curveVertex(this.twistX, 100);
    processing.curveVertex(this.twistX, 100);

    processing.endShape();

    processing.beginShape();
    processing.vertex(0, 53);
    processing.vertex(3, 53);
    processing.endShape();

    processing.beginShape();
    processing.vertex(0, 100);
    processing.vertex(3, 100);
    processing.endShape();

    processing.beginShape();

    processing.curveVertex(3, 53);
    processing.curveVertex(3, 53);
    processing.curveVertex(3 + this.twistX, 100);
    processing.curveVertex(3 + this.twistX, 100);

    processing.endShape();

//    processing.curveVertex(this.twistX, 100);
//    processing.curveVertex(this.twistX, 100);
//    processing.curveVertex(0, 53);
//    processing.vertex(0, 53);
//    processing.vertex(3, 53);
//    processing.curveVertex(3 + this.twistX, 100);
//    processing.vertex(3 + this.twistX, 100);
//    processing.vertex(this.twistX, 100);
//    processing.vertex(this.twistX, 100);

    processing.endShape();

    processing.popMatrix();
    this.computetwistX();
  };

  Tooth.prototype.computetwistX = function() {
    if (Math.abs(this.twistX) > 0) {
      this.twistX += this.twistX < 0 ? this.easing : -this.easing;
      this.twistX = - this.twistX;
      if (Math.abs(this.twistX) < this.easing) {
        this.twistX = 0;
      }
    }
  };

  Tooth.prototype.triggerVibration = function() {
    this.twistX = 2;
  };

  function Teeth(numberOfTeeth, toothWidth, toothMargin) {
    this.teeth = [];
    this.numberOfTeeth = numberOfTeeth || 12;
    this.toothWidth = toothWidth || 3;
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
