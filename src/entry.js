import {WebGLRenderer, PerspectiveCamera, Scene, Vector3, MOUSE, Fog, PCFSoftShadowMap} from 'three';
import SeedScene from './objects/Scene.js';
import { createControls } from './controls.js';

const scene = new Scene();
scene.backgroundBlurriness = 0.5;
scene.fog = new Fog( 0xcccccc, 25, 25 );

const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = false;
const seedScene = new SeedScene();

// scene
scene.add(seedScene);

// camera
camera.position.set(6,3,-10);
camera.lookAt(new Vector3(0,0,0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);
renderer.shadowMap.type = PCFSoftShadowMap;


// controls
const controls = createControls(camera, renderer);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  controls.update(); // required if controls.enableDamping or controls.autoRotate are set to true
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );
