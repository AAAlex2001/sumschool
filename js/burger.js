function closeSchoolsDD() {
    document.querySelectorAll('.schools-dd.is-open').forEach(function(dd) {
        dd.classList.remove('is-open');
        var btn = dd.querySelector('.schools-dd__btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    });
}

function initSchoolsDropdowns() {
    document.querySelectorAll('.schools-dd').forEach(function(dd) {
        var btn = dd.querySelector('.schools-dd__btn');
        if (!btn || btn.dataset.ddInit === 'true') return;
        btn.dataset.ddInit = 'true';
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var wasOpen = dd.classList.contains('is-open');
            document.querySelectorAll('.schools-dd.is-open').forEach(function(other) {
                if (other !== dd) {
                    other.classList.remove('is-open');
                    var ob = other.querySelector('.schools-dd__btn');
                    if (ob) ob.setAttribute('aria-expanded', 'false');
                }
            });
            dd.classList.toggle('is-open', !wasOpen);
            btn.setAttribute('aria-expanded', String(!wasOpen));
        });
    });
    if (!document.body.dataset.schoolsDdGlobal) {
        document.body.dataset.schoolsDdGlobal = 'true';
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.schools-dd')) closeSchoolsDD();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeSchoolsDD();
        });
    }
}

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