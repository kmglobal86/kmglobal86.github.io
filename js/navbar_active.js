document.addEventListener('DOMContentLoaded', function () {
    // Get all section headings with IDs and navbar links
    const sectionIds = ['Bio', 'Experience', 'Education', 'Project', 'Research', 'Technical_Skill', 'Miscellaneous'];
    const navLinks = document.querySelectorAll('.navbar a[href^="#"], .mobile-menu a[href^="#"]');

    // Function to remove active class from all links
    function removeAllActive() {
        navLinks.forEach(link => {
            link.classList.remove('active-section');
        });
    }

    // Function to add active class to matching links
    function setActiveLink(sectionId) {
        removeAllActive();
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + sectionId) {
                link.classList.add('active-section');
            }
        });
    }

    // Track which sections are currently visible (based on bottom indicators)
    const visibleSections = new Set();
    
    // Track which section headers are visible
    const visibleHeaders = new Set();
    
    // Function to determine the active section
    function determineActiveSection() {
        // If at the very top of the page, always show Bio
        if (window.scrollY < 50) {
            setActiveLink('Bio');
            return;
        }
        
        // Prioritize visible headers (the section we're currently viewing)
        if (visibleHeaders.size > 0) {
            // Get the LAST visible header (closest to current scroll position)
            const visibleHeadersList = sectionIds.filter(id => {
                // For Bio, check Bio-header instead
                if (id === 'Bio') {
                    return visibleHeaders.has('Bio-header');
                }
                return visibleHeaders.has(id);
            });
            const lastVisibleHeader = visibleHeadersList[visibleHeadersList.length - 1];
            if (lastVisibleHeader) {
                setActiveLink(lastVisibleHeader);
                return;
            }
        }
        
        // Fallback: Check which section we're actually in based on scroll position
        // This is important for when headers aren't visible (between sections)
        // Find the section header that's closest to the top of the viewport but still visible
        let closestSection = null;
        let closestDistance = Infinity;
        
        for (let i = 0; i < sectionIds.length; i++) {
            const sectionId = sectionIds[i];
            const elementId = sectionId === 'Bio' ? 'Bio-header' : sectionId;
            const element = document.getElementById(elementId);
            
            if (element) {
                const rect = element.getBoundingClientRect();
                // Check if header is above the middle of viewport
                if (rect.top < window.innerHeight / 2) {
                    // Calculate distance from the top - we want the one closest to top (most negative or smallest positive)
                    const distance = Math.abs(rect.top - 100); // 100px is roughly navbar height + padding
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSection = sectionId;
                    }
                }
            }
        }
        
        if (closestSection) {
            setActiveLink(closestSection);
            return;
        }
        
        // If no headers visible but sections are, use the last visible section
        if (visibleSections.size > 0) {
            const lastVisibleSection = sectionIds.filter(id => visibleSections.has(id)).pop();
            if (lastVisibleSection) {
                setActiveLink(lastVisibleSection);
                return;
            }
        }
    }

    // Observer for bottom indicators (tells us which sections are in viewport)
    const bottomIndicatorObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const sectionId = entry.target.dataset.section;
            if (entry.isIntersecting) {
                visibleSections.add(sectionId);
            } else {
                visibleSections.delete(sectionId);
            }
        });
        determineActiveSection();
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0
    });

    // Observer for section headers (h2 elements)
    // Use different rootMargin for mobile vs desktop for better detection
    const mobileBreakpoint = window.matchMedia('(max-width: 1024px)');
    let headerObserver = null;

    function createHeaderObserver(isMobile) {
        if (headerObserver) {
            headerObserver.disconnect();
            visibleHeaders.clear();
        }
        headerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                const sectionId = entry.target.id;
                if (entry.isIntersecting) {
                    visibleHeaders.add(sectionId);
                } else {
                    visibleHeaders.delete(sectionId);
                }
            });
            determineActiveSection();
        }, {
            root: null,
            rootMargin: isMobile ? '-60px 0px -40% 0px' : '-60px 0px -50% 0px',
            threshold: 0
        });

        const bioHeader = document.getElementById('Bio-header');
        if (bioHeader) headerObserver.observe(bioHeader);
        sectionIds.slice(1).forEach(id => {
            const header = document.getElementById(id);
            if (header) headerObserver.observe(header);
        });
    }

    createHeaderObserver(mobileBreakpoint.matches);

    if (mobileBreakpoint.addEventListener) {
        mobileBreakpoint.addEventListener('change', e => createHeaderObserver(e.matches));
    } else {
        mobileBreakpoint.addListener(e => createHeaderObserver(e.matches));
    }

    // Observe all bottom indicators
    const bottomIndicators = document.querySelectorAll('.section-bottom-indicator');
    bottomIndicators.forEach(indicator => {
        bottomIndicatorObserver.observe(indicator);
    });
    
    // Add scroll listener for top of page detection
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(determineActiveSection, 50);
    }, { passive: true });

    // Handle hash changes (when clicking links)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            setActiveLink(hash);
        }
    });

    // Add click event listeners to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Manually set active state for the clicked link
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                setActiveLink(sectionId);
            }
            
            // Blur after a short delay to prevent persistent highlighting on mobile
            setTimeout(() => {
                this.blur();
                if (document.activeElement === this) {
                    document.activeElement.blur();
                }
            }, 100);
        });
        
        // Also handle touchend for better mobile support
        link.addEventListener('touchend', function() {
            setTimeout(() => {
                this.blur();
                if (document.activeElement === this) {
                    document.activeElement.blur();
                }
            }, 100);
        }, { passive: true });
    });

    // Set initial active link based on current hash or scroll position
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        setActiveLink(hash);
    } else {
        // Set Bio as active by default
        setActiveLink('Bio');
    }
});
