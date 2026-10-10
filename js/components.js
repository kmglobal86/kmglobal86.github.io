class SiteNavbar extends HTMLElement {
    connectedCallback() {
        const isHome = window.location.pathname === '/' ||
            window.location.pathname.endsWith('/index.html') ||
            window.location.pathname === '';
        const prefix = isHome ? '' : '/';

        this.innerHTML = `
<nav class="navbar">
    <div class="navbar-container">
        <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <a href="${prefix}#Bio" class="nav-link nav-desktop">Bio</a>
        <span class="navbar-separator">|</span>
        <a href="${prefix}#Experience" class="nav-link">Experience</a>
        <span class="navbar-separator">|</span>
        <a href="${prefix}#Education" class="nav-link">Education</a>
        <span class="navbar-separator">|</span>
        <a href="${prefix}#Project" class="nav-link">Project</a>
        <span class="navbar-separator">|</span>
        <a href="${prefix}#Technical_Skill" class="nav-link nav-desktop">Technical Skill</a>
        <span class="navbar-separator">|</span>
        <a href="${prefix}#Research" class="nav-link nav-desktop">Research</a>
        <span class="navbar-separator">|</span>
        <a href="${prefix}#Miscellaneous" class="nav-link nav-desktop">Miscellaneous</a>
    </div>
    <div class="mobile-menu" id="mobileMenu">
        <a href="${prefix}#Bio">Bio</a>
        <a href="${prefix}#Research">Research</a>
        <a href="${prefix}#Technical_Skill">Technical Skill</a>
        <a href="${prefix}#Miscellaneous">Miscellaneous</a>
    </div>
</nav>`;
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<div class="popup-overlay">
    <div class="popup-content">
        <button class="popup-close" aria-label="Close message form">&times;</button>
        <h2>Anonymous Message</h2>
        <form action="https://formsubmit.co/ajax/YOUR_FORMSUBMIT_HASH" method="post">
            <input type="hidden" name="_captcha" value="true">
            <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off">
            <div class="form-group">
                <label for="popup-name">Name</label>
                <input type="text" id="popup-name" name="name" placeholder="Any name you want me to call you">
            </div>
            <div class="form-group">
                <label for="popup-email">Email</label>
                <input type="email" id="popup-email" name="email" placeholder="If you want me to reply">
            </div>
            <div class="form-group textarea-group">
                <label for="popup-message">Message (required)</label>
                <textarea id="popup-message" name="message" placeholder="Say all the things you want" required></textarea>
            </div>
            <div class="form-group">
                <input type="submit" value="Send">
            </div>
        </form>
    </div>
</div>
<footer style="background-color:rgba(0,0,0,0.05);padding:10px 15px;text-align:center;margin-top:15px;">
    <p style="margin:8px 0;font-size:0.95em;">
          <a href="/social" id="footerSocialLink" style="font-weight:bold;text-decoration:underline;">Social Media</a>
        &nbsp;|&nbsp;
          <a href="#" id="anonymousMessageFooterLink" style="font-weight:bold;text-decoration:underline;">Anonymous Message</a>
        &nbsp;|&nbsp;
        <a href="https://github.com/your-username/your-repo" target="_blank" rel="noopener noreferrer" style="font-weight:bold;text-decoration:underline;">Source Code</a>
    </p>
    <p style="margin:8px 0;font-size:0.85em;color:#666;">
        <span id="lastModified">Last Modified: —</span>
    </p>
</footer>`;

        document.getElementById('footerSocialLink').addEventListener('click', function () {
            sessionStorage.setItem('scrollFromBottom', '1');
        });
    }
}

customElements.define('site-navbar', SiteNavbar);
customElements.define('site-footer', SiteFooter);
