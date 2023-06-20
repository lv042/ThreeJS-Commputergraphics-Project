import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.minDistance = 20;
  controls.maxDistance = 30;

  // Remove default OrbitControls event listeners

  controls.update();

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  function onDocumentMouseMove( event ) {
    // Manually fire the event in OrbitControls
    controls.handleMouseMoveRotate(event);
  }

  return controls;
}
