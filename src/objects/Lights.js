import { Group, SpotLight, AmbientLight } from 'three';

export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const ambientLight = new AmbientLight(0xffffff, 0.9);
    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(3, 10, 3);
    spotLight.angle = Math.PI / 40;
    spotLight.castShadow = true;
    spotLight.penumbra = 0.1;
    spotLight.intensity = 2;
    spotLight.target.position.set(0, 0, 0);

    this.add(ambientLight, spotLight);
  }
}
