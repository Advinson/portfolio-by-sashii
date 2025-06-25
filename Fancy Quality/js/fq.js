
document.addEventListener('DOMContentLoaded', () => {

    // Selecciona todos los vídeos dentro de #imagen-video
    const videos = document.querySelectorAll('#imagen-video .video-loop');

    /* ---------- FUNCIÓN GENÉRICA PARA INTENTAR REPRODUCIR ---------- */
    const tryPlay = (vid) => {
        if (!vid.paused) return;           // ya se reproduce
        const p = vid.play();
        if (p !== undefined) {
            p.catch(() => {
                /* Si el navegador lo bloquea, espera el primer toque del usuario */
                const once = () => { vid.play(); document.removeEventListener('touchstart', once); };
                document.addEventListener('touchstart', once, { once: true });
            });
        }
    };

    /* ---------- INTERSECTION OBSERVER (autoplay solo cuando visible) ---------- */
    let io = null;
    if ('IntersectionObserver' in window) {
        io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const vid = entry.target;
                if (entry.isIntersecting) {
                    tryPlay(vid);
                } else {
                    vid.pause();
                }
            });
        }, { threshold: 0.5 }); // 50 % visible
    }

    /* ---------- RECORRE CADA VÍDEO Y REGISTRA COMPORTAMIENTOS ---------- */
    videos.forEach(vid => {

        /* 1) Estado inicial (pausado y al inicio) */
        vid.pause();
        vid.currentTime = 0;

        /* 2) Hover (solo funcionará en dispositivos con hover) */
        vid.addEventListener('mouseenter', () => vid.play());
        vid.addEventListener('mouseleave', () => {
            vid.pause();
            vid.currentTime = 0;
        });

        /* 3) Observa visibilidad en viewport */
        if (io) io.observe(vid);
        else tryPlay(vid);  // Fallback para navegadores sin IO
    });

});

