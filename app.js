/* ═══════════════════════════════════════════════════════════
   NATURAL HONEY — Premium Web App Logic & 3D Animations
   Includes Three.js 3D Golden Honey Particles, GSAP ScrollTrigger,
   Interactive Reviews Carousel, Smooth Counters & Cursor
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. PRELOADER & COUNTER ANIMATION ───────────────── */
  const preloader = document.getElementById('preloader');
  const loadingBar = document.querySelector('.loading-bar');
  const prePercent = document.getElementById('prePercent');
  let progress = 0;

  const progressInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress > 100) progress = 100;
    if (loadingBar) loadingBar.style.width = progress + '%';
    if (prePercent) prePercent.textContent = progress + '%';

    if (progress === 100) {
      clearInterval(progressInterval);
      setTimeout(() => {
        if (preloader) preloader.classList.add('fade-out');
        initGSAPAnimations();
      }, 400);
    }
  }, 100);

  /* ── 2. CUSTOM CURSOR TRACKER ───────────────────────── */
  const cursorDot = document.getElementById('cursorDot');
  const cursorCircle = document.getElementById('cursorCircle');

  if (cursorDot && cursorCircle && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';

      cursorCircle.animate({
        left: e.clientX + 'px',
        top: e.clientY + 'px'
      }, { duration: 500, fill: 'forwards' });
    });
  }

  /* ── 3. NAVBAR SCROLL EFFECT & MOBILE MENU ──────────── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
  });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 4. THREE.JS 3D GOLDEN HONEY PARTICLES ──────────── */
  function initThreeHero() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Geometry
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      scales[i] = Math.random() * 0.8 + 0.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Golden Amber Material
    const material = new THREE.PointsMaterial({
      color: 0xF5A623,
      size: 0.8,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xD4890A, 2, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Mouse movement response
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    });

    // Animation Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      let elapsedTime = clock.getElapsedTime();

      particles.rotation.y = elapsedTime * 0.05 + mouseX;
      particles.rotation.x = elapsedTime * 0.03 + mouseY;

      const pos = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.02;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* ── 5. THREE.JS 3D HONEYCOMB BG ─────────────────────── */
  function initThreeHoneycomb() {
    const canvas = document.getElementById('honeyCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Hexagonal geometry
    const hexGroup = new THREE.Group();
    const radius = 1.2;

    for (let r = -4; r <= 4; r++) {
      for (let c = -6; c <= 6; c++) {
        const x = c * radius * 1.75;
        const y = r * radius * 1.5 + (c % 2) * radius * 0.75;

        const hexGeo = new THREE.CylinderGeometry(radius, radius, 0.3, 6);
        const hexMat = new THREE.MeshStandardMaterial({
          color: 0xD4890A,
          roughness: 0.3,
          metalness: 0.2,
          transparent: true,
          opacity: 0.4
        });

        const mesh = new THREE.Mesh(hexGeo, hexMat);
        mesh.position.set(x, y, 0);
        mesh.rotation.x = Math.PI / 2;
        hexGroup.add(mesh);
      }
    }

    scene.add(hexGroup);

    const dirLight = new THREE.DirectionalLight(0xffd166, 1.5);
    dirLight.position.set(5, 5, 10);
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    function animateHex() {
      requestAnimationFrame(animateHex);
      hexGroup.rotation.z += 0.001;
      hexGroup.rotation.y = Math.sin(Date.now() * 0.0005) * 0.15;
      renderer.render(scene, camera);
    }
    animateHex();
  }

  initThreeHero();
  initThreeHoneycomb();

  /* ── 6. GSAP & SCROLLTRIGGER ANIMATIONS ─────────────── */
  function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero entrance timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    heroTl
      .from('#heroBadge', { y: -30, opacity: 0 })
      .from('.line1', { y: 40, opacity: 0 }, '-=0.6')
      .from('.line2', { y: 40, opacity: 0 }, '-=0.7')
      .from('.line3-hindi', { scale: 0.8, opacity: 0 }, '-=0.5')
      .from('#heroSubtitle', { y: 30, opacity: 0 }, '-=0.6')
      .from('#heroActions', { y: 30, opacity: 0 }, '-=0.6')
      .from('#heroStats', { y: 30, opacity: 0 }, '-=0.6')
      .from('#heroImageWrap', { scale: 0.85, opacity: 0, duration: 1.2 }, '-=1');

    // Scroll reveal elements
    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el) => {
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      } else {
        // Fallback with IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        }, { threshold: 0.1 });
        observer.observe(el);
      }
    });

    // Counter Up Animation
    const counters = document.querySelectorAll('.count-up');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(counter, {
              innerText: target,
              duration: 2,
              snap: { innerText: 1 },
              ease: 'power1.out'
            });
          }
        });
      }
    });
  }

  /* ── 7. REVIEWS CAROUSEL ────────────────────────────── */
  const reviewsTrack = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  const cards = document.querySelectorAll('.review-card');

  if (reviewsTrack && cards.length > 0) {
    let currentIndex = 0;
    const cardWidth = 380 + 24; // width + gap
    const maxIndex = cards.length - 1;

    // Create dots
    cards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      if (dotsContainer) dotsContainer.appendChild(dot);
    });

    function updateCarousel() {
      reviewsTrack.style.transform = 	ranslateX(-px);
      const dots = document.querySelectorAll('.dot');
      dots.forEach((d, idx) => {
        d.classList.toggle('active', idx === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      updateCarousel();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
      });
    }

    // Auto-advance every 5 seconds
    setInterval(() => {
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    }, 5000);
  }

  /* ── 8. VANILLA TILT INITS ───────────────────────────── */
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 10,
      speed: 400,
      glare: true,
      'max-glare': 0.25
    });
  }

});
