import { io } from "socket.io-client"
import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "./GLTFLoader.js";

const monkeyUrl = new URL('modelos/leon.glb', import.meta.url);
const monkeyUrl1 = new URL('modelos/robot.glb', import.meta.url);
const monkeyUrl2 = new URL('modelos/meg.glb', import.meta.url);
const monkeyUrl3 = new URL('modelos/piper.glb', import.meta.url);

const scene = new THREE.Scene();
scene.background = new THREE.Color("#585858");

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight
);
camera.position.set(0, 0, 10);

let mixer;
let mixer2;
let mixer3;
let mixer4;

// clips.forEach(function (clip) {
//     const action = mixer.clipAction(clip);
//     action.play();
//   });

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
scene.add(hemisphereLight);

const cube1Geometry = new THREE.BoxGeometry(1, 1, 1);
const cube1Material = new THREE.MeshPhongMaterial({ color: "aqua" });
const cube1 = new THREE.Mesh(cube1Geometry, cube1Material);
cube1.position.set(3, 0, 0);
scene.add(cube1);

const cube1BB = new THREE.Box3();
cube1BB.setFromObject(cube1);

const cube2Geometry = new THREE.BoxGeometry(1, 1, 1);
const cube2Material = new THREE.MeshPhongMaterial({ color: "coral" });
const cube2 = new THREE.Mesh(cube2Geometry, cube2Material);
cube2.position.set(-3, 0, 0);
scene.add(cube2);

const cube2BB = new THREE.Box3();
cube2BB.setFromObject(cube2);
console.log(cube2BB);

const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: "teal" });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 0, 0);
scene.add(sphere);

const sphereBB = new THREE.Sphere(sphere.position, 1);

// const box = new THREE.BoxHelper(sphere, 0xffff00);
// scene.add(box);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const cameraControl = new OrbitControls(camera, renderer.domElement);

document.onkeydown = function (e) {
  // console.log(e);
  // ArrowLeft
  if (e.keyCode == 37) {
    cube2.position.x = cube2.position.x - 1;
  }
  // ArrowRight
  if (e.keyCode == 39) {
    cube2.position.x = cube2.position.x + 1;
  }
  // ArrowUp
  if (e.keyCode == 38) {
    cube2.position.z = cube2.position.z + 1;
  }
  // ArrowUp
  if (e.keyCode == 40) {
    cube2.position.z = cube2.position.z - 1;
  }
};

function checkCollitions() {
  if (cube2BB.containsBox(cube1BB)) {
    cube1.scale.y = 3;
  } else {
    cube1.scale.y = 1;
  }

  if (cube2BB.intersectsBox(cube1BB)) {
    cube1.material.color = new THREE.Color("red");
  } else {
    cube1.material.color = new THREE.Color("aqua");
  }

  if (cube2BB.intersectsSphere(sphereBB)) {
    sphere.material.wireframe = true;
  } else {
    sphere.material.wireframe = false;
  }
}

const clock = new THREE.Clock();
const clock2 = new THREE.Clock();
const clock3 = new THREE.Clock();
const clock4 = new THREE.Clock();

function animate() {
  cube2BB
    .copy(cube2.geometry.boundingBox)
    .applyMatrix4(cube2.matrixWorld);
  requestAnimationFrame(animate);

  checkCollitions();

  if (mixer)
    mixer.update(clock.getDelta());

    if (mixer2)
    mixer2.update(clock2.getDelta());

    if (mixer3)
    mixer3.update(clock3.getDelta());

    if (mixer4)
    mixer4.update(clock4.getDelta());

  renderer.render(scene, camera);
  
}

const assetLoader = new GLTFLoader();
//Carga modelo GLB
assetLoader.load(monkeyUrl.href, function(gltf) {
const model = gltf.scene;
model.scale.set(0.3, 0.3, 0.3);
model.position.set(5, 0.6, 3);
scene.add(model);

model.position.x = model.position.x - 1;
    mixer = new THREE.AnimationMixer(model);
  const clips = gltf.animations;

  clips.forEach(function (clip) {
    const action = mixer.clipAction(clip);
    action.play();
  });

document.onkeydown = function (e) {
// ArrowLeft
if (e.keyCode == 37) {
  model.position.x = model.position.x - 1;
  }

  // ArrowRight
  if (e.keyCode == 39) {
    model.position.x = model.position.x + 1;
  }

  // ArrowUp
  if (e.keyCode == 38) {
    model.position.z = model.position.z + 1;
  }

  // ArrowUp
  if (e.keyCode == 40) {
    model.position.z = model.position.z - 1;
  }

   socket.emit('p1-enviar-x', model.position.x);
   socket.on('p1-actualizar-x', x =>{

    model.position.x = x;
//   console.log(model.position.x);

   })
  socket.emit('p1-enviar-z', model.position.z);
  socket.on('p1-actualizar-z', z =>{

    model.position.z = z;
//   console.log(model.position.z);

   })

}});

