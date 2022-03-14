import * as THREE from "three";
import * as dat from "dat.gui";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

console.log(gsap);

window.addEventListener("DOMContentLoaded", () => {
  const introCanvas = document.querySelector(".intro");

  // Debug
  // const gui = new dat.GUI();

  // **** Setup ****

  // Scene Camera & Renderer
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 5);
  camera.rotation.set(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas: introCanvas,
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0x707064, 1);

  renderer.setAnimationLoop(introAnimate);

  // Orbit Controls

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.maxDistance = 15;
  controls.minDistance = 3;
  controls.minAzimuthAngle = 0;
  controls.maxAzimuthAngle = 1.3;
  controls.minPolarAngle = 0.3;
  controls.maxPolarAngle = 2;
  controls.target.set(0, 0, 0);

  // Raycaster

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("click", () => {
    if (intersects.length === 1) {
        startListen = true;
    } else {
        startListen = false;
    }
  });

  // Lighting

  // ambient
  const lightAmb = new THREE.AmbientLight(0xc2bdb0);

  // sky light
  const lightDir = new THREE.DirectionalLight(0xffffff, 0.8);
  lightDir.position.set(15.91, 52.33, 8.74);
  const dirLightHelper = new THREE.DirectionalLightHelper(lightDir, 1);

  // lamp light
  const lightPoint = new THREE.PointLight(0xc2bdb0, 0.6);
  lightPoint.position.set(-2, 8, 10);
  const pointLightHelper = new THREE.PointLightHelper(lightPoint, 10);

  scene.add(lightAmb);
  scene.add(lightDir);
  scene.add(lightPoint);
  // scene.add(dirLightHelper);
  // scene.add(pointLightHelper);

  // **** Scene Objects ****

  // GLTF Loader
  let gameboy;
  const gtlfLoader = new GLTFLoader();

  // load GameBoy
  function objectLoad() {
    gtlfLoader.load("/static/gameboy3D.gltf", (gltf) => {
      gltf.scene.scale.set(1, 1, 1);
      gltf.scene.rotation.set(0, 0.5, 0);
      gltf.scene.position.set(-0.5, -2.3, -0.2);
      gameboy = gltf.scene;
      scene.add(gltf.scene);

      // const gbFolder = gui.addFolder("Gameboy");
      // gbFolder.add(gameboy.rotation, 'x').min(-9).max(9).name('rotation x');
      // gbFolder.add(gameboy.rotation, 'y').min(-9).max(9).name('rotation y');
      // gbFolder.add(gameboy.rotation, 'z').min(-9).max(9).name('rotation z');
    });
  }
  objectLoad();

  // Button Listener

  const geometryBox = new THREE.BoxGeometry(0.42, 0.3, 1);
  const materialBox = new THREE.MeshPhongMaterial({
    transparent: true,
    opacity: 0
  });
  const startBtnListener = new THREE.Mesh(geometryBox, materialBox);

  startBtnListener.position.set(-0.3, -1.5, -0.1);
  startBtnListener.rotation.set(6.1, 0.5, 0.6);

  // const buttonFolder = gui.addFolder('Button Hitbox')
  // buttonFolder.add(startBtnListener.scale, 'x').min(-3).max(3).step(0.1).name('width');
  // buttonFolder.add(startBtnListener.scale, 'y').min(-3).max(3).step(0.1).name('height');
  // buttonFolder.add(startBtnListener.position, 'x').min(-3).max(3).step(0.1);
  // buttonFolder.add(startBtnListener.position, 'y').min(-3).max(3).step(0.1);
  // buttonFolder.add(startBtnListener.position, 'z').min(-3).max(3).step(0.1);

  scene.add(startBtnListener);

  // zoom in on screen when user clicks start button (either the one on gameboy or html button)

  // remove 'display: none' from 'game-container' and start game

  // **** Utility Functions ****

  function onPointerMove(event) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  let animationComplete = false;
  let startListen = false;
  let intersects;

  function startBtnHandle() {
    startListen ? (startListen = false) : (startListen = true);
  }

  function init3D() {
    camera.position.set(0.05, 0.81, 5);
    // controls.target.set(0, 1, 1);
    // controls.update();
    if (gameboy.rotation.y > -0.07) gameboy.rotation.y -= 0.01;
    gameboy.position.x += 0.005;
    gameboy.position.y -= 0.001;
    gameboy.position.z += 0.05;
    animationComplete = true;
    setTimeout(() => {
      renderer.setAnimationLoop(null);
      introCanvas.classList.add("hide");
    }, 1500);
  }

  console.log(scene.children);

  function introAnimate() {
    raycaster.setFromCamera(pointer, camera);
    controls.update();
    intersects = raycaster.intersectObject(startBtnListener);
    if (startListen) init3D();
    // if (animationComplete) renderer.setAnimationLoop(null);
    renderer.render(scene, camera);
  }
});
