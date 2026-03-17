function toggleUniversitySection() {
    const section = document.querySelector('.container-university');
    if (!section) return;
    section.classList.toggle('is-visible');
}
