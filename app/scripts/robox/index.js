var Box = require('./box')();

/**
 * Setup ro-box
 */
module.exports = function () {
  'use strict';

  return {
    createBox: function(box, options) {
      return new Box(box, options);
    }
  };

};
