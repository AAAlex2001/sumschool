//хлебные крошки

function breadcrumbs() {
    const breadcrumbsContainer = document.getElementById('breadcrumbs');
    if (!breadcrumbsContainer) return;

    breadcrumbsContainer.innerHTML = '';
    const currentKey = breadcrumbsContainer.dataset.breadcrumbCurrent || 'breadcrumbs.about';
    const homeHref = breadcrumbsContainer.dataset.breadcrumbHomeHref || '../landing/main.html';

    const homeLink = document.createElement('a');
    homeLink.href = homeHref;
    homeLink.className = 'breadcrumbs-link';
    homeLink.setAttribute('data-i18n', 'breadcrumbs.home');

    const separator = document.createElement('span');
    separator.className = 'breadcrumbs-separator';
    separator.textContent = '/';

    const currentPage = document.createElement('span');
    currentPage.className = 'breadcrumbs-current';
    currentPage.setAttribute('data-i18n', currentKey);

    breadcrumbsContainer.appendChild(homeLink);
    breadcrumbsContainer.appendChild(separator);
    breadcrumbsContainer.appendChild(currentPage);

    if (typeof applyTranslations === 'function') {
        applyTranslations(breadcrumbsContainer);
    }
}