function toggleUniversitySection() {
    const section = document.querySelector('.university-container');
    if (!section) return;
    const isExpanded = section.classList.toggle('expanded');
    const plusIcon = section.querySelector('.university-plus');
    const minusIcon = section.querySelector('.university-minus');
    const buttonToggle = section.querySelector('.university-toggle-button');
    if (isExpanded) {
        plusIcon.style.display = 'none';
        minusIcon.style.display = 'block';
        buttonToggle.setAttribute('aria-expanded', 'true');
    } else {
        plusIcon.style.display = 'block';
        minusIcon.style.display = 'none';
        buttonToggle.setAttribute('aria-expanded', 'false');
    }
}
