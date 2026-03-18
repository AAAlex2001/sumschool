function toggleUniversitySection(headerElement) {
    const accordion = headerElement.nextElementSibling;
    if (!accordion || !accordion.classList.contains('university-accordion')) return;
    const isExpanded = accordion.classList.toggle('expanded');
    headerElement.setAttribute('aria-expanded', String(isExpanded));
    const firstCard = accordion.querySelector('.university-card');
    if (firstCard) {
        firstCard.setAttribute('tabindex', isExpanded ? '0' : '-1');
    }
}

function buttonRollUp(button) {
    const accordion = button.closest('.university-accordion');
    if (!accordion) return;
    
    accordion.classList.remove('expanded');
    
    const header = accordion.previousElementSibling;
    if (header && header.classList.contains('university-header')) {
        header.setAttribute('aria-expanded', 'false');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const firstContainer = document.querySelector('.university-container');
    if (!firstContainer) return;

    const header = firstContainer.querySelector('.university-header');
    const accordion = firstContainer.querySelector('.university-accordion');

    if (header && accordion) {
        accordion.classList.add('expanded');
        header.setAttribute('aria-expanded', 'true');
        const firstCard = accordion.querySelector('.university-card');
        if (firstCard) {
            firstCard.setAttribute('tabindex', '0');
        }
    }
});