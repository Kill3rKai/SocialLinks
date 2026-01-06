document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".progress-fill").forEach(bar => {
        const value = bar.dataset.progress;
        requestAnimationFrame(() => {
            bar.style.width = value + "%";
        });
    });
});
