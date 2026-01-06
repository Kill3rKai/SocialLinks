// easteregg-matrix.js - Interactive Matrix Rain on Cyber Channel hover (fade in/out)

document.addEventListener("DOMContentLoaded", () => {
    // Find the Cyber Security YouTube link
    const cyberLink = Array.from(document.querySelectorAll('.link-item'))
        .find(link => link.querySelector('.badge')?.textContent.trim() === 'Cyber Channel');

    if (!cyberLink) {
        console.warn("Cyber Channel link not found — Matrix easter egg disabled");
        return;
    }

    let canvas = null;
    let ctx = null;
    let animationId = null;
    let drops = [];
    let isHovering = false;

    function initMatrix() {
        if (canvas) return;

        canvas = document.createElement('canvas');
        canvas.id = 'matrix-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            pointer-events: none;
            z-index: 9998;
            opacity: 0;
            transition: opacity 1.2s ease;
        `;
        document.body.appendChild(canvas);

        ctx = canvas.getContext('2d');
        resizeCanvas();

        // Characters (classic Matrix mix)
        const chars = '01';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(1);

        function draw() {
            // Trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0f8'; // Bright green with slight cyan tint
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            animationId = requestAnimationFrame(draw);
        }

        draw();
    }

    function fadeIn() {
        if (isHovering) return;
        isHovering = true;

        initMatrix();
        setTimeout(() => {
            if (canvas) canvas.style.opacity = '0.55'; // Max opacity (adjust if you want stronger/weaker)
        }, 50);
    }

    function fadeOut() {
        if (!isHovering) return;
        isHovering = false;

        if (!canvas) return;

        canvas.style.opacity = '0';

        // Clean up after fade out
        setTimeout(() => {
            if (!isHovering && canvas) {
                cancelAnimationFrame(animationId);
                canvas.remove();
                canvas = null;
                ctx = null;
                drops = [];
            }
        }, 1200); // Matches transition time
    }

    function resizeCanvas() {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    // Events
    cyberLink.addEventListener('mouseenter', fadeIn);
    cyberLink.addEventListener('mouseleave', fadeOut);

    // Resize handler
    window.addEventListener('resize', resizeCanvas);
});
