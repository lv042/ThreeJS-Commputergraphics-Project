import { Group, SpotLight, AmbientLight } from 'three';

export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const ambientLight = new AmbientLight(0xffffff, 0.9);
    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 5, 0);
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    spotLight.shadow.bias = 0.0001;
    spotLight.penumbra = 0.5;
    spotLight.intensity = 5;


    this.add(ambientLight, spotLight);
  }
}
