window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Secret gallery access should be on all pages
    let statusClickCount = 0;
    let statusClickTimer = null;
    const statusPanel = document.querySelector('.status-panel');
    if (statusPanel) {
        statusPanel.addEventListener('click', () => {
            statusClickCount++;
            if (statusClickTimer) {
                clearTimeout(statusClickTimer);
            }
            statusClickTimer = setTimeout(() => {
                statusClickCount = 0;
            }, 2000); // Reset after 2 seconds of inactivity
            if (statusClickCount === 6) {
                window.location.href = "gallery-of-secrets.html";
                statusClickCount = 0;
                clearTimeout(statusClickTimer);
            }
        });
    }

    // Page-specific animations, but not for the secret gallery
    if (!window.location.pathname.includes('gallery-of-secrets.html')) {
        const pageIdentifiers = {
            '.data-grid': '.data-card',
            '.dossier-section': '.dossier-section',
            '.case-grid': '.case-card',
            '.entry-grid': '.entry-card',
            '.contact-form': '.content-section',
            '.evidence-grid': '.evidence-card',
            '.member-grid': '.member-card',
            '.oracle-section': '.oracle-section'
        };

        const animations = [
            'fade-in-up',
            'fade-in-down',
            'fade-in-left',
            'fade-in-right'
        ];

        let cards = [];
        for (const containerSelector in pageIdentifiers) {
            if (document.querySelector(containerSelector)) {
                const cardSelector = pageIdentifiers[containerSelector];
                cards = document.querySelectorAll(cardSelector);
                break;
            }
        }

        if (cards.length > 0) {
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            cards.forEach((card, index) => {
                // Add a class that sets the base animation properties.
                // The animation-name is set dynamically, and the delay is staggered.
                card.classList.add('animate-on-load');
                card.style.animationName = randomAnimation;
                card.style.animationDelay = `${100 * index}ms`;
            });
        }
    }
});
