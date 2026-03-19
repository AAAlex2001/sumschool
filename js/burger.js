function burgerMenu() {
    const header = document.querySelector('.header-container');
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.burger-menu');
    if (!header || !burger || !menu) return;

    if (burger.dataset.burgerInitialized === 'true') {
        return;
    }

    burger.dataset.burgerInitialized = 'true';

    burger.addEventListener('click', () => {
        const isOpen = header.classList.toggle('menu-open');
        burger.setAttribute('aria-expanded', String(isOpen));
        menu.setAttribute('aria-hidden', String(!isOpen));
        burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

burgerMenu();