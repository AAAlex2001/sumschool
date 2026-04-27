async function initPage() {
    await mountHeader();
    await loadComponent('#stats-root', 'stats.html');
    await loadComponent('#why-root', 'why.html');
    await loadComponent('#marquee-root', 'marquee.html');
    await mountFooter();

    initMarquee();
}

function initMarquee() {
    const el = document.querySelector('.container-marquee');

    if (el && typeof marqueeJs === 'function') {
        marqueeJs(el, {
            speed: 20,
            delay: 0
        });
    } else {
        console.warn('Marquee не инициализирован: элемент или библиотека не найдены');
    }
}

initPage();