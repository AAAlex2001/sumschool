function burgerMenu() {
    const header = document.querySelector('.header-container');
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.burger-menu');
    if (!header || !burger || !menu) return;

    function syncNavDropdownWidth(dropdown) {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        const list = dropdown.querySelector('.nav-dropdown-list');

        if (!toggle || !list) return;

        dropdown.style.removeProperty('--nav-dropdown-open-width');

        const openWidth = Math.max(toggle.scrollWidth, list.scrollWidth);
        dropdown.style.setProperty('--nav-dropdown-open-width', `${Math.ceil(openWidth)}px`);
    }

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
                dd.querySelector('.burger-dropdown-toggle').setAttribute('aria-expanded', 'false');
            });
        }
    });

    menu.querySelectorAll('.burger-dropdown-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            var dropdown = toggle.closest('.burger-dropdown');
            var isOpen = dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    });

    document.querySelectorAll('.nav-dropdown-toggle').forEach(function(toggle) {
        var dropdown = toggle.closest('.nav-dropdown');

        if (dropdown) {
            syncNavDropdownWidth(dropdown);
        }

        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            var dropdown = toggle.closest('.nav-dropdown');
            syncNavDropdownWidth(dropdown);
            var isOpen = dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    });

    window.addEventListener('resize', function() {
        document.querySelectorAll('.nav-dropdown').forEach(function(dropdown) {
            syncNavDropdownWidth(dropdown);
        });
    });

    document.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-dropdown.open').forEach(function(dd) {
            if (!dd.contains(e.target)) {
                dd.classList.remove('open');
                dd.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
            }
        });
    });
}

burgerMenu();
