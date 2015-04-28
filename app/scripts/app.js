// Setup core module
var robox = require('./robox/');

// Setup boxes
var boxes = {
    laputa: require('./boxes/laputa/')
};

// The canvas were the bots will be drawn
var canvas = document.getElementById("mainCanvas");

var box = robox().createBox(boxes.laputa(), {scale: 1.5});

// Launch processing
var p = [
    new Processing(canvas, box.draw)
];

var canvasTest = document.getElementById("testCanvas");

var test = require('./test/test')();
var p = [
  new Processing(canvasTest, test.draw)
];

