// easteregg3.js - Secret "lilly" activation easter egg

document.addEventListener("DOMContentLoaded", () => {
    const robotIcon = document.querySelector('.ai-icon');

    if (!robotIcon) {
        console.warn("Lilly AI icon not found — easter egg disabled");
        return;
    }

    const targetWord = 'lilly';
    let typed = '';

    document.addEventListener('keydown', (e) => {
        // Don't interfere if user is typing in an input field
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        typed += e.key.toLowerCase();

        if (typed.endsWith(targetWord)) {
            activateLillyMode();
            typed = ''; // Allow re-triggering later
        }

        if (typed.length > 20) {
            typed = typed.slice(-20);
        }
    });

    function activateLillyMode() {
    // Prevent multiple activations at once
    if (robotIcon.dataset.lillyActive === 'true') return;
    robotIcon.dataset.lillyActive = 'true';

    robotIcon.classList.add('lilly-active');

    robotIcon.style.transition = 'all 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
    robotIcon.style.transform = 'scale(1.5) rotate(8deg)';
    
    robotIcon.style.filter = 'drop-shadow(0 0 20px #e660b4) drop-shadow(0 0 40px #e660b4)';

    robotIcon.style.color = '#ff9ee6';

    // Create toast notification
    const toast = document.createElement('div');
    toast.textContent = 'Lilly AI 💗';
    toast.style.cssText = `
        position: fixed;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #e660b4, #ff9ee6);
        color: white;
        padding: 16px 32px;
        border-radius: 50px;
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
        font-size: 18px;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(230, 96, 180, 0.4);
        opacity: 0;
        pointer-events: none;
        transition: all 0.6s ease;
        white-space: nowrap;
        border: 3px solid rgba(255, 255, 255, 0.2);
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(-12px)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(0)';
        setTimeout(() => toast.remove(), 600);
    }, 3000);

    // Reset after animation
    setTimeout(() => {
        robotIcon.classList.remove('lilly-active');
        robotIcon.style.transform = '';
        robotIcon.style.filter = '';
        robotIcon.style.color = ''; // back to original #e660b4
        delete robotIcon.dataset.lillyActive;
    }, 4000);
}
});