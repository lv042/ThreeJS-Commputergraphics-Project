import {
  Group,
  SphereGeometry,
  CylinderGeometry,
  MeshBasicMaterial,
  Mesh,
  PointLight,
  TextureLoader,
  MeshPhongMaterial,
  Color
} from 'three';
import Land from './Land/Land.js';
import Miles from './Miles/Miles.js';
import Plane from './Plane/Plane.js';
import BasicLights from './Lights.js';

export default class SeedScene extends Group {
  constructor() {
    super();

    this.name = 'scene';

    const land = new Land();
    const miles = new Miles();
    const lights = new BasicLights();

    miles.position.set(3, 0, 3);
    miles.castShadow = true;
    miles.receiveShadow = true;
    miles.rotation.y = Math.PI / 2;
    lights.target = miles;

    const sun = this.createSun();
    const zeppelin = this.createZeppelin();
    const plane = new Plane();
    plane.position.set(0, 10, 0);
    const zeppelin2 = this.createZeppelin();
    zeppelin2.rotation.y = Math.PI /2;
    zeppelin2.position.set(0, 5, -5);

    this.add(sun);
    this.add(zeppelin);
    this.add(zeppelin2);
    this.add(land);
    this.add(miles);
    this.add(lights);
    this.add(plane);
  }

  createSun() {
    const geometry = new SphereGeometry(1, 32, 32);
    const material = new MeshBasicMaterial({ color: 0xEB763C }); // yellow color
    const sun = new Mesh(geometry, material);

    sun.position.set(3, 8, 5);
    sun.castShadow = true;
    sun.receiveShadow = true;

    const light = new PointLight(0xFFA500, 10, 10); // orange color
    light.position.set(3, 8, 5); // position the light slightly in front of the sun

    // Put texture on the sun
    const texture = new TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/9/99/Map_of_the_full_sun.jpg');
    sun.material.map = texture;

    this.add(light);
    return sun;
  }

  createZeppelin() {
    const zeppelin = new Group();

    const zeppelinBodyGeometry = new CylinderGeometry(1, 1, 6, 32);
    const zeppelinEndGeometry = new SphereGeometry(1, 32, 32);
    const zeppelinMaterial = new MeshPhongMaterial({ color: 0x0000FF }); // brown color
    const zeppelinBody = new Mesh(zeppelinBodyGeometry, new MeshPhongMaterial({ color: 0xFFA500 }));
    const zeppelinFrontEnd = new Mesh(zeppelinEndGeometry, zeppelinMaterial);
    const zeppelinBackEnd = new Mesh(zeppelinEndGeometry, zeppelinMaterial);
    const zeppelinMiddle = new Mesh(zeppelinEndGeometry, zeppelinMaterial);

    const zeppelinStringGeo = new CylinderGeometry(0.01, 0.01, 2, 32);
    const zeppelinStringMat = new MeshPhongMaterial({ color: 0xffffff }); // white color
    const zeppelinString = new Mesh(zeppelinStringGeo, zeppelinStringMat);
    const zeppelinString2 = new Mesh(zeppelinStringGeo, zeppelinStringMat);
    zeppelinString.position.z = 0.8;
    zeppelinString2.position.z = 3.2;
    zeppelinString.position.y = -1;
    zeppelinString2.position.y = -1;

    zeppelinBody.castShadow = true;
    zeppelinBody.receiveShadow = true;
    zeppelinFrontEnd.castShadow = true;
    zeppelinFrontEnd.receiveShadow = true;
    zeppelinBackEnd.castShadow = true;
    zeppelinBackEnd.receiveShadow = true;
    zeppelinMiddle.castShadow = true;
    zeppelinMiddle.receiveShadow = true;

    zeppelinBody.position.z = 3;
    zeppelinBody.rotation.x = Math.PI / 2;
    zeppelinBody.position.y = -2;
    zeppelinBody.scale.set(0.5, 0.5, 0.5);
    zeppelinBody.position.z = 2;

    zeppelinMiddle.position.z = 3.5;
    zeppelinFrontEnd.position.z = 2; // position the front end of the zeppelin
    zeppelinBackEnd.position.z = 0.5; // position the back end of the zeppelin

    zeppelin.add(zeppelinBody, zeppelinFrontEnd, zeppelinBackEnd, zeppelinMiddle, zeppelinString, zeppelinString2); // add all parts to the zeppelin group

    zeppelin.position.set(-3, 3, 10);
    zeppelin.rotation.y = Math.PI / 2;

    return zeppelin;
  }
}
