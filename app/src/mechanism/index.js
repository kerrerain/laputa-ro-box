import Cylinder from './cylinder';
import Comb from './comb';

class Mechanism {
	constructor(options) {
		this.options = options;
		this.cylinder = new Cylinder();
		this.comb = new Comb(options);
	}

	display(processing) {
		this.cylinder.display(processing);
		this.comb.display(processing);
	}
}

export default Mechanism;