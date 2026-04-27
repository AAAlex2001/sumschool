async function initPage() {
    await mountHeader();
    await loadComponent('#stats-root', 'stats.html');
    await mountFooter();
}

initPage();
