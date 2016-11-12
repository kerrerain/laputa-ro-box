import Box from './box';
import Test from './test';

let canvas = document.getElementById("mainCanvas");

new Processing(canvas, new Box({
	scale: 1.5
}).draw);

let canvasTest = document.getElementById("testCanvas");

new Processing(canvasTest, new Test().draw)