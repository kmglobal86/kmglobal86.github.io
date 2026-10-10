document.addEventListener('DOMContentLoaded', function () {
    // Get all Bio links in navbar and mobile menu
    const bioLinks = document.querySelectorAll('a[href="#Bio"]');
    
    bioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            animatedScrollTo(0, 800);
            
            // Update URL hash
            history.pushState(null, null, '#Bio');
            
            // Trigger hashchange event for navbar active state
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        });
    });
});
