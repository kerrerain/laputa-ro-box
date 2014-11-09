function Drawer(options) {

    var scale = options.scale ? options.scale : 1.0;

    function draw(processing) {

        var neck, torso, cylinder, leftArm, rightArm, head, goggles, teeth;

        processing.setup = function () {
            // Viewport
            processing.size(300 * scale, 200 * scale);
            // Robot body parts
            neck = new Neck();
            leftArm = new LeftArm();
            rightArm = new RightArm();
            torso = new Torso();
            cylinder = new Cylinder();
            head = new Head();
            goggles = new Goggles();
            teeth = new Teeth();
        };

        processing.draw = function () {
            processing.scale(scale);
            //
            processing.pushMatrix();
            // Translate
            processing.translate(150, 0);
            //
            neck.display();
            leftArm.display();
            rightArm.display();
            torso.display();
            cylinder.display();
            head.display();
            teeth.display();
            goggles.display();
            //
            processing.popMatrix();
        };

        function Neck() {
            this.display = function () {
                processing.rectMode(processing.CENTER);
                processing.rect(0, 90, 15, 20);
            }
        }

        function Torso() {
            this.display = function () {
                processing.beginShape();
                processing.vertex(-80, 110);
                processing.bezierVertex(-70, 100, 70, 100, 80, 110);
                processing.bezierVertex(80, 110, 100, 120, 70, 250);
                processing.vertex(-70, 250);
                processing.bezierVertex(-100, 120, -80, 110, -80, 110);
                processing.endShape();
            }
        }

        function Cylinder() {
            this.display = function () {
                // Tube
                processing.rectMode(processing.CENTER);
                processing.rect(0, 155, 150, 20);
                // Cylinder
                processing.beginShape();
                processing.vertex(-50, 130);
                processing.bezierVertex(-60, 110, -60, 200, -50, 180);
                processing.vertex(50, 180);
                processing.bezierVertex(60, 200, 60, 110, 50, 130);
                processing.vertex(-50, 130);
                processing.endShape();
            }
        }

        function LeftArm() {
            this.display = function () {
                processing.rectMode(processing.CENTER);
                processing.rect(-100, 125, 40, 20);
                processing.ellipse(-110, 125, 40, 40);
            };
        }

        function RightArm() {
            this.display = function () {
                processing.rectMode(processing.CENTER);
                processing.rect(100, 125, 40, 20);
                processing.ellipse(110, 125, 40, 40);
            };
        }

        function Head() {
            this.display = function () {

                processing.beginShape();

                // TODO replace this by vertex
                processing.arc(0, 60, 60, 80, -processing.PI, 0);
                processing.line(-30, 60, -30, 80);
                processing.line(-30, 80, 30, 80);
                processing.line(30, 80, 30, 60);

                processing.endShape();

                processing.fill(255);
            };
        }

        function Goggles() {
            this.display = function () {
                // Shape
                processing.rectMode(processing.CENTER);
                processing.rect(0, 60, 70, 30);
                // Eyes
                processing.ellipse(-15, 65, 10, 10);
                processing.ellipse(15, 60, 15, 15);
                // Nostrils
                processing.ellipse(0, 60, 2, 2);
                processing.ellipse(0, 70, 2, 2);
            };
        }

        function Teeth() {
            this.display = function () {
                for (var i = -28; i < 28; i += 5) {
                    drawTeeth(i);
                }
                // Reset translation
                processing.translate(0, 0);
            };

            function drawTeeth(x) {
                processing.pushMatrix();
                processing.translate(x, 0);
                processing.rect(0, 100, 3, 53);
                processing.popMatrix();
            }
        }

    }

    var canvas = document.getElementById("mainCanvas");
    var p = new Processing(canvas, draw);
}

var options = {scale: 1.5};
var drawer = new Drawer(options);