function toggleUniversitySection(headerElement) {
    const cards = headerElement.nextElementSibling;
    if (!cards || !cards.classList.contains('university-cards')) return;
    const isExpanded = cards.classList.toggle('expanded');
    headerElement.setAttribute('aria-expanded', String(isExpanded));
    const firstCard = cards.querySelector('.university-card');
    if (firstCard) {
        firstCard.setAttribute('tabindex', isExpanded ? '0' : '-1');
    }
}

function buttonRollUp(button) {
    const cards = button.closest('.university-cards');
    if (!cards) return;
    
    cards.classList.remove('expanded');
    
    const header = cards.previousElementSibling;
    if (header && header.classList.contains('university-header')) {
        header.setAttribute('aria-expanded', 'false');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const firstContainer = document.querySelector('.university-container');
    if (!firstContainer) return;

    const header = firstContainer.querySelector('.university-header');
    const cards = firstContainer.querySelector('.university-cards');

    if (header && cards) {
        cards.classList.add('expanded');
        header.setAttribute('aria-expanded', 'true');
        const firstCard = cards.querySelector('.university-card');
        if (firstCard) {
            firstCard.setAttribute('tabindex', '0');
        }
    }
});