async function initPage() {
    await mountHeader();
    await loadComponent('#stats-root', 'stats.html');
    await loadComponent('#why-root', 'why.html');
    await loadComponent('#marquee-root', 'marquee.html');
    await mountFooter();

    // Теперь элемент .container-marquee гарантированно существует в DOM
    initMarquee();
}

function initMarquee() {
    const el = document.querySelector('.container-marquee'); // исправленный селектор
    if (el && typeof Marquee !== 'undefined') {
        new Marquee(el, {
            duration: 20000,
            gap: 50,
            delayBeforeStart: 0,
            direction: 'left',
            duplicated: true
        });
    } else {
        console.warn('Marquee не инициализирован: элемент или библиотека не найдены');
    }
}

// Запускаем инициализацию страницы
initPage();