


document.addEventListener('DOMContentLoaded', () => {

    const video = document.getElementById('laika-video');
    const wrapper = video.parentElement;

    /* Autoplay en desktop: play/pause al pasar el cursor */
    wrapper.addEventListener('mouseenter', () => {
        video.currentTime = 0;   // empieza desde el principio
        video.play();
    });

    wrapper.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;   // vuelve al inicio
    });

    /* Extra: autoplay táctil (tap para reproducir / pausar) */
    wrapper.addEventListener('touchstart', (e) => {
        e.preventDefault();     // evita scroll accidental
        if (video.paused) video.play();
        else { video.pause(); video.currentTime = 0; }
    }, { passive: false });

});





document.addEventListener('DOMContentLoaded', () => {

    /* Configuración global */
    const PAW_IMG_SRC = 'img/4.png'; // ruta de su PNG
    const PAW_SIZE = 25;             // ancho/alto en píxeles
    const PAW_COUNT = 50;              // número de huellas
    const SPEED_RANGE = 0.2;            // velocidad máx (px / frame)

    /* Referencias DOM */
    const canvas = document.getElementById('paws-canvas');
    const ctx = canvas.getContext('2d');

    /* Ajustar lienzo al tamaño real del elemento */
    const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    /* Cargar la imagen de la huella */
    const pawImg = new Image();
    pawImg.src = PAW_IMG_SRC;
    pawImg.onload = () => initAnimation();

    /* Objeto-huella */
    class Paw {
        constructor(x, y, vx, vy) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
        }
        move() {
            this.x += this.vx;
            this.y += this.vy;

            /* Rebote contra bordes */
            if (this.x <= 0 || this.x + PAW_SIZE >= canvas.width) this.vx *= -1;
            if (this.y <= 0 || this.y + PAW_SIZE >= canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.drawImage(pawImg, this.x, this.y, PAW_SIZE, PAW_SIZE);
        }
    }

    /* Inicializa las huellas con posiciones / velocidades aleatorias */
    let paws = [];
    function initAnimation() {
        paws = [];
        for (let i = 0; i < PAW_COUNT; i++) {
            const x = Math.random() * (canvas.width - PAW_SIZE);
            const y = Math.random() * (canvas.height - PAW_SIZE);
            const vx = (Math.random() * 2 - 1) * SPEED_RANGE;
            const vy = (Math.random() * 2 - 1) * SPEED_RANGE;
            paws.push(new Paw(x, y, vx, vy));
        }
        requestAnimationFrame(update);
    }

    /* Detecta y resuelve colisión simple entre dos huellas */
    function handleCollisions() {
        for (let i = 0; i < paws.length; i++) {
            for (let j = i + 1; j < paws.length; j++) {
                const a = paws[i], b = paws[j];
                const dx = (a.x + PAW_SIZE / 2) - (b.x + PAW_SIZE / 2);
                const dy = (a.y + PAW_SIZE / 2) - (b.y + PAW_SIZE / 2);
                const dist = Math.hypot(dx, dy);
                if (dist < PAW_SIZE) {           // colisión
                    /* Intercambiar velocidades (rebote elástico simplificado) */
                    [a.vx, b.vx] = [b.vx, a.vx];
                    [a.vy, b.vy] = [b.vy, a.vy];
                }
            }
        }
    }

    /* Loop principal */
    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        paws.forEach(p => p.move());
        handleCollisions();
        paws.forEach(p => p.draw());

        requestAnimationFrame(update);
    }

});

