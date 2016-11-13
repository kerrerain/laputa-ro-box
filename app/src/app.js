import Box from './box';
import Test from './test';

let box = new Box({
	scale: 2
});

let canvas = document.getElementById("mainCanvas");

new Processing(canvas, box.draw);

document.getElementById("play").addEventListener("click", event => {
	box.sequencer.play();
}, false);

document.getElementById("stop").addEventListener("click", event => {
	box.sequencer.stop();
}, false);

// let canvasTest = document.getElementById("testCanvas");

// new Processing(canvasTest, new Test().draw);