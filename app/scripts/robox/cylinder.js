module.exports = function () {
  'use strict';
  function Cylinder(drawer) {
    this.drawer = drawer;
  }
  Cylinder.prototype.registerTeeth = function(teeth) {
    this.teeth = teeth;
  };
  Cylinder.prototype.draw = function(processing) {

  };
  return Cylinder;
};
