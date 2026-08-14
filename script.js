  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  burger.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.cssText += open ? '' : 'position:fixed;top:66px;left:0;right:0;background:#0B1B33;flex-direction:column;padding:24px 32px;gap:18px;border-bottom:1px solid #2A4468;';
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
