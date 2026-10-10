function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animatedScrollTo(targetPos, duration) {
    var startPos = window.scrollY;
    var distance = targetPos - startPos;
    var startTime = null;

    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        var elapsed = currentTime - startTime;
        var progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startPos + distance * easeInOutCubic(progress));
        if (elapsed < duration) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

document.addEventListener('DOMContentLoaded', function () {
    const sectionLinks = document.querySelectorAll('a[href^="#"]:not([href="#Bio"])');
    const navbar = document.querySelector('.navbar');

    let navbarHeight = 48;
    if (navbar) {
        navbarHeight = navbar.offsetHeight;
    }

    sectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            this.blur();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const top = Math.max(0, targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20);
                animatedScrollTo(top, 800);

                history.pushState(null, null, '#' + targetId);
                window.dispatchEvent(new HashChangeEvent('hashchange'));
            }
        });
    });
});
