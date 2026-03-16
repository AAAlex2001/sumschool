// Загрузка HTML-компонента в указанный элемент
async function loadComponent(selector, path) {
    const el = document.querySelector(selector);
    if (!el) return;
    const res = await fetch(path);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    el.innerHTML = doc.body.innerHTML;
}

// Список компонентов: [селектор, путь к файлу]
loadComponent('#header-root', 'header.html');

// Чтобы добавить новый компонент, просто допиши строку:
// loadComponent('#footer-root', 'footer.html');
