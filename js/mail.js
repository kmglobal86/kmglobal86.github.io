document.addEventListener('DOMContentLoaded', function () {
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupClose = document.querySelector('.popup-close');
    const anonymousMessageFooterLink = document.querySelector('#anonymousMessageFooterLink');
    const form = document.querySelector('.popup-content form');
    if (!form) return;
    const submitButton = form.querySelector('input[type="submit"]');

    function openPopup() {
        popupOverlay.classList.add('is-open');
        const firstFocusable = popupOverlay.querySelector('input, textarea, button');
        if (firstFocusable) firstFocusable.focus();
    }

    function closePopup() {
        popupOverlay.classList.remove('is-open');
        form.reset();
        submitButton.value = 'Send';
        submitButton.disabled = false;
        if (anonymousMessageFooterLink) anonymousMessageFooterLink.focus();
    }

    // Handle click for footer link
    if (anonymousMessageFooterLink) {
        anonymousMessageFooterLink.addEventListener('click', function (event) {
            event.preventDefault();
            openPopup();
        });
    }

    popupClose.addEventListener('click', closePopup);

    window.addEventListener('click', function (event) {
        if (event.target === popupOverlay) {
            closePopup();
        }
    });

    // Trap focus within popup
    popupOverlay.addEventListener('keydown', function (event) {
        if (!popupOverlay.classList.contains('is-open')) return;
        if (event.key === 'Escape') {
            closePopup();
            return;
        }
        if (event.key !== 'Tab') return;
        const focusable = Array.from(popupOverlay.querySelectorAll('input, textarea, button, [tabindex]:not([tabindex="-1"])'))
            .filter(el => !el.disabled && el.offsetParent !== null);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey) {
            if (document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        submitButton.value = 'Sending…';
        submitButton.disabled = true;
        const formData = new FormData(form);
        fetch('https://formsubmit.co/ajax/YOUR_FORMSUBMIT_HASH', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                form.reset();
                submitButton.value = 'Delivered';
                setTimeout(closePopup, 1500);
            } else {
                submitButton.value = 'Send';
                submitButton.disabled = false;
            }
        })
        .catch(() => {
            submitButton.value = 'Send';
            submitButton.disabled = false;
        });
    });
});
