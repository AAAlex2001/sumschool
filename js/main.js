async function loadComponent(selector, path) {
    const el = document.querySelector(selector);
    if (!el) return;
    const res = await fetch(path);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    el.innerHTML = doc.body.innerHTML;
}

function updateHeroDots(slider) {
    const currentIndex = slider.track.details.rel;
    const paginations = document.querySelectorAll('.hero-pagination');

    paginations.forEach((pagination) => {
        const dots = pagination.querySelectorAll('.hero-pagination-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('is-active', index === currentIndex);
            dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
        });
    });
}

function updateReviewsDots(slider) {
    const currentIndex = slider.track.details.rel;
    const paginations = document.querySelectorAll('.reviews-pagination');
    paginations.forEach((pagination) => {
        const dots = pagination.querySelectorAll('.reviews-pagination-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('is-active', index === currentIndex);
            dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
        });
    });
}

function bindHeroDots(slider) {
    const paginations = document.querySelectorAll('.hero-pagination');

    paginations.forEach((pagination) => {
        const dots = pagination.querySelectorAll('.hero-pagination-dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                slider.moveToIdx(index);
            });
        });
    });
}

function bindReviewsDots(slider) {
    const paginations = document.querySelectorAll('.reviews-pagination');
    paginations.forEach((pagination) => {
        const dots = pagination.querySelectorAll('.reviews-pagination-dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                slider.moveToIdx(index);
            });
        });
    });
}

function updatePartnersArrows(slider) {
    const prevButton = document.querySelector('.partners-arrow-prev');
    const nextButton = document.querySelector('.partners-arrow-next');

    if (!prevButton || !nextButton) {
        return;
    }

    const details = slider.track.details;
    const maxIndex = details.maxIdx;
    const currentIndex = details.rel;
    const shouldDisable = maxIndex <= 0;

    prevButton.disabled = shouldDisable || currentIndex <= 0;
    nextButton.disabled = shouldDisable || currentIndex >= maxIndex;
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

function initHeroSlider() {
    const sliderElement = document.querySelector('#hero-slider');
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
            spacing: 2,
        },
        created(slider) {
            bindHeroDots(slider);
            updateHeroDots(slider);
        },
        slideChanged(slider) {
            updateHeroDots(slider);
        },
    });
}

function initReviewsSlider() {
    const sliderElement = document.querySelector('#reviews-slider');
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
            spacing: 2,
        },
        created(slider) {
            bindReviewsDots(slider);
            updateReviewsDots(slider);
        },
        slideChanged(slider) {
            updateReviewsDots(slider);
        },
    });
}

function initPartnersSlider() {
    const sliderElement = document.querySelector('#partners-slider');
    if (!sliderElement || typeof KeenSlider === 'undefined') {
        return;
    }

    new KeenSlider(sliderElement, {
        loop: false,
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
            updatePartnersArrows(slider);
        },
        slideChanged(slider) {
            updatePartnersArrows(slider);
        },
        optionsChanged(slider) {
            updatePartnersArrows(slider);
        },
    });
}

async function initPage() {
    await loadComponent('#header-root', 'header.html');
    await loadComponent('#hero-root', 'hero.html');
    await loadComponent('#stats-root', 'stats.html');
    await loadComponent('#news-root', 'news.html');
    await loadComponent('#programs-root', 'programs.html');
    await loadComponent('#university-root', 'university.html');
    await loadComponent('#reviews-root', 'reviews.html');
    await loadComponent('#partners-root', 'partners.html');
    initHeroSlider();
    initReviewsSlider();
    initPartnersSlider();
}

initPage();