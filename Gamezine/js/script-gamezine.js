// js/script-gamezine.js

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.number-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1) Quitar active de todos
      buttons.forEach(b => b.classList.remove('active'));
      // 2) Poner active al clicado
      btn.classList.add('active');

      // 3) (Opcional) Si luego quieres desplazarte a secciones:
      // const sec = btn.dataset.section;
      // const target = document.querySelector(`[data-section-content="${sec}"]`);
      // if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