assetLoader.load(monkeyUrl1.href, function(gltf) {
const model = gltf.scene;
model.scale.set(0.3, 0.3, 0.3);
model.position.set(1, 0.6, 3);
scene.add(model);

model.position.x = model.position.x - 1;
    mixer2 = new THREE.AnimationMixer(model);
  const clips = gltf.animations;

  clips.forEach(function (clip) {
    const action = mixer2.clipAction(clip);
    action.play();
  });
});

  assetLoader.load(monkeyUrl2.href, function(gltf) {
const model = gltf.scene;
model.scale.set(0.3, 0.3, 0.3);
model.position.set(-10, 0.6, 3);
scene.add(model);

model.position.x = model.position.x - 1;
    mixer3 = new THREE.AnimationMixer(model);
  const clips = gltf.animations;

  clips.forEach(function (clip) {
    const action = mixer3.clipAction(clip);
    action.play();
  });
});

  assetLoader.load(monkeyUrl3.href, function(gltf) {
const model = gltf.scene;
model.scale.set(0.3, 0.3, 0.3);
model.position.set(-15, 0.6, 3);
scene.add(model);

model.position.x = model.position.x - 1;
    mixer4 = new THREE.AnimationMixer(model);
  const clips = gltf.animations;

  clips.forEach(function (clip) {
    const action = mixer4.clipAction(clip);
    action.play();
  });


});


// const loaderGLTF = new GLTFLoader();
// loaderGLTF.load(
//   "modelos/prueba.glb",
//   function (modelGLTF) {
//     const model = modelGLTF.scene;
//     model.scale.set(1.0, 1.0, 1.0);
//     model.position.set(1, 0.6, 3)
//     scene.add(model);
//     mixer = new THREE.AnimationMixer(model);
//     const clips = gltf.animations;
//   });

const loaderGLTF = new GLTFLoader();
loaderGLTF.load(
"modelos/niveles/nivel1.glb",
function (modelGLTF) {
  const buzz = modelGLTF.scene;
  buzz.scale.set(2.0, 2.0, 2.0);
  buzz.position.set(1, -3, 3);
  scene.add(buzz);
});

//   const loaderGLTF1 = new GLTFLoader();
//     loaderGLTF1.load(
//       "modelos/ghost_squeak.glb",
//       function (modelGLTF) {
//         const buzz = modelGLTF.scene;
//         buzz.scale.set(1.0, 1.0, 1.0);
//         buzz.position.set(10, 0.6, 3)
//         scene.add(buzz);
//       });

// const loaderGLTF2 = new GLTFLoader();
//   loaderGLTF2.load(
//     "modelos/buzz.glb",
//     function (modelGLTF) {
//       const buzz = modelGLTF.scene;
//       buzz.scale.set(20.0, 20.0, 20.0);
//       buzz.position.set(1.5, 0.6, 3)
//       scene.add(buzz);
//     });

//   const loaderGLTF3 = new GLTFLoader();
//   loaderGLTF3.load(
//     "modelos/buzz.glb",
//     function (modelGLTF) {
//       const buzz = modelGLTF.scene;
//       buzz.scale.set(20.0, 20.0, 20.0);
//       buzz.position.set(1.5, 0.6, 3)
//       scene.add(buzz);
//     });

//   const loaderGLTF4 = new GLTFLoader();
//   loaderGLTF4.load(
//     "modelos/buzz.glb",
//     function (modelGLTF) {
//       const buzz = modelGLTF.scene;
//       buzz.scale.set(20.0, 20.0, 20.0);
//       buzz.position.set(1.5, 0.6, 3)
//       scene.add(buzz);
//     });

animate();
const form = document.getElementById("form");
const messageInput = document.getElementById("msg")

form.addEventListener("submit", e => {
    e.preventDefault();
    const message = messageInput.value
    if (message === "") return
    displayMessage(message);
    
})

function displayMessage(message){
const div = document.createElement("div");
div.textContent = message;
document.getElementById("container").append(div);


}


const socket = io("http://localhost:3000")
socket.on("connect", () => {
    // displayMessage(socket.id);
    
    
    // eventos

  });

socket.on('enviar-cliente', datos =>{
    displayMessage(datos);

})

