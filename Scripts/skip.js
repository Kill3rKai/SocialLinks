document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Delete') {
            window.location.href = 'main.html';
        }
    });
});
