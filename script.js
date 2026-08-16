  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });
  
  // Close mobile menu when a nav link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', false);
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('mobile-open')) {
      navLinks.classList.remove('mobile-open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', false);
    }
  });

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // ---------- hero carousel ----------
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.hero-arrow-prev');
  const nextBtn = document.querySelector('.hero-arrow-next');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (slides.length && prevBtn && nextBtn) {
    let current = 0;
    let timer = null;

    const showSlide = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    };

    const next = () => showSlide(current + 1);
    const prev = () => showSlide(current - 1);

    const startAutoplay = () => {
      if (reduceMotion) return;
      clearInterval(timer);
      timer = setInterval(next, 6000);
    };

    nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
    prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });

    startAutoplay();
  }
