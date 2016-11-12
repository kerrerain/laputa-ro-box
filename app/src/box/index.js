import Body from './body';
import Mechanism from '../mechanism';
import setup from './setup';
import _ from 'lodash';

let options = {
	scale: 1,
	width: 400,
	height: 200,
	backgroundColor: 200,
	notes: 16,
	tooth: {
		width: 4,
		length: 55
	}
};

class Box {
	constructor(customOptions) {
		_.assign(options, customOptions);
		this.draw = setup(options, new Body(), new Mechanism(options));
	}
}

export default Box;