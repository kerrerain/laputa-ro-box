var Box = require('./box')();

/**
 * Setup ro-box
 */
module.exports = function () {

    return {
        createBoxDrawer: function(box, options){
            var instance = new Box(box, options);
            return instance.draw;
        }
    };

};
