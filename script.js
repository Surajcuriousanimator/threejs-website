import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/loaders/GLTFLoader.js';

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

// Create the renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("three-canvas") });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

// Load the 3D Model
const loader = new GLTFLoader();
let model;

// Update model path based on GitHub Pages
const modelURL = 'https://Surajcuriousanimator.github.io/threejs-website/models/Material%20Tetrahedron.glb';

loader.load(modelURL, (gltf) => {
    model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0);
}, undefined, (error) => {
    console.error('Error loading model:', error);
});

// Resize Handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Rotate Model with Mouse Drag
let isDragging = false;
let previousMouseX = 0;

document.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMouseX = event.clientX;
});

document.addEventListener('mousemove', (event) => {
    if (!isDragging || !model) return;

    let deltaX = event.clientX - previousMouseX;
    model.rotation.y += deltaX * 0.01;
    previousMouseX = event.clientX;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
