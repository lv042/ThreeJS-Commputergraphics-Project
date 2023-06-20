import { WebGLRenderer, PerspectiveCamera, Scene, Vector3, Fog, PCFSoftShadowMap } from 'three';
import SeedScene from './objects/Scene.js';
import { createControls } from './controls.js';

// Create the scene
const scene = new Scene();
scene.backgroundBlurriness = 0.5;
scene.fog = new Fog(0xcccccc, 25, 25); // Fog for the requirements

// Create the camera
const camera = new PerspectiveCamera();
camera.position.set(6, 3, -10);
camera.lookAt(new Vector3(0, 0, 0));

// Create the renderer
const renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = PCFSoftShadowMap;

// Create the SeedScene
const seedScene = new SeedScene();
scene.add(seedScene);

// Create the controls
const controls = createControls(camera, renderer);

// Render loop
const animate = (timeStamp) => {
  controls.update();
  renderer.render(scene, camera);
  if (seedScene.update) {
    seedScene.update(timeStamp);
  }
  requestAnimationFrame(animate);
};
animate();

// Resize handler
const resizeHandler = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
resizeHandler();
window.addEventListener('resize', resizeHandler);

// Set DOM styling and append renderer's DOM element
document.body.style.margin = '0';
document.body.appendChild(renderer.domElement);
