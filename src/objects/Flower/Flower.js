import {Clock, Group, AnimationMixer } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import MODEL from './Gangnam Style.fbx';

export default class Flower extends Group {
  constructor() {
    super();

    this.name = 'flower';
    const loader = new FBXLoader();
    let mixer;

    loader.load(MODEL, (object) => {
      object.scale.set(0.001, 0.001, 0.001);  // Depending on the model size, you may need to adjust these values
      mixer = new AnimationMixer(object);
      const animationAction = mixer.clipAction(object.animations[0]);
      animationAction.play();
      this.add(object);
    });

    // You need an animation loop to update the mixer in your main code:
    const clock = new Clock();

    function animate() {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());

    }

    animate();
  }
}
