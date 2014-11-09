
function Drawer(options){

    var scale = options.scale ? options.scale : 1.0;

    function draw(processing) {

        var neck, torso, leftArm, rightArm, head, goggles;

        processing.setup = function () {
            // Viewport
            processing.size(300 * scale, 200 * scale);
            // Robot body parts
            neck = new Neck();
            torso = new Torso();
            leftArm = new LeftArm();
            rightArm = new RightArm();
            head = new Head();
            goggles = new Goggles();
        };

        processing.draw = function () {
            processing.scale(scale);
            neck.display();
            torso.display();
            leftArm.display();
            rightArm.display();
            head.display();
            goggles.display();
        };

        function Neck() {
            this.display = function () {
                processing.rectMode(processing.CENTER);
                processing.rect(150, 90, 15, 20);
            }
        }

        function Torso() {
            this.display = function () {
                processing.beginShape();
                processing.vertex(70, 110);
                processing.bezierVertex(80, 100, 220, 100, 230, 110);
                processing.bezierVertex(250, 110, 260, 120, 220, 250);
                processing.vertex(80, 250);
                processing.bezierVertex(40, 120, 50, 110, 70, 110);
                processing.endShape();
            }
        }

        function LeftArm() {
            this.display = function () {
                processing.ellipse(40, 130, 40, 40);
            };
        }

        function RightArm() {
            this.display = function () {
                processing.ellipse(260, 130, 40, 40);
            };
        }

        function Head() {
            this.display = function () {

                processing.beginShape();

                processing.arc(150, 60, 60, 80, -processing.PI, 0);
                processing.line(120, 60, 120, 80);
                processing.line(120, 80, 180, 80);
                processing.line(180, 80, 180, 60);

                processing.endShape();

                processing.fill(255);
            };
        }

        function Goggles() {
            this.display = function () {
                // Shape
                processing.rectMode(processing.CENTER);
                processing.rect(150, 60, 70, 30);
                // Eyes
                processing.ellipse(135, 65, 10, 10);
                processing.ellipse(165, 60, 15, 15);
                // Nostrils
                processing.ellipse(150, 60, 2, 2);
                processing.ellipse(150, 70, 2, 2);
            };
        }

    }

    var canvas = document.getElementById("mainCanvas");
    var p = new Processing(canvas, draw);
}

var options = {scale: 1.5};
var drawer = new Drawer(options);