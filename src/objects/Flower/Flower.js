import { Group, TextureLoader, AnimationMixer, Clock } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import MODEL from './Thanos.fbx';
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
      model.scale.set(0.01, 0.01, 0.01); // Adjust scale as per your need
      model.traverse((child) => {
        if (child.isMesh) {
          // Apply texture to the model
          child.material.map = texture;
        }
      });

      // Create an animation mixer and apply it to the model
      this.mixer = new AnimationMixer(model);

      // If there are animations in the model, play them
      if(model.animations.length > 0){
        model.animations.forEach((clip) => {
          this.mixer.clipAction(clip).play();
        });
      }

      // Add model to the group
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
