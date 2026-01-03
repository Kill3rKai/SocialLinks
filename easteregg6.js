// easteregg-hearts.js - Floating Hearts in Lilly Mode

document.addEventListener("DOMContentLoaded", () => {
    // Only run in light/Lilly mode
    if (!document.body.classList.contains('light-mode')) return;

    function createHeart() {
        const heart = document.createElement('div');
        heart.textContent = '💗';
        heart.style.cssText = `
            position: fixed;
            bottom: -50px;
            left: ${Math.random() * 100}vw;
            font-size: ${Math.random() * 20 + 20}px;
            color: #e660b4;
            opacity: 0;
            pointer-events: none;
            z-index: 999;
            animation: float-up 8s ease-out forwards;
            text-shadow: 0 0 10px #ff9ee6;
            user-select: none;
        `;

        document.body.appendChild(heart);

        // Fade in quickly
        setTimeout(() => heart.style.opacity = '0.8', 100);

        // Remove after animation
        setTimeout(() => heart.remove(), 8000);
    }

    function releaseHearts() {
        const count = Math.floor(Math.random() * 4) + 3; // 3–6 hearts
        for (let i = 0; i < count; i++) {
            setTimeout(createHeart, i * 300); // Stagger them slightly
        }
    }

    // Initial burst after 10 seconds
    setTimeout(releaseHearts, 10000);

    // Then randomly every 30–90 seconds
    function scheduleNext() {
        const delay = Math.random() * 60000 + 30000; // 30k–90k ms
        setTimeout(() => {
            releaseHearts();
            scheduleNext();
        }, delay);
    }

    scheduleNext();
});
