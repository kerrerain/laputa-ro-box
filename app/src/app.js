import Box from './box';
import Test from './test';

let box = new Box({
	scale: 1.5
});

let canvas = document.getElementById("mainCanvas");

new Processing(canvas, box.draw);

let canvasTest = document.getElementById("testCanvas");

new Processing(canvasTest, new Test().draw);

document.getElementById("play").addEventListener("click", event => {
	box.sequencer.play();
}, false);

document.getElementById("stop").addEventListener("click", event => {
	box.sequencer.stop();
}, false);