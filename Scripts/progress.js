document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".progress-fill").forEach(bar => {
        const value = parseInt(bar.dataset.progress, 10);
        requestAnimationFrame(() => {
            bar.style.width = value + "%";
        });

        // Check for 100% and celebrate
        if (value === 100) {
            celebrateCompletion();
        }
    });

    function celebrateCompletion() {
        // Pink-themed confetti burst
        confetti({
            particleCount: 200,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#e660b4', '#ff69b4', '#ffb6c1', '#db7093', '#ff1493']
        });

        // "Lilly Complete!" toast
        const toast = document.createElement('div');
        toast.textContent = 'Lilly AI: 100% Complete! 🎉';
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(230, 96, 180, 0.9);
            color: white;
            padding: 20px 40px;
            border-radius: 50px;
            font-weight: bold;
            font-size: 28px;
            z-index: 10000;
            box-shadow: 0 0 40px #e660b4;
            text-shadow: 0 0 10px #fff;
            opacity: 0;
            transition: opacity 0.8s, transform 0.8s;
            pointer-events: none;
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translate(-50%, -50%) scale(1.05)';
        }, 100);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, -50%) scale(1)';
            setTimeout(() => toast.remove(), 800);
        }, 5000); // Toast visible for 5 seconds
    }
});
