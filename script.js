(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const counter = document.getElementById('slideCounter');
  const sectionLabel = document.getElementById('sectionLabel');
  const progress = document.getElementById('progressBar');
  const navRail = document.getElementById('navRail');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const overview = document.getElementById('overview');
  const overviewGrid = document.getElementById('overviewGrid');
  const overviewBtn = document.getElementById('overviewBtn');
  const closeOverview = document.getElementById('closeOverview');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const keyHint = document.getElementById('keyHint');
  const mobile = () => matchMedia('(max-width: 820px)').matches;
  let index = Math.max(0, slides.findIndex(s => `#${s.id}` === location.hash));
  if (index < 0) index = 0;
  let wheelLock = false;
  let touchStartY = 0;

  slides.forEach((slide, i) => {
    const dot = document.createElement('button');
    dot.className = 'nav-dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}: ${slide.dataset.title}`);
    dot.title = slide.dataset.title;
    dot.addEventListener('click', () => go(i));
    navRail.appendChild(dot);

    const card = document.createElement('button');
    card.className = 'overview-item';
    card.innerHTML = `<span>${String(i + 1).padStart(2, '0')} · ${slide.dataset.section}</span><strong>${slide.dataset.title}</strong><b>${String(i + 1).padStart(2, '0')}</b>`;
    card.addEventListener('click', () => { closeOverviewMode(); go(i); });
    overviewGrid.appendChild(card);
  });

  const dots = [...navRail.children];
  const overviewItems = [...overviewGrid.children];

  function render() {
    if (!mobile()) {
      slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    }
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    overviewItems.forEach((d, i) => d.classList.toggle('is-active', i === index));
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    sectionLabel.textContent = slides[index].dataset.section;
    progress.style.width = `${((index + 1) / slides.length) * 100}%`;
    if (!mobile()) history.replaceState(null, '', `#${slides[index].id}`);
    prevBtn.style.opacity = index === 0 ? '.25' : '1';
    nextBtn.style.opacity = index === slides.length - 1 ? '.25' : '1';
  }

  function go(n) {
    index = Math.max(0, Math.min(slides.length - 1, n));
    if (mobile()) slides[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    render();
  }
  const next = () => go(index + 1);
  const prev = () => go(index - 1);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  function openOverviewMode() {
    overview.classList.add('is-open');
    overview.setAttribute('aria-hidden', 'false');
    overviewItems[index]?.focus();
  }
  function closeOverviewMode() {
    overview.classList.remove('is-open');
    overview.setAttribute('aria-hidden', 'true');
  }
  overviewBtn.addEventListener('click', () => overview.classList.contains('is-open') ? closeOverviewMode() : openOverviewMode());
  closeOverview.addEventListener('click', closeOverviewMode);
  overview.addEventListener('click', e => { if (e.target === overview) closeOverviewMode(); });

  fullscreenBtn.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch (_) {}
  });

  document.addEventListener('keydown', e => {
    if (mobile()) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    if (e.key === 'Home') { e.preventDefault(); go(0); }
    if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); }
    if (e.key.toLowerCase() === 'o') overview.classList.contains('is-open') ? closeOverviewMode() : openOverviewMode();
    if (e.key === 'Escape' && overview.classList.contains('is-open')) closeOverviewMode();
    if (e.key.toLowerCase() === 'f') fullscreenBtn.click();
  });

  window.addEventListener('wheel', e => {
    if (mobile() || overview.classList.contains('is-open') || wheelLock || Math.abs(e.deltaY) < 18) return;
    wheelLock = true;
    e.deltaY > 0 ? next() : prev();
    setTimeout(() => wheelLock = false, 700);
  }, { passive: true });

  window.addEventListener('touchstart', e => { if (!mobile()) touchStartY = e.changedTouches[0].clientY; }, { passive: true });
  window.addEventListener('touchend', e => {
    if (mobile()) return;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dy) > 60) dy < 0 ? next() : prev();
  }, { passive: true });

  let hintTimer = setTimeout(() => keyHint.style.opacity = '0', 6000);
  window.addEventListener('pointermove', () => {
    keyHint.style.opacity = '1'; clearTimeout(hintTimer); hintTimer = setTimeout(() => keyHint.style.opacity = '0', 3000);
  }, { passive: true });

  // Hero canvas: lightweight evidence graph. Disabled automatically for reduced motion/mobile.
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas?.getContext('2d');
  let particles = [], raf = 0;
  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const count = Math.min(56, Math.max(24, Math.floor(innerWidth / 28)));
    particles = Array.from({length: count}, () => ({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12,r:Math.random()*1.5+.4}));
  }
  function drawCanvas() {
    if (!ctx || mobile() || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for (let i=0;i<particles.length;i++) {
      const p=particles[i]; p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(169,142,230,.35)';ctx.fill();
      for(let j=i+1;j<particles.length;j++){
        const q=particles[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);
        if(d<135){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(127,86,217,${.10*(1-d/135)})`;ctx.stroke();}
      }
    }
    raf=requestAnimationFrame(drawCanvas);
  }
  if (canvas) { resizeCanvas(); drawCanvas(); window.addEventListener('resize', () => { cancelAnimationFrame(raf); resizeCanvas(); drawCanvas(); }); }

  if (mobile()) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if (visible) { index = slides.indexOf(visible.target); render(); }
    }, { threshold: [0.35,0.55,0.75] });
    slides.forEach(s => observer.observe(s));
  }
  render();
})();
