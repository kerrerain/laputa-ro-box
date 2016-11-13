import Box from './box';
import Test from './test';
import Sequencer from './sequencer';
import melody from './scores/melody.js'

let canvas = document.getElementById("mainCanvas");

new Processing(canvas, new Box({
	scale: 1.5
}).draw);

let canvasTest = document.getElementById("testCanvas");

new Processing(canvasTest, new Test().draw);

let sequencer = new Sequencer();

sequencer.load(melody);

document.getElementById("play").addEventListener("click", event => {
	sequencer.play();
}, false);

document.getElementById("stop").addEventListener("click", event => {
	sequencer.stop();
}, false);