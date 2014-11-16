// Setup core module
var robox = require('./robox/');

// Setup boxes
var boxes = {
    laputa: require('./boxes/laputa/')
};

// The canvas were the bots will be drawn
var canvas = document.getElementById("mainCanvas");

// Launch processing
var p = [
    new Processing(canvas, robox().createBoxDrawer(boxes.laputa(), {scale: 1.5}))
];

