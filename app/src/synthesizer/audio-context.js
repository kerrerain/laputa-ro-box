let audioContext;

if (window.AudioContext) {
	audioContext = new window.AudioContext();
} else {
	audioContext = new window.webkitAudioContext();
}

export default audioContext;