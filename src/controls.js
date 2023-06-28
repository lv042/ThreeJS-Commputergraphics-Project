import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = false;
  controls.minDistance = 20;
  controls.maxDistance = 30;


  controls.update();

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  function onDocumentMouseMove( event ) {controls.handleMouseMoveRotate(event);
  }

  return controls;
}
