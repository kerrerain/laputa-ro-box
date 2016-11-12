import SoundPlayer from './sound-player';
import Tooth from './tooth';
import setup from './setup';

class Test {
  constructor() {
    this.draw = setup(new Tooth(), new SoundPlayer());
  }
}

export default Test;