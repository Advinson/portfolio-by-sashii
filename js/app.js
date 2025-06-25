/* ========= app.js – versión única ========= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Referencias ---------- */
  const body      = document.body;
  const sidebar   = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebarToggle');
  const navBtns   = sidebar.querySelectorAll('.nav-btn');
  const sections  = document.querySelectorAll('.content-section');

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
      const id  = link.dataset.target;
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
    const src = ['img/gatitohome.png','img/escorpionhome.png','img/calaverahome.png'];
    const NUM = 45, GAP = 30, placed = [];

    for (let i = 0; i < NUM; i++) {
      const img  = document.createElement('img');
      const size = 60 + Math.random() * 60;
      img.src    = src[Math.floor(Math.random()*src.length)];
      img.className = 'doodle';
      img.style.cssText = `
        width:${size}px;position:absolute;
        animation-delay:-${Math.random()*18}s;
        animation-duration:${14+Math.random()*10}s`;
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
      img.style.top  = `${y}px`;
      layer.appendChild(img);
    }
  }

  console.log('%c app.js cargado correctamente ✔', 'color:#0a0');
});
