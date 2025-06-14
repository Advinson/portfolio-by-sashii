/* Cambia la sección visible y el estado de los botones */
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // desactivar todos los botones
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));

    // mostrar solo la sección objetivo
    const targetId = btn.dataset.target;
    const targetSection = document.getElementById(targetId);
    if (targetSection) targetSection.classList.add('active');
  });
});




document.addEventListener('DOMContentLoaded', () => {
  const layer = document.querySelector('.doodle-layer');
  const { width: layerW, height: layerH } = layer.getBoundingClientRect();
  const sources = [
    'img/gatitohome.png',
    'img/escorpionhome.png',
    'img/calaverahome.png'
  ];
  const NUM_DOODLES = 45;
  const positions = [];          // aquí guardamos { x, y, size }
  const GAP = 30;                // espacio mínimo en px entre doodles

  for (let i = 0; i < NUM_DOODLES; i++) {
    const img = document.createElement('img');
    img.src = sources[Math.floor(Math.random() * sources.length)];
    img.className = 'doodle';
    
    // 1. tamaño aleatorio
    const size = 60 + Math.random() * 60;
    img.style.width = `${size}px`;
    img.style.height = 'auto';
    img.style.position = 'absolute';

    // 2. buscar posición que no colisione
    let x, y, attempts = 0;
    do {
      x = Math.random() * (layerW - size);
      y = Math.random() * (layerH - size);
      attempts++;
    } while (
      positions.some(p =>
        x < p.x + p.size + GAP &&
        x + size + GAP > p.x &&
        y < p.y + p.size + GAP &&
        y + size + GAP > p.y
      ) &&
      attempts < 100
    );
    // si no encontró posición en 100 intentos, lo pone donde sea
    positions.push({ x, y, size });

    img.style.left = `${x}px`;
    img.style.top  = `${y}px`;

    // 3. animación (igual que antes)
    img.style.animationDelay    = `-${Math.random() * 18}s`;
    img.style.animationDuration = `${14 + Math.random() * 10}s`;

    layer.appendChild(img);
  }
});






/* ---------- Navegación lateral con animación ---------- */
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) return;        // ya está en esa sección

    /* Botones activos */
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    /* Secciones */
    const current = document.querySelector('.content-section.active');
    const target = document.getElementById(btn.dataset.target);

    if (!target) return;

    /* Animar salida de la sección actual */
    current.classList.add('section-leave');
    current.classList.remove('active');

    // fuerza reflujo para que la transición se aplique
    void current.offsetWidth;
    current.classList.add('section-leave-active');

    /* Cuando termine la animación de salida, ocultamos completamente */
    current.addEventListener('transitionend', () => {
      current.classList.remove('section-leave', 'section-leave-active');
    }, { once: true });

    /* Preparar y animar la sección destino */
    target.classList.add('section-enter');
    target.classList.add('active');

    // reflujo
    void target.offsetWidth;
    target.classList.add('section-enter-active');

    /* Limpiar clases al final de la animación de entrada */
    target.addEventListener('transitionend', () => {
      target.classList.remove('section-enter', 'section-enter-active');
    }, { once: true });
  });
});





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
