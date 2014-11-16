var Drawer = require('./drawer')();

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

        b.options = options;

        // Default values
        b.options.scale = b.options.scale ? b.options.scale : 1;
        b.options.width = box.options.width ? box.options.width : 100;
        b.options.height = box.options.height ? box.options.height : 100;

        // -----------------------
        // -- Drawer management --
        // -----------------------
        b.drawer = new Drawer(b.options, b.cylinder, b.teeth, b.bodyParts);
    };

    Box.prototype.draw = function(processing){
        b.drawer.draw(processing);
    };

    return Box;

};
