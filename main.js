import * as THREE from "./modules/three.module.js"
import { OrbitControls } from './modules/OrbitControls.js'
//Setup Scene
let scene = new THREE.Scene();
//Camera
let camera = new THREE.PerspectiveCamera(
    75, //FOV
    window.innerWidth/ window.innerHeight, //Aspect Ratio
    0.1, //near and far plane
    100
    );
camera.position.set(0,0,30)
camera.lookAt(0,0,0)
//Renderer
let renderer = new THREE.WebGLRenderer({antialias: true});
//set background colour to scene
renderer.setClearColor("#00FFFF");
//set renderer size
renderer.setSize(window.innerWidth, window.innerHeight);
//create a canvas element with the rendering settings above.
document.body.appendChild(renderer.domElement);
//when the screen is streched, update
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
//Lights
//colour, intensity, distance, decay.
let ambient = new THREE.AmbientLight(0xFFFFFF, 0.5)
let light = new THREE.PointLight(0xFFFFFF, 1.5, 500)
light.position.set(5,5,5);
scene.add(light, ambient);

//----------------------------------------------------------------------------

//Testing Cube
let knot = new THREE.TorusKnotGeometry(10,3,64,8,2,3);
//let cube = new THREE.BoxGeometry(1,1,1);
let material = new THREE.MeshNormalMaterial( {wireframe: true} );
let mesh1 = new THREE.Mesh(knot, material);
mesh1.position.set(0,0,0);
scene.add(mesh1);

//----------------------------------------------------------------------------

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

    mesh1.rotation.x += 0.001;
    mesh1.rotation.y += 0.001;
    mesh1.rotation.z += 0.001;

	renderer.render( scene, camera );
}

animate();