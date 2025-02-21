// Create the scene and set a white background
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Create the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 5);

// Get the existing canvas element
const canvas = document.getElementById("three-canvas");

// Create the renderer using the existing canvas
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add lights for a brighter scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

// Load the 3D Model using GLTFLoader
const loader = new THREE.GLTFLoader();
let model;
const modelURL =
  'https://Surajcuriousanimator.github.io/threejs-website/models/Material%20Tetrahedron.glb';

loader.load(
  modelURL,
  (gltf) => {
    model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0);
  },
  undefined,
  (error) => {
    console.error('Error loading model:', error);
  }
);

// Add OrbitControls for free rotation
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;   // Smoother controls
controls.dampingFactor = 0.1;
controls.rotateSpeed = 0.5;

// Handle window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
