document.addEventListener('DOMContentLoaded', function () {
    var targetId = window._pendingScrollHash;
    if (!targetId) {
        document.documentElement.style.visibility = 'visible';
        return;
    }

    var targetElement = document.getElementById(targetId);
    if (!targetElement) {
        document.documentElement.style.visibility = 'visible';
        return;
    }

    var navbar = document.querySelector('.navbar');
    var navbarHeight = navbar ? navbar.offsetHeight : 48;

    history.replaceState(null, '', '#' + targetId);

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // One rAF lets the browser finish any pending paint/scroll before we take over.
    requestAnimationFrame(function () {
        window.scrollTo(0, 0);
        // Reveal the page at y=0 so user sees top-of-page before animation starts.
        document.documentElement.style.visibility = 'visible';

        var targetPos = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
        targetPos = Math.max(0, targetPos);

        var duration = 800;
        var startTime = null;

        function animate(currentTime) {
            if (startTime === null) startTime = currentTime;
            var elapsed = currentTime - startTime;
            var progress = Math.min(elapsed / duration, 1);
            // Drives scroll on every frame — immune to browser fragment-scroll interruption.
            window.scrollTo(0, targetPos * easeInOutCubic(progress));
            if (elapsed < duration) requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    });
});
