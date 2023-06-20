import { Clock, Group, AnimationMixer, TextureLoader, MeshBasicMaterial } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import MODEL from './basic_plane_model.fbx';
import PLANE_ALBEDO from './plane_albedo.jpg';

export default class Plane extends Group {
  constructor() {
    super();

    this.name = 'Plane';
    const loader = new FBXLoader();
    let mixer;

    loader.load(MODEL, (object) => {
      object.scale.set(0.003, 0.003, 0.003);

      const textureLoader = new TextureLoader();
      textureLoader.load(PLANE_ALBEDO, (texture) => {
        const material = new MeshBasicMaterial({ map: texture });
        object.traverse((child) => {
          if (child.isMesh) {
            child.material = material;
          }
        });
      });

      mixer = new AnimationMixer(object);
      const animationAction = mixer.clipAction(object.animations[0]);
      animationAction.play();
      this.add(object);
    });


    this.radius = 10;
    this.speed = 0.01;
    this.angle = 0;

    // Animation loop
    const clock = new Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());
      this.update();
    };
    animate();
  }

  update() {

    this.angle += this.speed;

    const x = Math.cos(this.angle) * this.radius;
    const y = 5;
    const z = Math.sin(this.angle) * this.radius;

    this.position.set(x, y, z);
    this.rotation.y = Math.atan2(Math.cos(this.angle), Math.sin(this.angle )) - 90;
  }
}
