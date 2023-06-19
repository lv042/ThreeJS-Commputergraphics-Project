import { Group } from 'three';
import Land from './Land/Land.js';
import Flower from './Flower/Flower.js';
import BasicLights from './Lights.js';

export default class SeedScene extends Group {
  constructor() {
    super();

    const land = new Land();
    const flower = new Flower();
    const lights = new BasicLights();

    flower.position.set(0, 0, 0);
    land.position.set(0, 0, 0);
    lights.position.set(0, 0, 0);

    flower.castShadow = true;
    flower.receiveShadow = true;
    flower.rotation.y = Math.PI / 2;


    this.name = 'scene';

    this.add(land, flower, lights);
  }

  update(timeStamp) {

   // this.rotation.y = timeStamp / 10000;
  }
}
