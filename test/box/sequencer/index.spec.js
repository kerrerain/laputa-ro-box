(function() {
	'use strict';

	var assert = require('chai').assert;
	var Sequencer = require('../../../app/scripts/box/sequencer/');

	var notes = [{
		position: 12,
		time: 0
	}, {
		position: 0,
		time: 4
	}, {
		position: 4,
		time: 6
	}, {
		position: 4,
		time: 8
	}, {
		position: 2,
		time: 14
	}, {
		position: 6,
		time: 14
	}];

	describe('Sequencer', function() {
		var sequencer;

		beforeEach(function() {
			sequencer = new Sequencer();
			sequencer.load(notes);
		});

		describe('#load(notes)', function() {
			it('should init the score', function() {
				// Arrange
				// Act
				sequencer.load(notes);

				// Assert
				assert.isDefined(sequencer.score);
				assert.isDefined(sequencer.score.notes);
			});

			it('should compute the endTime of the score', function() {
				// Arrange
				// Act
				sequencer.load(notes);

				// Assert
				assert.equal(14, sequencer.score.endTime);
			});
		});

		describe('#forward(timeToAdd)', function() {
			it('should play notes forward', function() {
				// Arrange
				// Act
				var result = sequencer.forward(6);

				// Assert
				assert.equal(2, result.length);
				assert.equal(0, result[0].time);
				assert.equal(4, result[1].time);
			});

			it('should not play notes twice', function() {
				// Arrange
				sequencer.forward(6);

				// Act
				var result = sequencer.forward(6);

				// Assert
				assert.equal(2, result.length);
				assert.equal(6, result[0].time);
				assert.equal(8, result[1].time);
			});

			it('should play the notes in loop', function() {
				// Arrange
				sequencer.forward(16);

				// Act				
				var result = sequencer.forward(1);

				// Assert
				assert.equal(1, result.length);
				assert.equal(0, result[0].time);
			});
		});
	});
})();