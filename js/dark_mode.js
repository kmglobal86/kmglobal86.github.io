const toggle = document.getElementById('toggleDark');
const html = document.documentElement;

function applyTheme(isDark) {
    if (isDark) {
        html.classList.add('dark-mode');
        if (toggle) {
            toggle.classList.remove('bi-brightness-high-fill');
            toggle.classList.add('bi-moon');
        }
    } else {
        html.classList.remove('dark-mode');
        if (toggle) {
            toggle.classList.remove('bi-moon');
            toggle.classList.add('bi-brightness-high-fill');
        }
    }
}

const stored = localStorage.getItem('theme');
if (stored === 'dark') {
    applyTheme(true);
} else if (stored === 'light') {
    applyTheme(false);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme(true);
} else {
    applyTheme(false);
}

if (toggle) {
    toggle.addEventListener('click', function () {
        const isDark = html.classList.contains('dark-mode');
        applyTheme(!isDark);
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
}
