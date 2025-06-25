/* ========= app.js – versión única ========= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Referencias ---------- */
  const body = document.body;
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebarToggle');
  const navBtns = sidebar.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');

  /* ---------- Helpers ---------- */
  const activate = btn => {
    /* 1 · Botón activo */
    navBtns.forEach(b => b.classList.toggle('active', b === btn));

    /* 2 · Sección visible */
    const id = btn.dataset.target;
    sections.forEach(sec => sec.classList.toggle('active', sec.id === id));
  };

  const closeIfMobile = () => {
    if (window.innerWidth < 992) body.classList.remove('sidebar-open');
  };

  /* ---------- Navegación en sidebar ---------- */
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) { closeIfMobile(); return; }
      activate(btn);
      closeIfMobile();
    });
  });

  /* ---------- Enlaces con data-target (CTA) ---------- */
  document.querySelectorAll('a[data-target]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.dataset.target;
      const btn = [...navBtns].find(b => b.dataset.target === id);
      if (btn) btn.click();       // reutilizamos la misma lógica
    });
  });

  /* ---------- Botón hamburguesa ---------- */
  toggleBtn.addEventListener('click', () =>
    body.classList.toggle('sidebar-open')
  );

  /* ---------- Cerrar al clicar fuera / Esc ---------- */
  document.addEventListener('click', e => {
    if (body.classList.contains('sidebar-open') &&
      !sidebar.contains(e.target) &&
      !toggleBtn.contains(e.target)) {
      body.classList.remove('sidebar-open');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') body.classList.remove('sidebar-open');
  });

  /* ---------- Doodles decorativos ---------- */
  const layer = document.querySelector('.doodle-layer');
  if (layer) {
    const { width: W, height: H } = layer.getBoundingClientRect();
    const src = ['img/gatitohome.png', 'img/escorpionhome.png', 'img/calaverahome.png'];
    const NUM = 45, GAP = 30, placed = [];

    for (let i = 0; i < NUM; i++) {
      const img = document.createElement('img');
      const size = 60 + Math.random() * 60;
      img.src = src[Math.floor(Math.random() * src.length)];
      img.className = 'doodle';
      img.style.cssText = `
        width:${size}px;position:absolute;
        animation-delay:-${Math.random() * 18}s;
        animation-duration:${14 + Math.random() * 10}s`;
      /* posición sin colisiones básicas */
      let x, y, tries = 0;
      do {
        x = Math.random() * (W - size);
        y = Math.random() * (H - size);
      } while (
        placed.some(p => x < p.x + p.s + GAP && x + size + GAP > p.x &&
          y < p.y + p.s + GAP && y + size + GAP > p.y) &&
        ++tries < 100
      );
      placed.push({ x, y, s: size });
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      layer.appendChild(img);
    }
  }

  console.log('%c app.js cargado correctamente ✔', 'color:#0a0');
});







/* --- scroll al hacer click en la flecha About --- */
const aboutScrollBtn = document.getElementById('aboutScroll');

if (aboutScrollBtn) {
  aboutScrollBtn.addEventListener('click', () => {
    /* destino: panel de Skills; cambia el selector si prefieres otro */
    const target = document.querySelector('#about .skills-wrapper');

    /* fallback: si no existe, baja una altura de viewport */
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  });
}






/* ---------- Cambio de capítulo ---------- */
document.querySelectorAll('.chapter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) return;

    /* botones */
    document.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    /* paneles */
    const current = document.querySelector('.chapter-panel.active');
    const target = document.querySelector(`.chapter-panel[data-chapter="${btn.dataset.chapter}"]`);

    if (!target) return;

    /* animación salida */
    current.style.transition = 'opacity .3s ease, transform .3s ease';
    current.style.opacity = 0;
    current.style.transform = 'translateX(-40px)';
    current.classList.remove('active');

    /* anima entrada luego de reflujo */
    requestAnimationFrame(() => {
      target.classList.add('active');
      target.style.opacity = 0;
      target.style.transform = 'translateX(40px)';

      requestAnimationFrame(() => {
        target.style.transition = 'opacity .5s ease, transform .5s ease';
        target.style.opacity = 1;
        target.style.transform = 'translateX(0)';
      });
    });
  });
});



/* --- Abrir la sección indicada en la URL (#portfolio, #services, …) --- */
const initialHash = window.location.hash.replace('#', '');   // «portfolio», «about», etc.

if (initialHash) {
  // localiza el botón lateral que controla esa sección
  const btn = [...document.querySelectorAll('.nav-btn')]
    .find(b => b.dataset.target === initialHash);

  if (btn) {
    btn.click(); // reutiliza TODA tu lógica existente (clase active, animación, sidebar close…)
  }
}

/* ─── Abrir sección según #hash externo ─────────────────────────── */
const openHashSection = () => {
  const hash = window.location.hash.slice(1);      // 'portfolio', 'services', …
  if (!hash) return;

  // Busca botón lateral con data-target = hash
  const btn = document.querySelector(`.nav-btn[data-target="${hash}"]`);
  if (btn) {
    btn.click();               // dispara TODA tu lógica existente
  }
};

/* – Primera llamada al cargar – */
setTimeout(openHashSection, 0); // espera al próximo tick

/* – Por si el usuario cambia de hash manualmente – */
window.addEventListener('hashchange', openHashSection);

