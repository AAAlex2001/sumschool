function closeSchoolsDropdowns() {
    document.querySelectorAll('.schools-dropdown.is-open').forEach(function(dd) {
        dd.classList.remove('is-open');
        var t = dd.querySelector('.schools-dropdown__toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
    });
}

function initSchoolsDropdowns() {
    document.querySelectorAll('.schools-dropdown').forEach(function(dd) {
        var toggle = dd.querySelector('.schools-dropdown__toggle');
        if (!toggle || toggle.dataset.ddInit === 'true') return;
        toggle.dataset.ddInit = 'true';

        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            var wasOpen = dd.classList.contains('is-open');
            // close all others
            document.querySelectorAll('.schools-dropdown.is-open').forEach(function(other) {
                if (other !== dd) {
                    other.classList.remove('is-open');
                    var ot = other.querySelector('.schools-dropdown__toggle');
                    if (ot) ot.setAttribute('aria-expanded', 'false');
                }
            });
            dd.classList.toggle('is-open', !wasOpen);
            toggle.setAttribute('aria-expanded', String(!wasOpen));
        });
    });

    if (!document.body.dataset.schoolsDdGlobal) {
        document.body.dataset.schoolsDdGlobal = 'true';
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.schools-dropdown')) closeSchoolsDropdowns();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeSchoolsDropdowns();
        });
    }

    document.querySelectorAll('.schools-dropdown__link').forEach(function(link) {
        if (link.dataset.ddLinkInit === 'true') return;
        link.dataset.ddLinkInit = 'true';
        link.addEventListener('click', function() { closeSchoolsDropdowns(); });
    });
}

function burgerMenu() {
    var header = document.querySelector('.header-container');
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('.burger-menu');
    initSchoolsDropdowns();
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
            closeSchoolsDropdowns();
        }
    });
}

burgerMenu();