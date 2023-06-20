import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './floating_island_of_the_potion_brewer.glb';

export default class Land extends Group {
  constructor() {
    const loader = new GLTFLoader();

    super();

    this.name = 'land';


    loader.load(MODEL, (gltf)=>{
      this.add(gltf.scene);
      //scale the model
      this.scale.set(0.01, 0.01, 0.01);
    });
  }
}
