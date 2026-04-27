async function initPage() {
    await mountHeader();
    await loadComponent('#breadcrumbs-root', '../shared/breadcrumbs.html');
    await loadComponent('#stats-root', 'stats.html');
    await loadComponent('#why-root', 'why.html');
    await loadComponent('#marquee-root', 'marquee.html');
    await loadComponent('#partners-root', '../landing/partners.html');
    await mountFooter();

    if (typeof breadcrumbs === 'function') {
        breadcrumbs();
    }

    await initMarquee();
    initPartnersSlider();
}

function bindPartnersArrows(slider) {
    const prevButton = document.querySelector('.partners-arrow-prev');
    const nextButton = document.querySelector('.partners-arrow-next');

    if (!prevButton || !nextButton) {
        return;
    }

    prevButton.addEventListener('click', () => {
        slider.prev();
    });

    nextButton.addEventListener('click', () => {
        slider.next();
    });
}

function initPartnersSlider() {
    const sliderElement = document.querySelector('#partners-slider');

    if (!sliderElement || typeof KeenSlider === 'undefined') {
        return;
    }

    new KeenSlider(sliderElement, {
        loop: true,
        rubberband: false,
        mode: 'snap',
        renderMode: 'performance',
        slides: {
            perView: 1,
            spacing: 8,
        },
        breakpoints: {
            '(min-width: 500px)': {
                slides: {
                    perView: 1,
                    spacing: 8,
                },
            },
            '(min-width: 770px)': {
                slides: {
                    perView: 2,
                    spacing: 8,
                },
            },
            '(min-width: 1024px)': {
                slides: {
                    perView: 3,
                    spacing: 8,
                },
            },
            '(min-width: 1400px)': {
                slides: {
                    perView: 3,
                    spacing: 16,
                },
            },
            '(min-width: 1920px)': {
                slides: {
                    perView: 4,
                    spacing: 16,
                },
            },
        },
        created(slider) {
            bindPartnersArrows(slider);
        },
    });
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