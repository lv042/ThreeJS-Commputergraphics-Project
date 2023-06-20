import {Group, SphereGeometry, MeshBasicMaterial, Mesh, PointLight, TextureLoader} from 'three';
import Land from './Land/Land.js';
import Flower from './Flower/Flower.js';
import BasicLights from './Lights.js';

export default class SeedScene extends Group {
  constructor() {
    super();

    const land = new Land();
    const flower = new Flower();
    const lights = new BasicLights();

    flower.position.set(3, 0, 3);


    flower.castShadow = true;
    flower.receiveShadow = true;
    flower.rotation.y = Math.PI / 2;
    lights.target = flower;

    const geometry = new SphereGeometry(1, 32, 32);
    const material = new MeshBasicMaterial({ color: 0xEB763C }); // yellow color
    const sun = new Mesh(geometry, material);
    sun.position.set(3, 8, 5);
    sun.castShadow = true;
    sun.receiveShadow = true;
    const light = new PointLight(0xFFA500, 10, 10); // orange color
    light.position.set(3, 8, 5); // position the light slightly in front of the sun
    //put texture on sun
    const texture = new TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/9/99/Map_of_the_full_sun.jpg');
    sun.material.map = texture;
    this.add(light);

    this.add(sun);


    this.name = 'scene';

    this.add(land, flower, lights);
  }

  update(timeStamp) {

   // this.rotation.y = timeStamp / 10000;
  }
}
