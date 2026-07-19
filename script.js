/* ================================================================
   SHOWREEL VİDEOSU EKLEMEK İÇİN:
   Aşağıdaki satıra YouTube veya Vimeo "embed" linkini yapıştırın.
   Örnek YouTube: https://www.youtube.com/embed/VIDEO_ID
   Örnek Vimeo:   https://player.vimeo.com/video/VIDEO_ID
   Boş bırakılırsa modalda bilgilendirme mesajı gösterilir.
================================================================= */
const SHOWREEL_EMBED_URL = "";

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Recording timecode (TC) counter ---------- */
  const tcEl = document.getElementById('tcCounter');
  if (tcEl) {
    let frames = 0;
    const fps = 24;
    setInterval(() => {
      frames++;
      const totalSeconds = Math.floor(frames / fps);
      const f = frames % fps;
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      const pad = n => String(n).padStart(2, '0');
      tcEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
    }, 1000 / fps);
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  document.querySelectorAll('.hero-title .reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.12}s`;
  });

  /* ---------- Animated stat counters ---------- */
  const statNums = document.querySelectorAll('.stat-num');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));

  /* ---------- Header background on scroll ---------- */
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(10,10,10,0.85)';
      header.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
    } else {
      header.style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.85), transparent)';
      header.style.borderBottom = 'none';
    }
  });

  /* ---------- Modal helpers ---------- */
  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('is-open');
  }
  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('is-open');
  }
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('is-open');
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.is-open').forEach(m => m.classList.remove('is-open'));
    }
  });

  /* ---------- Showreel video modal ---------- */
  const playBtn = document.getElementById('playBtn');
  const videoWrap = document.getElementById('videoWrap');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (SHOWREEL_EMBED_URL && videoWrap) {
        videoWrap.innerHTML = `<iframe src="${SHOWREEL_EMBED_URL}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      }
      openModal('videoModal');
    });
  }

  /* ---------- Project detail form modal ---------- */
  const projectFormBtn = document.getElementById('projectFormBtn');
  const btnStartProject = document.getElementById('btnStartProject');
  [projectFormBtn, btnStartProject].forEach(btn => {
    if (btn) btn.addEventListener('click', () => openModal('formModal'));
  });

  const projectForm = document.getElementById('projectForm');
  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(projectForm);
      const subject = encodeURIComponent(`Yeni Proje Talebi — ${data.get('name')}`);
      const body = encodeURIComponent(
        `Ad Soyad: ${data.get('name')}\n` +
        `E-posta: ${data.get('email')}\n` +
        `Telefon: ${data.get('phone') || '-'}\n` +
        `Proje Türü: ${data.get('type')}\n\n` +
        `Detaylar:\n${data.get('details') || '-'}`
      );
      window.location.href = `mailto:mimsinanb@gmail.com?subject=${subject}&body=${body}`;
      closeModal('formModal');
      projectForm.reset();
    });
  }

  /* ---------- Tüm projeleri gör (placeholder, no jump) ---------- */
  const allProjectsBtn = document.getElementById('allProjectsBtn');
  if (allProjectsBtn) {
    allProjectsBtn.addEventListener('click', () => {
      alert('Tüm projeler sayfası yakında eklenecek.');
    });
  }

});
