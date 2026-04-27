async function initPage() {
    await mountHeader();
    await loadComponent('#stats-root', 'stats.html');
    await loadComponent('#why-root', 'why.html');
    await loadComponent('#marquee-root', 'marquee.html');
    await mountFooter();

    await initMarquee();
}

function waitForImages(container) {
    const images = Array.from(container.querySelectorAll('img'));

    return Promise.all(images.map((image) => {
        if (image.complete) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            image.addEventListener('load', resolve, { once: true });
            image.addEventListener('error', resolve, { once: true });
        });
    }));
}

async function initMarquee() {
    const el = document.querySelector('.container-marquee');

    if (el && typeof marqueeJs === 'function') {
        await waitForImages(el);

        const marquee = marqueeJs(el, {
            speed: 20,
            delay: 0
        });

        if (marquee) {
            const frames = el.querySelectorAll('.photo-frame');

            frames.forEach((frame) => {
                frame.addEventListener('mouseenter', () => {
                    marquee.pause();
                });

                frame.addEventListener('mouseleave', () => {
                    marquee.resume();
                });
            });
        }
    } else {
        console.warn('Marquee не инициализирован: элемент или библиотека не найдены');
    }
}

initPage();