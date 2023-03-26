import * as THREE from "three"
import './style.css'
//Scene 
const scene = new THREE.Scene()

// Create our sphere
// Arguments: Radius, widthSegment & heightSegment 
const geometry = new THREE.SphereGeometry(3, 64, 64)

// Material is
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',

})

// Meshes our geometry & material. 
const mesh = new THREE.Mesh(geometry, material)

// Anything we create needs to be added to the scene
scene.add(mesh)

// Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Set up Light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0,10,10)
scene.add(light)

// Camera
// Arguments: Field of View(How much can this camera see), aspect ratio, 
// Last two args: min-distance & max-distance away from camera. if mesh is past max-distance or min-distance from camera, it will not be visible.
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })

// Set size of our canvas
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


// Resizing: Handles responsive design
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()