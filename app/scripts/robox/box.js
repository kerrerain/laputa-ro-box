var Drawer = require('./drawer')();
var _ = require('lodash');

module.exports = function(){

    var b, Box = function (box, options){

        b = this;

        // --------------------------
        // -- Parts of the drawing --
        // --------------------------

        b.cylinder = box.cylinder;
        b.teeth = box.teeth;
        b.bodyParts = box.parts;

        // ------------------------
        // -- Options management --
        // ------------------------

        var defaultOptions = {
            scale: 1,
            width: 100,
            height: 100,
            backgroundColor: 200
        };

        _.assign(defaultOptions, options);
        _.assign(defaultOptions, box.options);

        // -----------------------
        // -- Drawer management --
        // -----------------------

        b.drawer = new Drawer(defaultOptions, b.cylinder, b.teeth, b.bodyParts);
    };

    Box.prototype.draw = function(processing){
        b.drawer.draw(processing);
    };

    return Box;

};
