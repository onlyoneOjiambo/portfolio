// Three.js Animations for Portfolio
let scene, camera, renderer, particles;

function initThreeJsBackground() {
  // Get the hero section
  const heroSection = document.getElementById('home');
  if (!heroSection) return;

  // Set up scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Camera setup
  const width = window.innerWidth;
  const height = window.innerHeight * 0.6; // Hero section height
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 30;

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Create a container for the canvas
  const canvasContainer = document.createElement('div');
  canvasContainer.id = 'three-canvas-container';
  canvasContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60vh;
    z-index: 1;
    pointer-events: none;
  `;
  canvasContainer.appendChild(renderer.domElement);
  
  // Insert before hero content
  const heroContent = document.querySelector('.hero');
  heroContent.parentElement.insertBefore(canvasContainer, heroContent);

  // Create animated particles
  createParticleCloud();
  
  // Create animated 3D elements
  create3DElements();

  // Handle window resize
  window.addEventListener('resize', onWindowResize);

  // Start animation loop
  animate();
}

function createParticleCloud() {
  // Particle geometry
  const particleCount = 150;
  const geometry = new THREE.BufferGeometry();
  
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  const scales = new Float32Array(particleCount);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    
    velocities[i * 3] = (Math.random() - 0.5) * 0.5;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    
    scales[i] = Math.random() * 0.5 + 0.2;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
  
  // Create material with custom shader
  const material = new THREE.PointsMaterial({
    color: 0xD4AF37,
    size: 0.5,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.6,
    fog: false
  });
  
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
}

function create3DElements() {
  // Create rotating cube with gold color
  const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
  const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0xD4AF37,
    emissive: 0x663300,
    shininess: 100,
    wireframe: false,
    transparent: true,
    opacity: 0.2
  });
  
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(-15, 10, 0);
  scene.add(cube);
  
  // Add animation data
  cube.userData.isAnimated = true;
  cube.userData.rotationSpeed = { x: 0.003, y: 0.005, z: 0.002 };

  // Create rotating dodecahedron
  const dodecaGeometry = new THREE.DodecahedronGeometry(3, 0);
  const dodecaMaterial = new THREE.MeshPhongMaterial({
    color: 0xD4AF37,
    emissive: 0x663300,
    shininess: 50,
    wireframe: false,
    transparent: true,
    opacity: 0.15
  });
  
  const dodeca = new THREE.Mesh(dodecaGeometry, dodecaMaterial);
  dodeca.position.set(15, -5, 0);
  scene.add(dodeca);
  
  dodeca.userData.isAnimated = true;
  dodeca.userData.rotationSpeed = { x: -0.002, y: -0.004, z: 0.003 };

  // Create rotating sphere with gold outline
  const sphereGeometry = new THREE.IcosahedronGeometry(4, 4);
  const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a1a1a,
    emissive: 0xD4AF37,
    emissiveIntensity: 0.3,
    wireframe: false,
    transparent: true,
    opacity: 0.8
  });
  
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(0, 0, 0);
  scene.add(sphere);
  
  sphere.userData.isAnimated = true;
  sphere.userData.rotationSpeed = { x: 0.001, y: 0.002, z: 0 };

  // Add lighting
  const light1 = new THREE.PointLight(0xD4AF37, 1, 100);
  light1.position.set(20, 20, 20);
  scene.add(light1);

  const light2 = new THREE.PointLight(0xD4AF37, 0.5, 80);
  light2.position.set(-20, -20, 20);
  scene.add(light2);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);
}

function updateParticles() {
  if (!particles) return;
  
  const positions = particles.geometry.attributes.position.array;
  const velocities = particles.geometry.attributes.velocity.array;
  
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] += velocities[i] * 0.1;
    positions[i + 1] += velocities[i + 1] * 0.1;
    positions[i + 2] += velocities[i + 2] * 0.1;
    
    // Wrap around
    if (Math.abs(positions[i]) > 50) velocities[i] *= -1;
    if (Math.abs(positions[i + 1]) > 50) velocities[i + 1] *= -1;
    if (Math.abs(positions[i + 2]) > 50) velocities[i + 2] *= -1;
  }
  
  particles.geometry.attributes.position.needsUpdate = true;
}

function animate() {
  requestAnimationFrame(animate);
  
  // Update particles
  updateParticles();
  
  // Animate 3D objects
  scene.children.forEach(child => {
    if (child.userData.isAnimated) {
      child.rotation.x += child.userData.rotationSpeed.x;
      child.rotation.y += child.userData.rotationSpeed.y;
      child.rotation.z += child.userData.rotationSpeed.z;
      
      // Subtle floating animation
      child.position.y += Math.sin(Date.now() * 0.0005) * 0.01;
    }
  });
  
  renderer.render(scene, camera);
}

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight * 0.6;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThreeJsBackground);
} else {
  initThreeJsBackground();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (renderer) {
    renderer.dispose();
  }
});
