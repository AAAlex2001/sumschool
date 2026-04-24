async function loadComponent(selector, path) {
    const el = document.querySelector(selector);
    if (!el) return;
    const res = await fetch(path);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    el.innerHTML = doc.body.innerHTML;
}

async function mountHeader() {
    await loadComponent('#header-root', '../shared/header.html');
    await loadComponent('#burger-menu-root', '../shared/burger-menu.html');
    if (typeof burgerMenu === 'function') {
        burgerMenu();
    }
}

async function mountFooter() {
    await loadComponent('#footer-root', '../shared/footer.html');
    await loadComponent('#up-root', '../shared/up.html');
    if (typeof initUpButton === 'function') {
        initUpButton();
    }
}
