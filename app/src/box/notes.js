let order = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// Assuming note = 'A3' or 'B#6' for example
let noteWeight = note => {
	return note.length +
		order.indexOf(note[0]) * 2 +
		(Number(note[note.length - 1]) * order.length * 3);
};

let gatherNotesFromScore = score => {
	let notesSet = {};

	score.forEach(note => {
		notesSet[note.n] = true;
	});

	return Object.keys(notesSet).sort((a, b) => {
		return noteWeight(a) - noteWeight(b);
	});
};

export default gatherNotesFromScore;