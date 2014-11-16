module.exports = function () {

    var options, Cylinder, Teeth, parts;

    var d, Drawer = function (_options_, _Cylinder_, _Teeth_, _parts_) {
        options = _options_;
        Cylinder = _Cylinder_;
        Teeth = _Teeth_;
        parts = _parts_;
    };

    Drawer.prototype.draw = function (processing) {
        draw(processing);
    };

    function draw(processing) {

        var drawCylinder, drawTeeth, drawParts = [];

        processing.setup = function () {
            // Viewport
            processing.size(options.width * options.scale, options.height * options.scale);

            drawCylinder = new Cylinder(processing);
            drawTeeth = new Teeth(processing);

            parts.forEach(function (Part) {
                drawParts.push(new Part(processing));
            });

        };

        processing.draw = function () {
            processing.scale(options.scale);
            //
            processing.pushMatrix();
            // Translate
            processing.translate(options.width / 2, 0);

            drawParts.forEach(function (part) {
                part.display();
            });

            drawCylinder.display();
            drawTeeth.display();

            processing.popMatrix();
        };

    }

    return Drawer;

};