document.addEventListener('DOMContentLoaded', () => {
    let typed = '';
    document.addEventListener('keydown', (e) => {
        typed += e.key.toLowerCase();
        if (typed.includes('ctf1')) {
            window.location.href = 'Challanges\\ctf1.html';
        }

         if (typed.length > 20) typed = typed.slice(-20);
    });

});
