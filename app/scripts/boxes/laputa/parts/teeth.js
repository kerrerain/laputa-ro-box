module.exports = function () {
  'use strict';

  function Tooth() {
  }

  Tooth.prototype.display = function(processing, positionX) {
    processing.pushMatrix();
    processing.translate(positionX, 0);
    processing.rect(0, 100, 3, 53);
    processing.popMatrix();
  };

  function Teeth(numberOfTeeth, toothWidth, toothMargin) {
    this.teeth = [];
    this.numberOfTeeth = numberOfTeeth || 12;
    this.toothWidth = toothWidth || 3;
    this.toothMargin = toothMargin || 2;
    this.offsetLeft = this.numberOfTeeth * (this.toothWidth + this.toothMargin) / 2;
    console.log(this.offsetLeft);

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

  return Teeth;

};
