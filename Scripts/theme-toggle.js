// theme-toggle.js - Dark/Light Mode Toggle with Lilly Pink Twist + Logo Swap

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const toggleButton = document.getElementById('theme-toggle');
    const icon = toggleButton?.querySelector('i');
    const logoImg = document.querySelector('.logo'); // main logo image

    if (!toggleButton || !icon || !logoImg) return;

    // Paths to the two logos
    const darkLogo = 'Images/iconfile.jpg';        // Default (dark mode)
    const lightLogo = 'Images/alt_image.png';       // Lilly mode (light theme)

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
        logoImg.src = lightLogo;            // Swap to alt image on load
        showLillyToast();
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');

        // Switch icon
        icon.classList.toggle('fa-moon', !isLight);
        icon.classList.toggle('fa-sun', isLight);

        // Swap logo based on theme
        if (isLight) {
            logoImg.src = lightLogo;
            showLillyToast();
        } else {
            logoImg.src = darkLogo;
        }

        // Save preference
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    function showLillyToast() {
        if (document.querySelector('.lilly-toast')) return;

        const toast = document.createElement('div');
        toast.className = 'lilly-toast';
        toast.textContent = 'Lilly Mode Activated! 💗';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e660b4;
            color: #fff;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.5s, transform 0.5s;
            transform: translateY(-20px);
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 50);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
});
