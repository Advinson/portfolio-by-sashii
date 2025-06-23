
// Reproducir/pausar video en hover
document.querySelectorAll('#imagen-video .video-loop').forEach(video => {
    // pausa al iniciar
    video.pause();
    video.currentTime = 0;
    video.addEventListener('mouseenter', () => {
        video.play();
    });
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});
