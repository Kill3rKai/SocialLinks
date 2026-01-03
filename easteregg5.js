// easteregg-cybertips.js - Random Cybersecurity Tip Toasts

document.addEventListener("DOMContentLoaded", () => {
    const tips = [
        "Use a password manager to create and store strong, unique passwords for every account.",
        "Enable multi-factor authentication (MFA) wherever possible — especially on email and banking.",
        "Keep your software, apps, and devices updated to patch known vulnerabilities.",
        "Think before you click! Hover over links and verify sender emails to avoid phishing.",
        "Be cautious of deepfakes — verify unusual video/audio requests for money or info.",
        "Use antivirus/EDR software and keep it running in real-time.",
        "Back up important data regularly to an external drive or secure cloud.",
        "Avoid public Wi-Fi for sensitive tasks — use a trusted VPN instead.",
        "Freeze your credit reports to prevent identity theft from data breaches.",
        "Never reuse passwords across sites — one breach can compromise everything.",
        "Limit personal info shared online and review app permissions regularly.",
        "Use phishing-resistant MFA (like hardware keys) for highest security.",
        "Beware of unsolicited calls/texts asking for codes or personal details.",
        "Shop only on trusted sites (look for HTTPS and known brands).",
        "Monitor your accounts regularly for suspicious activity.",
        "Use strong, unique PINs for devices and avoid simple patterns.",
        "Educate yourself on current scams — knowledge is your best defense!",
        "Consider a personal data removal service to scrub your info from data brokers.",
        "Stay safe online — small habits make a big difference! 💚"
    ];

    function showRandomTip() {
        const tip = tips[Math.floor(Math.random() * tips.length)];

        // Prevent duplicates/overlaps
        if (document.querySelector('.cyber-tip-toast')) return;

        const toast = document.createElement('div');
        toast.className = 'cyber-tip-toast';
        toast.innerHTML = `
            <strong>Cyber Tip:</strong><br>${tip}
        `;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #000;
            color: #0f0;
            border: 2px solid #0f0;
            padding: 16px 28px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 16px;
            max-width: 90%;
            text-align: center;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.4);
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.8s ease, transform 0.8s ease;
            pointer-events: none;
            text-shadow: 0 0 5px #0f0;
        `;

        document.body.appendChild(toast);

        // Fade in with slight pop
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(-10px)';
        }, 100);

        // Auto fade out after 8 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(0)';
            setTimeout(() => toast.remove(), 800);
        }, 8000);
    }

    // Show one tip immediately on load
    showRandomTip();

    // Then randomly every 4-8 minutes (low probability)
    setInterval(() => {
        if (Math.random() < 0.2) { // ~20% chance each interval
            showRandomTip();
        }
    }, 360000); // Check every 6 minutes (360000 ms)
});