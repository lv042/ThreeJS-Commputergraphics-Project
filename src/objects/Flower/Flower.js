import { Group, TextureLoader, AnimationMixer, Clock } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import MODEL from './Gangnam Style.fbx';
import TEXTURE from './ThanosTextur.png';

export default class Flower extends Group {
  constructor() {
    super();

    this.name = 'flower';

    const fbxLoader = new FBXLoader();
    const textureLoader = new TextureLoader();
    this.mixer = null; // Animation mixer
    this.clock = new Clock(); // Clock for managing animation time

    // Load texture
    const texture = textureLoader.load(TEXTURE);

    // Load model
    fbxLoader.load(MODEL, (model) => {
      model.scale.set(0.001, 0.001, 0.001); // Adjust scale as per your need
      model.animations; // Save animations


      this.add(model);
    });
  }

  update(deltaTime) {
    // If there's an animation mixer, update it with the time delta
    if(this.mixer) {
      this.mixer.update(this.clock.getDelta());
    }
  }
}
