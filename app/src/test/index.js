import Synthesizer from '../synthesizer';
import Tooth from './tooth';
import setup from './setup';

class Test {
	constructor() {
		this.draw = setup(new Tooth(), new Synthesizer());
	}
}

export default Test;