document.addEventListener("DOMContentLoaded", () => {
    const statusBadge = document.getElementById('twitch-status');
    const username = 'kill3rkai';

    function checkStatus() {
        fetch(`https://decapi.me/twitch/uptime?channel=${username}`)
            .then(response => response.text())
            .then(text => {
                if (text.toLowerCase().includes('offline') || text.includes('not found')) {
                    statusBadge.textContent = 'Offline';
                    statusBadge.classList.remove('live');
                    statusBadge.classList.add('offline');
                } else {
                    statusBadge.textContent = 'LIVE';
                    statusBadge.classList.remove('offline');
                    statusBadge.classList.add('live');
                    statusBadge.style.background = '#2a0f0f';
                }
            })
            .catch(() => {
                statusBadge.textContent = 'Offline';
            });
    }

    checkStatus();
    setInterval(checkStatus, 60000);  // Check every minute without reload
});
