async function initPage() {
    await mountHeader();

    // TODO: секции страницы «О программе»
    // await loadComponent('#programs-content', 'program-hero.html');
    // await loadComponent('#programs-content', 'program-about.html');

    await mountFooter();
}

initPage();
