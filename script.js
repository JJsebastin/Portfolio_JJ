// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCustomCursor();
  initScrollEffects();
  initScrollReveal(); // Run this BEFORE Three.js to ensure content reveals even if 3D fails
  try {
    initThreeJS();
  } catch (e) {
    console.error("Three.js initialization failed:", e);
  }
});

// --- Loader ---
function initLoader() {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 600);
  }, 1000);
}

// --- Custom Cursor ---
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  const hoverTargets = document.querySelectorAll('.hover-target, a, button, .project-card, .about-image-wrapper');

  // Mobile check
  if(window.innerWidth <= 768) return;

  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows immediately
    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    // Outline follows with slight delay using requestAnimationFrame for smoothness
    outline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
  });

  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    target.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

// --- Scroll Effects (Navbar & Progress) ---
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    // Navbar Blur Effect
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

// --- Scroll Reveal ---
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(reveal => revealObserver.observe(reveal));
}

// --- Three.js Implementation ---
function initThreeJS() {
  const container = document.getElementById('canvas-container');
  if (!container) return;
  
  if (typeof THREE === 'undefined') {
    console.warn('Three.js failed to load. Skipping 3D background.');
    return;
  }

  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Group to hold our objects for rotation
  const group = new THREE.Group();
  scene.add(group);

  // 1. Wireframe Sphere (Cyber/Tech feel)
  const sphereGeometry = new THREE.IcosahedronGeometry(2, 2);
  // Using the requested accent color but darker/wireframe style
  const sphereMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x111111, 
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  group.add(sphere);

  // 2. Inner glowing core
  const coreGeometry = new THREE.IcosahedronGeometry(1, 1);
  const coreMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xFF5433, 
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  group.add(core);

  // 3. Floating Particles (Data nodes)
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 300;
  const posArray = new Float32Array(particlesCount * 3);

  for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xFF5433,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xFF5433, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Mouse Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.001;
    mouseY = (event.clientY - windowHalfY) * 0.001;
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth rotation
    group.rotation.y += 0.002;
    group.rotation.x += 0.001;
    core.rotation.y -= 0.003;
    core.rotation.z += 0.002;

    // Particle floating wave effect
    particlesMesh.rotation.y = elapsedTime * 0.05;

    // Mouse parallax effect
    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;

    group.rotation.y += 0.05 * (targetX - group.rotation.y);
    group.rotation.x += 0.05 * (targetY - group.rotation.x);
    
    // Subtle camera movement
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    if(!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}
