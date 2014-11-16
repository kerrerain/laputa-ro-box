module.exports = function(){

    function Teeth(processing) {
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

    return Teeth;

};
