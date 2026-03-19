function up() {

    const upButton = document.querySelector('.up');
    if (upButton) {
        upButton.classList.add('fade-out');
        setTimeout(() => {
            upButton.classList.remove('fade-out');
        }, 500);
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}