document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
        });

        // Close menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                
                // Remove focus and blur to prevent persistent highlighting on mobile
                this.blur();
                
                // On touch devices, prevent the hover state from sticking
                if ('ontouchstart' in window) {
                    e.currentTarget.style.background = 'transparent';
                    setTimeout(() => {
                        e.currentTarget.style.background = '';
                    }, 300);
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Handle viewport changes (desktop mode toggle) - use matchMedia to avoid forced reflow
        const mobileBreakpoint = window.matchMedia('(max-width: 1024px)');
        
        function handleViewportChange(e) {
            // Close mobile menu when switching from mobile to desktop view
            if (!e.matches) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
        
        // Modern approach using matchMedia listener (no forced reflow)
        if (mobileBreakpoint.addEventListener) {
            mobileBreakpoint.addEventListener('change', handleViewportChange);
        } else {
            // Fallback for older browsers
            mobileBreakpoint.addListener(handleViewportChange);
        }
    }
});
