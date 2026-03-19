function burgerMenu() {
    const header = document.querySelector('.header-container');
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.burger-menu');
    if (!header || !burger || !menu) return;

    if (burger.dataset.burgerInitialized === 'true') {
        return;
    }

    burger.dataset.burgerInitialized = 'true';

    const burgerImg = burger.querySelector('img');

    burger.addEventListener('click', () => {
        const isOpen = header.classList.toggle('menu-open');
        burger.setAttribute('aria-expanded', String(isOpen));
        menu.setAttribute('aria-hidden', String(!isOpen));
        burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
        burgerImg.src = isOpen ? '../../assets/close.svg' : '../../assets/burger.svg';
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            menu.querySelectorAll('.burger-dropdown.open').forEach(function(dd) {
                dd.classList.remove('open');
                dd.querySelector('.burger-dropdown__toggle').setAttribute('aria-expanded', 'false');
            });
        }
    });

    // burger dropdown toggles
    menu.querySelectorAll('.burger-dropdown__toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            var dropdown = toggle.closest('.burger-dropdown');
            var isOpen = dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    });

    document.querySelectorAll('.nav-dropdown__toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            var dropdown = toggle.closest('.nav-dropdown');
            var isOpen = dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    });

    document.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-dropdown.open').forEach(function(dd) {
            if (!dd.contains(e.target)) {
                dd.classList.remove('open');
                dd.querySelector('.nav-dropdown__toggle').setAttribute('aria-expanded', 'false');
            }
        });
    });
}

burgerMenu();
