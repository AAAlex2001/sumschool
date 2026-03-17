Init();
function Init() {
    const videopreviews = document.querySelectorAll('.videopreview');
    videopreviews.forEach(videopreview => {
        const video = videopreview.querySelector('video');
        const playButton = videopreview.querySelector('.play-button');
        playButton.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playButton.style.display = 'none';
            } else {
                video.pause();
                playButton.style.display = 'block';
            }
        });
    });
}