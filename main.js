import * as THREE from "./node_modules/three/build/three.cjs"
import { ARButton } from '/three/examples/jsm/webxr/ARButton';
import { GLTFLoader } from '/three/examples/jsm/loaders/GLTFLoader.js';



//Three items required, we need to scene, camera, renderer
let scene, camera, renderer, objMesh;
let loader;


init();
animate();

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();
    //Adding camera to the scene
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);
    //Creating renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement)
    //Adding lighting to the scene
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light)

    //Adding model to the scene
    //const modelRef = './resources/3d/sample_material_a02/cene.gltf';
    //Loader - GLTF loader object
   // loader = new THREE.GLTFLoader();
  //  console.log(loader);

    const modelUrl = 'https://raw.githubusercontent.com/immersive-web/webxr-samples/main/media/gltf/space/space.gltf';

    loader = new THREE.GLTFLoader();
    //Adding objects to the scene
    const geometry = new THREE.IcosahedronGeometry(0.1, 1)
    const material = new THREE.MeshPhongMaterial(
        {
            color: new THREE.Color("rgb(226,35,213)"),
            shininess: 6,
            flatShading: true,
            transparent: 1,
            opacity: 0.8
        }
    );

    objMesh = new THREE.Mesh(geometry, material)
    objMesh.position.set(0, 0, -0.5)
    scene.add(objMesh) //Default Postion is 0,0,0
    //Adding AR button to the application to start the AR experience       
    const button = ARButton.createButton(renderer);
    document.body.appendChild(button);

}

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    objectRotate();
    renderer.render(scene, camera);
}

function objectRotate()
{
    objMesh.rotation.x = objMesh.rotation.x - 0.01;
}



