function applyFeaturedFromCard(featured, card) {
    const featuredIframe = featured.querySelector('.video iframe');
    const cardIframe = card.querySelector('.video iframe');
    const featuredTitle = featured.querySelector('.reviews-container-review-title');
    const cardTitle = card.querySelector('.reviews-container-reviews-card-title');
    const featuredSubtitle = featured.querySelector('.reviews-container-review-text');
    const cardSubtitle = card.querySelector('.reviews-container-reviews-card-text');
    const featuredHashtag = featured.querySelector('.reviews-container-review-hashtag');
    const cardHashtag = card.querySelector('.reviews-container-reviews-card-hashtag');
    const featuredBody = featured.querySelector('.reviews-container-review-body p');
    const cardComment = card.querySelector('.reviews-container-reviews-card-comment');

    if (featuredIframe && cardIframe) {
        const nextSrc = cardIframe.getAttribute('src') || '';
        if (featuredIframe.getAttribute('src') !== nextSrc) {
            featuredIframe.setAttribute('src', nextSrc);
        }
        const nextTitle = cardIframe.getAttribute('title');
        if (nextTitle) {
            featuredIframe.setAttribute('title', nextTitle);
        }
    }

    if (featuredTitle && cardTitle) {
        featuredTitle.textContent = cardTitle.textContent;
    }
    if (featuredSubtitle && cardSubtitle) {
        featuredSubtitle.textContent = cardSubtitle.textContent;
    }
    if (featuredHashtag && cardHashtag) {
        featuredHashtag.textContent = cardHashtag.textContent;
    }
    if (featuredBody) {
        featuredBody.textContent = cardComment
            ? cardComment.textContent.trim()
            : (cardSubtitle ? cardSubtitle.textContent.trim() : '');
    }
}

function initReviews() {
    const featured = document.querySelector('.reviews-container-review');
    const listRoot = document.querySelector('.reviews-container-reviews');
    if (!featured || !listRoot) {
        return;
    }

    listRoot.addEventListener('click', (event) => {
        const card = event.target.closest('.reviews-container-reviews-card');
        if (!card || !listRoot.contains(card)) {
            return;
        }

        listRoot.querySelectorAll('.reviews-container-reviews-card.is-active').forEach((el) => {
            el.classList.remove('is-active');
        });
        card.classList.add('is-active');

        applyFeaturedFromCard(featured, card);
    });
}
