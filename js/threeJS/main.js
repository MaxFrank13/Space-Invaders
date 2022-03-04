import * as THREE from 'three';
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const introCanvas = document.querySelector('.intro');

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(5);
camera.position.setY(3);
camera.position.setX(3);


document.body.appendChild( renderer.domElement );

renderer.setAnimationLoop(introAnimate);

const controls = new OrbitControls( camera, renderer.domElement );

// Lighting

const lightAmb = new THREE.AmbientLight( 0x0f0f0f ); 

const lightDir = new THREE.DirectionalLight( 0xf6f6f6 ); 
lightDir.position.set(10.91, 10.33, 10.74);
const dirLightHelper = new THREE.DirectionalLightHelper( lightDir, 1 );

const lightPoint = new THREE.DirectionalLight( 0xf0f000, 1); 
lightPoint.position.set(-55, 20, 10);
const pointLightHelper = new THREE.PointLightHelper( lightPoint, 10 );

scene.add(lightAmb);
scene.add(lightDir);
scene.add(lightPoint);
// scene.add(dirLightHelper);
// scene.add(pointLightHelper);

const geometrySphere = new THREE.SphereGeometry( 15, 64, 32 );
const materialSphere = new THREE.MeshPhongMaterial( { color: 0xffff00 });
const sphere = new THREE.Mesh( geometrySphere, materialSphere );

// scene.add(sphere);


// Debug
const gui = new dat.GUI();

// GLTF Loader
const gtlfLoader = new GLTFLoader();

// load GameBoy
gtlfLoader.load('/static/gameboy3D.gltf', (gltf) => {
    console.log(gltf.scene)
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.rotation.set(0, 0, 0);
    gltf.scene.position.set(1, -1.5, 1);
    scene.add(gltf.scene);


    gui.add(gltf.scene.rotation, 'x').min(0).max(9)
    gui.add(gltf.scene.rotation, 'y').min(0).max(9)
    gui.add(gltf.scene.rotation, 'z').min(0).max(9)
})
// create animation that pans camera around gameboy while user is choosing to play or not

// zoom in on screen when user clicks start button (either the one on gameboy or html button)

// remove 'display: none' from 'game-container' and start game

function introAnimate() {
    renderer.render(scene, camera);
    controls.update();
}