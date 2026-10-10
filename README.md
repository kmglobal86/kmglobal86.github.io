# Easy Portfolio Website Template

A fast, clean, and fully responsive personal academic/developer portfolio template built with pure HTML, CSS, and a small amount of JavaScript. No build step, no framework, no dependencies to install — just static files served directly from GitHub Pages.

**Inspired by:** [Jon Barron's website](https://github.com/jonbarron/website)

**Live Demo:** [https://badhon495.github.io](https://badhon495.github.io)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture & Workflow](#2-architecture--workflow)
3. [Technologies & Dependencies](#3-technologies--dependencies)
4. [File & Folder Documentation](#4-file--folder-documentation)
   - [Root Files](#41-root-files)
   - [css/ — Stylesheets](#42-css--stylesheets)
   - [js/ — JavaScript Modules](#43-js--javascript-modules)
   - [images/ — Assets](#44-images--assets)
   - [data/ — Documents](#45-data--documents)
5. [index.html — Deep Dive](#5-indexhtml--deep-dive)
6. [social.html — Deep Dive](#6-socialhtml--deep-dive)
7. [Optimization Analysis](#7-optimization-analysis)
8. [Setup & Installation](#8-setup--installation)
9. [Configuration Guide](#9-configuration-guide)
10. [Deployment](#10-deployment)
11. [Environment Variables](#11-environment-variables)
12. [Troubleshooting](#13-troubleshooting)
13. [Maintenance Recommendations](#14-maintenance-recommendations)
14. [Cleanup & Removal Guide](#15-cleanup--removal-guide)

---

## 1. Project Overview

This is a **personal portfolio website template** designed for academics, students, and developers who want a clean, professional online presence that loads fast and works everywhere. The design philosophy prioritizes:

- **Zero build complexity** — no Node.js, no Webpack, no compilation step. Edit HTML and push.
- **Performance-first** — preloaded critical resources, minified CSS, deferred non-critical scripts, passive event listeners.
- **Accessibility** — skip links, ARIA attributes, semantic HTML, keyboard-navigable modals, focus traps.
- **SEO-ready** — structured data (JSON-LD), Open Graph, Twitter Cards, sitemap, robots.txt, canonical URLs.
- **PWA support** — web app manifest, theme color, and app icons so users can install the site.

The site has two pages:

| Page | URL | Purpose |
|---|---|---|
| Main Portfolio | `/` | Bio, experience, education, projects, skills, research, misc |
| Social Media | `/social` | A curated list of social platform profile links |

---

## 2. Architecture & Workflow

```
Browser Request
      │
      ▼
GitHub Pages (static hosting) or Netlify
      │
      ├── index.html    ← Entry point, loads CSS + JS, renders sections
      ├── social.html   ← Secondary page, same navbar/footer via components.js
      │
      ├── css/stylesheet.min.css   ← Loaded immediately (render-critical)
      ├── css/mail.css             ← Deferred (loaded only after page paint)
      │
      ├── js/components.js         ← Loaded synchronously; defines <site-navbar> and <site-footer>
      └── js/*.js                  ← All other scripts loaded with `defer`
```

**Rendering pipeline for `index.html`:**

1. Browser receives HTML. Inline `<script>` at top of `<head>` immediately applies dark/light mode class to `<html>` to prevent flash (FOUC).
2. `components.js` is loaded synchronously and defines two Custom Elements: `<site-navbar>` and `<site-footer>`. These expand into full HTML the moment the browser parses those tags in `<body>`.
3. `stylesheet.min.css` is preloaded and applied — renders the page layout.
4. `mail.css` is deferred using the `media="print"` trick and switched to `all` on load — avoids blocking render.
5. Bootstrap Icons CSS is similarly deferred.
6. All remaining JS files run after the DOM is ready (`defer` attribute).
7. `dark_mode.js` re-syncs the theme toggle icon state after the DOM is ready.

---

## 3. Technologies & Dependencies

| Technology | Version / Source | Role |
|---|---|---|
| HTML5 | Native | Page structure and semantics |
| CSS3 | Native | Layout, theming, animations |
| JavaScript (ES6+) | Native | Interactivity, scroll behavior, theme |
| Lato (Google Fonts) | v15 via `fonts.gstatic.com` | Primary typeface, self-hosted via `@font-face` |
| Bootstrap Icons | `@1.11.3` via jsDelivr CDN | Icons (moon, sun, social platform icons) |
| FormSubmit.co | External service | Backend for the anonymous message form |
| Web Components API | Native browser API | Reusable `<site-navbar>` and `<site-footer>` |
| IntersectionObserver API | Native browser API | Scroll-based active navbar section tracking |
| localStorage | Native browser API | Persisting the dark/light mode preference |
| sessionStorage | Native browser API | Cross-page scroll animation trigger |

**No npm packages are installed. No package.json exists. No build step is required.**

---

## 4. File & Folder Documentation

### 4.1 Root Files

#### `index.html`
- **What it does:** The main portfolio page. Contains all major content sections: Bio, Experience, Education, Project, Technical Skill, Research, and Miscellaneous.
- **Why it exists:** Entry point of the site. Every visitor lands here by default.
- **Status:** Critical — do not remove.
- **Dependencies:** Loads all CSS and JS files. Renders `<site-navbar>` and `<site-footer>` via `components.js`.
- **See also:** [Section 5 — index.html Deep Dive](#5-indexhtml--deep-dive)

---

#### `social.html`
- **What it does:** A standalone page at `/social` listing links to 10 social media profiles. Includes a smooth "scroll from bottom" animation when navigated from the footer link.
- **Why it exists:** Keeps the social links separate from the main portfolio, reducing clutter and giving them their own shareable URL.
- **Status:** Optional — safe to remove if you do not want a dedicated social page.
- **Dependencies:** Shares `components.js`, `stylesheet.min.css`, `mail.css`, Bootstrap Icons. Contains inline CSS for the social grid (not shared).
- **Special behavior:** The `---\npermalink: /social\n---` frontmatter at the top is a Jekyll directive (used by GitHub Pages with Jekyll) to route this file to `/social` instead of `/social.html`.
  - **If you are NOT using Jekyll**, you can remove the frontmatter block or host via `serve.json` clean URLs.
- **Removal impact:**
  - Positive: Removes one page to maintain; footer Social Media link will 404.
  - Negative: Visitors who bookmarked `/social` will get a broken link.
  - **Before removing:** Update or remove the "Social Media" link in `js/components.js` footer.

---

#### `README.md`
- **What it does:** This file. Project documentation for developers and template users.
- **Why it exists:** Explains the project for anyone who forks or clones the repository.
- **Status:** Optional for deployment (not served to visitors). Safe to edit freely.
- **Removal impact:** GitHub repository will have no README displayed, making the project harder to understand for contributors.

---

#### `robots.txt`
- **What it does:** Tells web crawlers (Google, Bing, etc.) which pages they are allowed to index.
- **Why it exists:** SEO best practice. Currently allows all crawlers to index everything (`Disallow:` is empty).
- **Status:** Important for SEO. Do not remove.
- **Customization required:** Replace `your-username` in the `Sitemap:` URL with your actual GitHub Pages username.

```
User-agent: *
Disallow:
Sitemap: https://your-username.github.io/sitemap.xml
```

---

#### `sitemap.xml`
- **What it does:** An XML file listing all pages on the site with their priority and last-modified date. Used by search engines to efficiently discover and index content.
- **Why it exists:** Improves crawlability and helps search engines prioritize pages. The `/` page has priority `1.00`, `/social` has priority `0.80`.
- **Status:** Important for SEO. Do not remove.
- **Customization required:** Replace `your-username` with your GitHub Pages username. Update `<lastmod>` dates when content changes significantly.

---

#### `site.webmanifest`
- **What it does:** The Web App Manifest. Enables browsers to treat the site as a Progressive Web App (PWA), allowing users to install it on their home screen.
- **Why it exists:** Improves mobile experience and enables the "Add to Home Screen" prompt on Android.
- **Status:** Optional but beneficial for mobile users. Safe to remove if PWA support is not desired.
- **Customization required:** Replace `[Your Name]`, `[Short Name]`, and `[Your brief description]` with real values.
- **Removal impact:** Loss of PWA installation capability; `<link rel="manifest">` in HTML will 404 (harmless but adds a console warning).

---

#### `_headers`
- **What it does:** A Netlify-specific configuration file that sets HTTP response headers for specific file paths. Currently disables caching for all PDF files under `/data/`.
- **Why it exists:** Ensures that when you replace your resume PDF (`data/demo.pdf`), visitors always download the latest version instead of a browser-cached old version.
- **Status:** Critical if deploying to **Netlify**. Has no effect on GitHub Pages.
- **Removal impact (GitHub Pages):** Safe to remove — GitHub Pages ignores this file entirely. However, keeping it does no harm.
- **Removal impact (Netlify):** PDFs will be cached by browsers and CDN. Visitors may see stale resume versions until cache expires.

```
/data/demo.pdf
  Cache-Control: no-cache, no-store, must-revalidate
```

---

#### `serve.json`
- **What it does:** Configuration for the `serve` npm package (a local static file server). Sets `cleanUrls: true` so `/social.html` is accessible as `/social` locally.
- **Why it exists:** Allows local development to mirror the clean URL behavior of GitHub Pages + Jekyll.
- **Status:** Development convenience tool. Safe to remove if you never use `npx serve` locally.
- **Removal impact:** No production impact. Local testing with `serve` will require visiting `/social.html` explicitly instead of `/social`.

---

#### `browserconfig.xml`
- **What it does:** Defines the tile image and color for Windows tiles (used when pinning the site to the Windows Start menu or taskbar via Internet Explorer / Edge Legacy).
- **Why it exists:** Provides a branded tile appearance on Windows systems.
- **Status:** Optional. Relevant only for users on older Windows browsers. Safe to remove for most modern audiences.
- **Removal impact:** Pinned Windows Start menu tiles will show a generic icon instead of the branded tile. The `<meta name="msapplication-config">` tag in HTML will produce a 404 (harmless console warning).

---

#### `.gitignore`
- **What it does:** Tells Git to ignore the `.vscode/` folder (VS Code editor settings and workspace files).
- **Why it exists:** Keeps editor-specific configuration out of version control so team members are not forced to use VS Code settings.
- **Status:** Standard. Do not remove.

---

#### `favicon.ico`
- **What it does:** The classic browser tab icon in ICO format, used by all browsers.
- **Why it exists:** Required for the browser tab, bookmarks, and history entries. Legacy format with the widest compatibility.
- **Status:** Critical for branding.
- **Customization:** Replace with your own favicon. Generate all formats at [realfavicongenerator.net](https://realfavicongenerator.net).

---

#### `favicon.svg`
- **What it does:** SVG version of the favicon. Used by modern browsers (Chrome 80+, Firefox 41+) in preference over `.ico`.
- **Why it exists:** SVGs are resolution-independent and can adapt to dark mode via CSS `prefers-color-scheme`.
- **Status:** Recommended. The site references it as the primary icon.

---

#### `favicon-16x16.png` and `favicon-32x32.png`
- **What they do:** PNG fallback favicons for browsers that do not support SVG favicons.
- **Status:** Recommended for cross-browser compatibility.

---

### 4.2 `css/` — Stylesheets

#### `css/stylesheet.css`
- **What it does:** The full, human-readable source stylesheet for the entire site. Contains all theming, layout, navbar, hamburger menu, and responsive breakpoint styles.
- **Why it exists:** Development source file. Easier to read and edit than the minified version.
- **Status:** Development file. Not loaded directly in production HTML — `stylesheet.min.css` is loaded instead.
- **Removal impact:** Safe to remove for pure deployment, but **strongly recommended to keep** for future edits. Without it, modifying styles means editing the minified file directly.
- **Key sections:**
  - Dark mode variables (`html.dark-mode`)
  - `@font-face` rules for Lato (8 variants — regular, bold, italic, bold-italic × latin + latin-ext)
  - Navbar styles (fixed positioning, blur effect, active section indicator, dark mode variants)
  - Hamburger menu (animated X transformation, slide-down mobile menu)
  - Responsive breakpoints: `≤1024px` (hamburger), `≤800px` (section padding), `≤480px` (mobile layout)
  - `.section-bottom-indicator` (invisible 1px element used by `IntersectionObserver`)
  - `.skip-link` (hidden until focused — accessibility)
  - `.hoverZoomLink` (1.05 scale on hover for profile image)
  - Touch device overrides (`@media (hover: none) and (pointer: coarse)`)

---

#### `css/stylesheet.min.css`
- **What it does:** The minified, production-ready version of `stylesheet.css`. This is the file actually loaded by the browser.
- **Why it exists:** Smaller file size = faster page loads. Reduces CSS payload from ~14.7 KB to ~11.5 KB (~22% smaller).
- **Status:** Critical — this is what the browser loads. Do not remove.
- **Important:** Whenever you edit `stylesheet.css`, you must also regenerate `stylesheet.min.css`. You can use an online tool like [cssminifier.com](https://www.cssminifier.com) or a CLI tool like `cleancss`.

```bash
# Regenerate minified CSS (requires clean-css-cli)
npx cleancss -o css/stylesheet.min.css css/stylesheet.css
```

---

#### `css/mail.css`
- **What it does:** Styles the anonymous message popup modal. Includes the overlay, slide-in animation, form fields, labels, submit button, and dark mode variants.
- **Why it exists:** Separated from `stylesheet.css` so it can be deferred (loaded after the page paints) — it is not needed until the user clicks "Anonymous Message".
- **Status:** Required if you are using the anonymous message form. Safe to remove if you remove the form feature entirely.
- **Loading strategy:** Loaded using the `media="print"` deferred loading trick in `index.html`:
  ```html
  <link rel="stylesheet" href="css/mail.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="css/mail.css"></noscript>
  ```
  This ensures `mail.css` does not block the initial render.
- **Key CSS features:**
  - `fadeIn` and `slideIn` keyframe animations for modal entrance
  - `clamp()` for fluid padding that adapts between mobile and desktop
  - Focus state with green border and box shadow on inputs
  - Submit button with gradient and uppercase style
  - Full dark mode color scheme (`rgba(36, 39, 58, 0.9)` overlay)

---

### 4.3 `js/` — JavaScript Modules

All JavaScript files except `components.js` use the `defer` attribute, meaning they execute after the HTML is fully parsed but before `DOMContentLoaded` fires. This prevents JavaScript from blocking page rendering.

---

#### `js/components.js`
- **What it does:** Defines two Custom Web Component elements: `<site-navbar>` and `<site-footer>`. When the browser encounters these tags in the HTML, this script expands them into full navbar and footer HTML.
- **Why it exists:** Avoids duplicating the navbar and footer HTML across `index.html` and `social.html`. A change to the navbar only needs to happen in one place.
- **Status:** Critical. The entire navigation and footer depend on this file.
- **Load order:** Loaded **synchronously** (no `defer`) at the top of `<head>` so the elements are registered before the browser parses the `<body>`. This prevents a flash of undefined elements.
- **Customization required:**
  - Replace `YOUR_FORMSUBMIT_HASH` in the form `action` attribute.
  - Replace `https://github.com/your-username/your-repo` with your actual repository URL.
- **Smart prefix detection:** Detects whether it is on the home page or a sub-page and adjusts all anchor `href` values accordingly:
  - On `/` → `href="#Bio"` (no prefix)
  - On `/social` → `href="/#Bio"` (navigates back to home first)
- **Mobile menu discrepancy:** The desktop navbar shows: Bio, Experience, Education, Project, Technical Skill, Research, Miscellaneous. The mobile menu (hamburger) shows only: Bio, Research, Technical Skill, Miscellaneous. Experience, Education, and Project are hidden on mobile to reduce clutter.

---

#### `js/mail.js`
- **What it does:** Manages the anonymous message popup form — opening, closing, focus trapping, form submission via AJAX, and button state management.
- **Why it exists:** Handles all the UX around the contact form without a page reload.
- **Status:** Required if the anonymous message form is used. Remove alongside the form HTML in `components.js` if you do not want this feature.
- **Customization required:** Replace `YOUR_FORMSUBMIT_HASH` in the `fetch()` call URL.
- **Key behaviors:**
  - Opens popup and focuses the first input on click
  - Closes on: Escape key, overlay background click, or close button click
  - Implements a **focus trap** — Tab key cycles only through elements inside the popup
  - On submit: button changes to "Sending…" and is disabled to prevent double-submit
  - On success: button changes to "Delivered", form resets, popup closes after 1.5 seconds
  - On failure: button reverts to "Send" and re-enables

---

#### `js/navbar_active.js`
- **What it does:** Tracks which section is currently in the viewport and highlights the corresponding navbar link with the `.active-section` class.
- **Why it exists:** Gives users visual feedback about where they are on the page as they scroll.
- **Status:** Optional but important for UX. Safe to remove if you prefer a static navbar.
- **How it works (dual IntersectionObserver strategy):**
  1. **Header Observer** — Watches each section's `<h2>` heading. When a heading enters the viewport, its section becomes the active candidate.
  2. **Bottom Indicator Observer** — Watches invisible `<div class="section-bottom-indicator">` elements placed at the bottom of each section. Used as a fallback when the heading has scrolled out of view.
  3. **Scroll position fallback** — If neither observer has a match, calculates which heading is closest to the top of the viewport.
- **Mobile adaptation:** Uses different `rootMargin` values for screens ≤1024px vs. larger screens for better detection accuracy.
- **Performance:** Scroll listener is **debounced** (50ms timeout) and uses `{ passive: true }` to avoid blocking the scroll thread.

---

#### `js/hamburger.js`
- **What it does:** Handles the mobile hamburger menu button — toggling the menu open/closed, closing it on link click or outside click, and updating ARIA attributes.
- **Why it exists:** Mobile navigation requires a collapsible menu since the full navbar does not fit on small screens.
- **Status:** Required for mobile usability. Safe to remove only if you redesign the navbar to not use a hamburger.
- **Accessibility:** Updates `aria-expanded` on the hamburger button so screen readers announce the state correctly.
- **Touch device optimization:** Removes the persistent hover highlight on touch devices by briefly resetting background color after a menu link is tapped.
- **Viewport change handling:** Uses `matchMedia('(max-width: 1024px)')` instead of `resize` event to avoid forced reflow on every resize.

---

#### `js/dark_mode.js`
- **What it does:** Manages the dark/light theme toggle button. Reads from `localStorage`, applies the theme, updates the toggle icon, and saves the preference when changed.
- **Why it exists:** Provides the theme toggle UI behavior. The initial theme is already applied by inline script in `<head>` to prevent flash — this file handles the button interaction after the DOM is ready.
- **Status:** Required for the dark mode feature. Safe to remove if you want a single fixed theme.
- **Theme persistence:** Saves to `localStorage` under the key `theme` with values `'dark'` or `'light'`.
- **System preference fallback:** If no saved preference exists, checks `prefers-color-scheme: dark` media query.
- **Note:** The `toggleDark` button element must exist in the DOM. Currently this button is **not present** in `components.js` — if you want the toggle button visible, you must add it to the navbar HTML in `components.js`.

---

#### `js/navbar_scroll.js`
- **What it does:** Hides the navbar when the user scrolls down, and reveals it when they scroll up or reach the top of the page.
- **Why it exists:** Maximizes reading space on small screens by hiding the navbar when it is not needed.
- **Status:** Optional. Remove if you prefer the navbar to always be visible.
- **Threshold:** Only triggers if the scroll delta is more than 5px, preventing jitter from micro-scrolls.
- **Performance:** Uses `{ passive: true }` on the scroll event listener.

---

#### `js/bio_scroll.js`
- **What it does:** Intercepts clicks on the "Bio" navbar link and smoothly scrolls to the top of the page instead of jumping.
- **Why it exists:** The Bio section is at the top of the page (`y=0`). Clicking "Bio" should feel like the other section links — a smooth animated scroll.
- **Status:** Optional. Without it, clicking "Bio" jumps instantly to the top.
- **Side effect:** Dispatches a `hashchange` event after scrolling so `navbar_active.js` correctly updates the active link to "Bio".

---

#### `js/smooth_scroll.js`
- **What it does:** Intercepts clicks on all section anchor links (except `#Bio`) and replaces the browser's default instant jump with a smooth scroll that accounts for the fixed navbar height.
- **Why it exists:** The fixed navbar would overlap the section heading if the browser used its default fragment scroll. This script offsets the final position by the navbar height plus 20px padding.
- **Status:** Required for correct scroll-to-section behavior with a fixed navbar.
- **How it works:** Uses `window.scrollTo({ top, behavior: 'smooth' })` with the target's `getBoundingClientRect().top` offset by navbar height.

---

#### `js/cross_page_scroll.js`
- **What it does:** Handles the case where a visitor arrives at the page with a URL hash (e.g., `/index.html#Project`). Instead of the browser jumping instantly to the section, this script animates from the top of the page to the target section using a cubic easing function.
- **Why it exists:** The browser's default hash scroll happens before JavaScript runs, which clashes with the fixed navbar offset and creates a jarring jump. This script takes over by hiding the page, stripping the hash from the URL on load, then performing a smooth animated scroll after the page is ready.
- **Status:** Required for smooth deep-link navigation (links from other pages or external sources).
- **Animation:** Uses `easeInOutCubic` over 800ms, driven by `requestAnimationFrame`.
- **Coordination with `index.html`:** The inline script in `<head>` sets `window._pendingScrollHash` and hides the page with `visibility: hidden`. This script reads that value and reveals the page once the animation is ready.

---

#### `js/last_modified.js`
- **What it does:** Reads `document.lastModified` (a browser-provided string of when the HTML file was last modified on the server) and displays it in the footer element `#lastModified`.
- **Why it exists:** Lets visitors know how recently the portfolio content was updated.
- **Status:** Optional. Safe to remove; the footer will then show "Last Modified: —" permanently (or you can remove the `<span id="lastModified">` from `components.js`).
- **Known limitation:** On GitHub Pages, `document.lastModified` reflects the HTTP `Last-Modified` header, which GitHub Pages sets based on the file's last commit date. It may not always be accurate if only a non-HTML file changed.

---

### 4.4 `images/` — Assets

#### `images/avatar.webp`
- **What it does:** The profile photo displayed prominently in the Bio section on both `index.html` and `social.html`.
- **Why it exists:** Personal branding. It is the visual centerpiece of the portfolio.
- **Status:** Critical — this is a placeholder. You must replace it with your own photo.
- **Format:** WebP is chosen for its superior compression (typically 25–35% smaller than JPEG at the same quality).
- **Dimensions:** Displayed at 300×300px, clipped as a circle (`border-radius: 50%`).
- **Preloaded:** Declared in `<head>` with `<link rel="preload">` so it downloads in parallel with other resources.
- **Performance attributes:** `loading="eager"`, `fetchpriority="high"`, explicit `width="300" height="300"` to prevent layout shift.

---

#### `images/android-chrome-192x192.png` and `images/android-chrome-512x512.png`
- **What they do:** App icons for Android Chrome. Used when the site is added to the home screen.
- **Referenced in:** `site.webmanifest` and `index.html`/`social.html` favicon declarations.
- **Status:** Required for PWA/home screen installation to look correct.

---

#### `images/apple-touch-icon.png`
- **What it does:** The icon shown on iOS home screens when a user adds the site to their home screen via Safari.
- **Status:** Recommended. Without it, iOS will use a screenshot of the page instead.

---

#### `images/mstile-150x150.png`
- **What it does:** The icon image used for Windows Live Tiles (pinned to the Start menu).
- **Referenced in:** `browserconfig.xml` and `<meta name="msapplication-TileImage">` in HTML.
- **Status:** Optional. Relevant only for Windows users who pin sites to their Start menu via IE/Edge Legacy.

---

### 4.5 `data/` — Documents

#### `data/demo.pdf`
- **What it does:** A placeholder resume PDF linked from the "Resume" button in the Bio section.
- **Why it exists:** Provides a downloadable resume for potential employers or collaborators.
- **Status:** Placeholder — replace with your actual resume before going live.
- **Customization:** Replace `data/demo.pdf` with your actual resume file. Update the link in `index.html`:
  ```html
  <a href="data/YourName_Resume.pdf">Resume</a>
  ```
- **Caching:** The `_headers` file disables browser and CDN caching for all files in `/data/*.pdf`, so updating the file ensures visitors always get the latest version (on Netlify).

---

## 5. `index.html` — Deep Dive

### 5.1 Role in the Project

`index.html` is the entry point of the entire website. Every section of the portfolio — profile, bio, experience, education, projects, skills, research, and miscellaneous — lives inside this single file. The HTML is fully static; no server-side rendering is needed.

### 5.2 `<head>` — Section by Section

#### Theme Flash Prevention (Inline Script)
```html
<script>
    var storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia(...).matches)) {
        document.documentElement.classList.add('dark-mode');
    }
    document.documentElement.style.visibility = 'visible';
    // Hash interception for cross-page scroll animation
    if (window.location.hash) {
        history.scrollRestoration = 'manual';
        window._pendingScrollHash = window.location.hash.substring(1);
        history.replaceState(null, '', window.location.pathname + window.location.search);
        document.documentElement.style.visibility = 'hidden';
    }
</script>
```
This runs **before any CSS is applied**. It prevents two issues:
- **FOUC (Flash of Unstyled Content):** Applies dark class before paint so there is no white flash on dark-mode users' screens.
- **Default hash jump:** Captures the URL hash, hides the page, strips the hash, and hands control to `cross_page_scroll.js` for a smooth animated scroll.

#### Resource Preloading
```html
<link rel="preload" href="images/avatar.webp" as="image" type="image/webp">
<link rel="preload" href="js/components.js" as="script">
<link rel="preload" href="css/stylesheet.min.css" as="style">
<link rel="preload" href="https://fonts.gstatic.com/.../lato-regular.woff2" as="font" crossorigin>
<link rel="preload" href="https://fonts.gstatic.com/.../lato-bold.woff2" as="font" crossorigin>
```
Instructs the browser to fetch these resources with high priority as soon as it sees the HTML, before it processes the full `<head>`. This puts critical resources on the critical path early and reduces Largest Contentful Paint (LCP).

#### Deferred CSS Loading
```html
<link rel="stylesheet" href="css/mail.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="css/mail.css"></noscript>
```
The `media="print"` trick causes the browser to download `mail.css` at low priority without blocking render. Once downloaded, `onload` switches it to `media="all"`. The `<noscript>` fallback ensures users without JavaScript still get the styles.

#### Security: Content Security Policy
```html
<meta http-equiv="Content-Security-Policy"
    content="default-src 'self';
             script-src 'self' 'unsafe-inline' https://www.googletagmanager.com ...;
             style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
             ...">
```
Restricts which origins can load scripts, styles, fonts, and images. Reduces XSS risk. Note: `'unsafe-inline'` is necessary for the inline theme script and inline styles. See [Optimization Analysis](#7-optimization-analysis) for a note on this.

#### SEO Metadata
- **`<meta name="description">`** — Shown in Google search results as the page excerpt.
- **Open Graph tags** (`og:title`, `og:image`, etc.) — Control how the page appears when shared on Facebook, LinkedIn, Slack.
- **Twitter Card tags** — Control appearance on Twitter/X.
- **JSON-LD Structured Data** — Machine-readable schema that helps Google display rich results (person card, job title, university).
- **`<link rel="canonical">`** — Tells search engines the authoritative URL, preventing duplicate content issues.

### 5.3 `<body>` — Content Sections

| Section ID | HTML Tag | Purpose |
|---|---|---|
| `#main-content` | `<span>` | Accessibility skip-link target |
| `#Bio` | `<table id="Bio">` | Profile image, name, links, biography |
| `#Experience` | `<h2 id="Experience">` | Work history and open-source contributions |
| `#Education` | `<h2 id="Education">` | Degree, certifications |
| `#Project` | `<h2 id="Project">` | Portfolio projects with links and descriptions |
| `#Technical_Skill` | `<h2 id="Technical_Skill">` | Languages, frameworks, tools, databases |
| `#Research` | `<h2 id="Research">` | Thesis and course research work |
| `#Miscellaneous` | `<h2 id="Miscellaneous">` | Hackathons, competitions, events |

Each section is followed by a `<div class="section-bottom-indicator" data-section="SectionName">` — an invisible 1px element that `navbar_active.js` observes to detect when a section's bottom has scrolled through the viewport.

#### Layout Note: Tables for Layout
The page uses `<table>` elements for the main content layout (`.section`, `.profile-section`). This is an intentional nod to the original Jon Barron design. It provides a reliable centered column layout without needing Flexbox or Grid. This is not a semantic mistake — it is a deliberate historical pattern for academic CV sites.

### 5.4 Performance Optimizations Already Implemented

| Optimization | Implementation |
|---|---|
| Critical CSS preloaded | `<link rel="preload" href="stylesheet.min.css" as="style">` |
| Non-critical CSS deferred | `mail.css` and Bootstrap Icons via `media="print"` trick |
| Profile image preloaded | `<link rel="preload" href="images/avatar.webp" as="image">` |
| Font preloaded | Lato regular + bold `.woff2` preloaded with `crossorigin` |
| Eager image loading | `loading="eager"`, `fetchpriority="high"` on profile photo |
| Explicit image dimensions | `width="300" height="300"` prevents Cumulative Layout Shift (CLS) |
| Script defer | All JS except `components.js` uses `defer` |
| Passive event listeners | All scroll and touch listeners use `{ passive: true }` |
| CSS minification | `stylesheet.min.css` is 22% smaller than source |
| CDN preconnect | `<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>` |
| DNS prefetch | `<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">` |
| `will-change: transform` | Applied to navbar for GPU-accelerated hide/show animation |
| Debounced scroll handler | 50ms debounce in `navbar_active.js` prevents excessive DOM queries |
| Font display swap | `font-display: swap` in `@font-face` rules shows fallback text instantly |
| `text-rendering: optimizeSpeed` | Prevents layout shift during font loading |

### 5.5 SEO Optimizations Already Implemented

- Semantic HTML (`<h1>`, `<h2>`, `<nav>`, `<footer>`)
- Unique, descriptive `<title>` and `<meta name="description">`
- Open Graph tags for social sharing previews
- Twitter Card metadata
- JSON-LD Person schema (structured data for rich results)
- `<link rel="canonical">` (prevents duplicate content penalties)
- `sitemap.xml` with page priorities
- `robots.txt` allowing all crawlers
- Descriptive `alt` text on images
- Meaningful anchor text for links

### 5.6 Accessibility Improvements

- **Skip Link:** `<a href="#main-content" class="skip-link">` is visually hidden but appears on keyboard focus, allowing screen reader users to skip the navbar.
- **ARIA attributes:** `aria-label="Menu"` and `aria-expanded` on the hamburger button.
- **Focus trap:** The anonymous message popup traps keyboard focus inside the modal so Tab does not escape to the page behind it.
- **`focus-visible` outline:** Keyboard focus outline is suppressed for mouse clicks (`:focus`) but shown for keyboard navigation (`:focus-visible`).
- **`rel="noopener noreferrer"`** on all external links — security and performance.
- **`lang="en"`** on `<html>` — required for screen readers to use the correct language profile.

### 5.7 Remaining Optimization Opportunities

| Opportunity | Description | Impact |
|---|---|---|
| Add `loading="lazy"` to images below fold | Any image not in the initial viewport should lazy load | Reduces initial page weight |
| Replace Bootstrap Icons CDN with self-hosted | Host the icon font locally to eliminate CDN dependency and improve reliability | Minor performance, avoids CDN downtime |
| Use `navigator.sendBeacon` for analytics | If Google Analytics is added, avoid blocking page unload | Minor |
| Add `<link rel="preconnect" href="https://formsubmit.co">` | Pre-warm the FormSubmit connection so the first form submission is faster | Minor |
| Generate and serve a WebP avatar with explicit sizes | Serve smaller avatar sizes for mobile using `<img srcset>` | Reduces LTP on mobile |
| Remove `'unsafe-inline'` from CSP | Move the inline theme script to an external file with a nonce | Security improvement |

---

## 6. `social.html` — Deep Dive

### 6.1 Role in the Project

`social.html` is a standalone page at `/social` that displays a curated, visually branded list of the portfolio owner's social media profiles. It shares the same navbar and footer components as `index.html` but has its own inline CSS for the social grid (embedded in a `<style>` block in `<head>`).

### 6.2 Jekyll Frontmatter

```yaml
---
permalink: /social
---
```
This block at the top is processed by **Jekyll** (the static site generator that GitHub Pages runs automatically). It tells Jekyll to output this file at `/social` (clean URL) rather than `/social.html`.

### 6.3 Scroll Animation: "Scroll From Bottom"

When a user clicks the "Social Media" link in the footer of `index.html`, `components.js` saves a `scrollFromBottom` flag to `sessionStorage`. When `social.html` loads, it reads that flag and:

1. Instantly jumps to the very bottom of the page (hidden, `visibility: hidden`).
2. Makes the page visible.
3. Animates the scroll from bottom to top over 900ms using `easeInOutCubic`.

This creates a visually satisfying "card flip" effect suggesting you traveled from the footer to a new page.

### 6.4 Social Platform Styling

Each platform has a unique brand color applied to its icon container. All are defined in the inline `<style>` block:

```css
.icon-facebook   { background: #1877f2; }
.icon-instagram  { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
.icon-reddit     { background: #ff4500; }
.icon-discord    { background: #5865f2; }
.icon-telegram   { background: #2aabee; }
/* ... */
```

Letterboxd uses three colored dots (green, orange, blue) instead of a logo icon since Bootstrap Icons does not have a Letterboxd icon.

### 6.5 Platforms Included

| Platform | Brand Color | Icon Source |
|---|---|---|
| Facebook | `#1877f2` | Bootstrap Icons `bi-facebook` |
| Instagram | Gradient | Bootstrap Icons `bi-instagram` |
| Reddit | `#ff4500` | Bootstrap Icons `bi-reddit` |
| Discord | `#5865f2` | Bootstrap Icons `bi-discord` |
| Letterboxd | `#1c222b` | Custom 3-dot SVG |
| Pinterest | `#e60023` | Bootstrap Icons `bi-pinterest` |
| Play Games | `#1a73e8` | Unicode play symbol ▶ |
| Telegram | `#2aabee` | Bootstrap Icons `bi-telegram` |
| MyAnimeList | `#2e51a2` | Text abbreviation "MAL" |
| AniList | `#02a9ff` | Text abbreviation "AL" |

---

## 7. Optimization Analysis

### 7.1 Performance

**Strengths:**
- No JavaScript framework or library — zero bundle overhead.
- CSS minification reduces stylesheet payload by ~22%.
- `defer` on all non-critical scripts prevents render blocking.
- Passive scroll listeners avoid janking on low-end devices.
- `will-change: transform` on the navbar enables GPU compositing.
- Font preloading eliminates layout shift from font-swap.

**Opportunities:**
- **Self-host Bootstrap Icons** — The CDN has a potential latency impact. Download the font files and serve them from `/fonts/` or `/css/`.
- **Optimize avatar.webp further** — Compress with `cwebp -q 80` or similar. Consider `<img srcset>` for mobile-appropriate sizes.
- **Add HTTP/2 push or early hints** — If hosted on Cloudflare or similar, push critical assets.

### 7.2 SEO

**Strengths:**
- Full Open Graph and Twitter Card support.
- JSON-LD Person schema is present.
- Canonical URL is defined.
- Sitemap and robots.txt are configured.

**Opportunities:**
- **Update `sitemap.xml` dates** — The placeholder date `2026-01-01` should reflect actual last-modified dates.
- **Add Google Search Console verification** — The meta tag is present but commented out. Uncomment and fill in your verification code.
- **Write a more specific `<meta name="description">`** — Replace `[Your Name]` and `[Your Field]` placeholders with real content.

### 7.3 Accessibility

**Strengths:**
- Skip link implemented.
- ARIA attributes on interactive elements.
- Focus trap in the modal.
- `focus-visible` outline for keyboard users.
- Semantic HTML (`<nav>`, `<footer>`, `<h1>`, `<h2>`).

**Opportunities:**
- **Add `role="dialog"` and `aria-modal="true"` to the popup** — Screen readers will better announce the modal when opened.
- **Add `aria-labelledby` to the popup** — Point to the "Anonymous Message" `<h2>` inside the popup.
- **Ensure color contrast** — Check that link color `#1772d0` on white meets WCAG AA (4.5:1 ratio for normal text).
- **Add keyboard shortcut to close popup** — Escape key is already handled. Consider announcing it to screen reader users.

### 7.4 Security

**Strengths:**
- Content Security Policy (CSP) is defined in a `<meta>` tag.
- `referrer` policy is set to `strict-origin-when-cross-origin`.
- All external links use `rel="noopener noreferrer"`.
- FormSubmit honeypot field blocks basic bots.
- FormSubmit CAPTCHA is enabled.

**Opportunities:**
- **Move CSP to HTTP headers** — A CSP in a `<meta>` tag is less effective than an HTTP header. On GitHub Pages this is not possible, but on Netlify it can be added to `_headers`.
- **Remove `'unsafe-inline'` from `script-src`** — Move the inline theme detection script to a hashed or nonce-based external file.
- **Add `X-Frame-Options: DENY`** — Prevents the site from being embedded in iframes (clickjacking protection). Can be added to Netlify `_headers`.
- **Add `X-Content-Type-Options: nosniff`** — Prevents MIME type sniffing. Also can go in `_headers`.

### 7.5 Code Quality

**Strengths:**
- Concerns are separated: layout in HTML, styles in CSS, behavior in JS.
- Web Components eliminate navbar/footer duplication across pages.
- Each JavaScript module has a single responsibility.
- No dead code observed.

**Opportunities:**
- **The mobile menu in `components.js` has fewer links than the desktop navbar** — Bio, Research, Technical Skill, Miscellaneous are shown, but Experience, Education, and Project are missing. If this is intentional, document it. If not, add the missing links to the mobile menu.
- **Inline styles in `index.html`** — Several elements use `style="..."` attributes instead of CSS classes. Moving these to CSS improves maintainability.
- **`dark_mode.js` depends on `#toggleDark` element** — This toggle button is not currently present in the navbar HTML in `components.js`. Either the button exists hidden elsewhere, or `dark_mode.js` silently does nothing when there is no toggle button. Verify this is intentional.

### 7.6 Unused or Potentially Redundant Files

| File | Status | Notes |
|---|---|---|
| `css/stylesheet.css` | Kept intentionally | Source file for `stylesheet.min.css`; needed for future edits |
| `serve.json` | Development only | No production impact; safe to keep |
| `browserconfig.xml` | Optional | Only relevant for Windows Start menu tiles; low user impact |
| `data/demo.pdf` | Placeholder | Replace with real resume before launch |

### 7.7 Build Size Optimization

The entire project is under 200 KB (excluding the demo PDF). There is no meaningful bundle size problem. The largest single file is `data/demo.pdf` at ~96 KB.

If you want to minimize payload further:
- Replace `data/demo.pdf` with a smaller, compressed resume PDF.
- Self-host Lato font and serve only the weights you use (currently all 8 variants are declared in CSS but only Regular and Bold are preloaded).
- Consider removing Letterboxd, MyAnimeList, AniList entries from `social.html` if they are not relevant to your audience — fewer icon elements = less Bootstrap Icons usage.

---

## 8. Setup & Installation

### Prerequisites

- A [GitHub](https://github.com) account
- A text editor (VS Code recommended)
- Optionally: [Node.js](https://nodejs.org) for local serving

### Quick Start

**Step 1 — Create your repository from this template**

On this repository's GitHub page, click the green **"Use this template"** button → **"Create a new repository"**.

> Do **not** click Fork. Forking links your repo to this one (showing "forked from" on your profile). Using the template creates a clean, independent repository.

**Step 2 — Name your repository**

Set the repository name to exactly:
```
your-username.github.io
```
Replace `your-username` with your actual GitHub username (e.g. `john.github.io` if your username is `john`). This name is what makes GitHub Pages serve your site at `https://your-username.github.io`. Any other name will give you a `/repo-name` sub-path URL instead.

Set visibility to **Public** (required for free GitHub Pages hosting), then click **"Create repository"**.

**Step 3 — Clone your new repository**

```bash
git clone https://github.com/your-username/your-username.github.io.git
cd your-username.github.io
```

**Step 4 — Customize your content**

Edit the files with your personal information (see [Section 9 — Configuration Guide](#9-configuration-guide) for the full checklist).

**Step 5 — Push your changes**

```bash
git add .
git commit -m "Personalize portfolio content"
git push
```

**Step 6 — Enable GitHub Pages**

See [Section 10 — Deployment](#10-deployment) for the exact steps to turn on GitHub Pages and go live.

### Local Development

Open `index.html` directly in a browser — most features work. However, for accurate clean-URL behavior (`/social` instead of `/social.html`), use a local server:

```bash
npx serve .
# Visit http://localhost:3000
```

---

## 9. Configuration Guide

### Step 1 — Personalize `index.html`

Replace every `[bracketed]` placeholder with your actual information:

| Placeholder | What to Replace With |
|---|---|
| `[Your Name]` | Your full name |
| `[Your Degree]` | e.g., "Bachelor of Science in Computer Science" |
| `[Your University]` | e.g., "University of Dhaka" |
| `[Your Country]` | Your country |
| `[Your Field 1/2/3]` | e.g., "Software Engineering, Machine Learning, Cloud Computing" |
| `[Your Job Title]` | Your current or most recent role |
| `[Your Company]` | Your employer or "seeking opportunities" |
| `your-username` | Your GitHub username in all URLs |
| `your.email@example.com` | Your contact email |

### Step 2 — Personalize `social.html`

Replace each `href` and the visible URL text with your actual profile URLs:

```html
<!-- Example for Facebook -->
<a class="social-item" href="https://facebook.com/YOUR_ACTUAL_USERNAME/" ...>
    ...
    <span class="social-url">facebook.com/YOUR_ACTUAL_USERNAME</span>
</a>
```

Remove any platform rows you do not use.

### Step 3 — Set Up FormSubmit (Anonymous Message Form)

1. Go to [formsubmit.co](https://formsubmit.co) and enter your email address.
2. Submit a test message — FormSubmit will send a verification email.
3. Click the link in the verification email.
4. FormSubmit will give you a unique hash (e.g., `abc123def456`).
5. Replace `YOUR_FORMSUBMIT_HASH` in **both** files:
   - `js/components.js` → `form action="https://formsubmit.co/ajax/YOUR_FORMSUBMIT_HASH"`
   - `js/mail.js` → `fetch('https://formsubmit.co/ajax/YOUR_FORMSUBMIT_HASH', ...)`

### Step 4 — Replace the Profile Photo

Replace `images/avatar.webp` with your own photo:
- **Recommended size:** 400×400px or larger (will be displayed at 300×300px, clipped circular)
- **Recommended format:** WebP for best compression; JPEG or PNG also works
- **If you change the filename:** Update the `src`, `href`, and `<link rel="preload">` references in `index.html` and `social.html`

### Step 5 — Replace the Resume PDF

Replace `data/demo.pdf` with your actual resume:
```html
<!-- In index.html, update this line -->
<a href="data/YourName_Resume.pdf">Resume</a>
```

### Step 6 — Update SEO Configuration

1. **`robots.txt`** — Replace `your-username` with your GitHub Pages username.
2. **`sitemap.xml`** — Replace `your-username` and update `<lastmod>` dates.
3. **`site.webmanifest`** — Replace `[Your Name]`, `[Short Name]`, and description.
4. **`index.html` and `social.html`** — Replace all `your-username.github.io` canonical and Open Graph URLs.

### Step 7 — Google Analytics (Optional)

Uncomment the Google Analytics block in `index.html` and `social.html`, then replace `G-XXXXXXXXXX` with your own GA4 Measurement ID from [analytics.google.com](https://analytics.google.com).

### Step 8 — Google Search Console (Optional)

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add your site and choose the HTML tag verification method.
3. Uncomment `<!-- <meta name="google-site-verification" content="..."> -->` in `index.html` and replace the content value.

### Step 9 — Replace Favicons

Generate favicon files for your own logo at [realfavicongenerator.net](https://realfavicongenerator.net), then replace:
- `favicon.ico`
- `favicon.svg`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `images/android-chrome-192x192.png`
- `images/android-chrome-512x512.png`
- `images/apple-touch-icon.png`
- `images/mstile-150x150.png`

---

## 10. Deployment

### GitHub Pages (Recommended)

GitHub Pages is a free static hosting service built into GitHub. When your repository is named `your-username.github.io`, GitHub automatically serves it at `https://your-username.github.io` — no server, no cost, no build pipeline.

#### Step 1 — Verify the repository name

Go to your repository on GitHub. The name shown at the top must be exactly `your-username.github.io` (your real GitHub username, all lowercase). If it is named anything else, go to **Settings → General → Repository name** and rename it now. The URL will not work correctly without this.

#### Step 2 — Enable GitHub Pages

1. In your repository, click the **Settings** tab (top navigation bar).
2. In the left sidebar, click **Pages** (under the "Code and automation" section).
3. Under **"Build and deployment"**, set **Source** to **"Deploy from a branch"**.
4. Under **Branch**, select **`main`** and set the folder to **`/ (root)`**.
5. Click **Save**.

GitHub will display a banner: *"GitHub Pages source saved."*

#### Step 3 — Wait for deployment

GitHub takes 1–3 minutes to build and deploy the site the first time. You can monitor the progress:

- Go to the **Actions** tab of your repository.
- You will see a workflow called **"pages build and deployment"** running.
- Once the workflow shows a green checkmark, your site is live.

#### Step 4 — Visit your site

Open a browser and go to:
```
https://your-username.github.io
```

If you see a 404 page, wait another minute and refresh — the DNS update sometimes takes slightly longer on the first deploy.

#### Step 5 — Verify the `/social` page

Navigate to `https://your-username.github.io/social`. This clean URL works because GitHub Pages runs Jekyll automatically, and Jekyll processes the `permalink: /social` directive at the top of `social.html`. No extra configuration is needed.

If `/social` returns a 404, double-check that the frontmatter block is present and unmodified at the very top of `social.html`:
```yaml
---
permalink: /social
---
```

#### After your first deploy

Every time you push a commit to the `main` branch, GitHub automatically rebuilds and redeploys your site. Changes typically go live within 1–2 minutes of pushing.

```bash
# Make a change, then deploy it:
git add .
git commit -m "Update bio section"
git push
# Site updates automatically — no manual step needed
```

### Netlify

1. Push your code to a GitHub repository.
2. Go to [netlify.com](https://netlify.com) and click **Import an existing project**.
3. Connect your GitHub repository.
4. Set **Build command:** *(leave empty — no build step needed)*
5. Set **Publish directory:** `.` (root)
6. Click **Deploy**.

The `_headers` file will automatically apply cache-control rules for PDFs on Netlify.

**Note:** Netlify does not run Jekyll by default. The `permalink: /social` frontmatter will not be processed. To get `/social` clean URLs on Netlify, use `serve.json`'s `cleanUrls` setting or configure a redirect rule in `_redirects`:
```
/social  /social.html  200
```

### Any Static Host (Vercel, Cloudflare Pages, etc.)

Upload the project files as-is. No build step is needed. Configure clean URLs through the host's routing settings if you want `/social` to work without `.html`.

---

## 11. Environment Variables

This project has **no runtime environment variables**. It is a purely static site with no server-side code.

The closest equivalents to environment variables are the configuration values that must be manually replaced in the source files before deployment:

| Value | File | Description |
|---|---|---|
| `YOUR_FORMSUBMIT_HASH` | `js/components.js`, `js/mail.js` | FormSubmit.co email hash for contact form |
| `G-XXXXXXXXXX` | `index.html`, `social.html` (commented out) | Google Analytics GA4 measurement ID |
| `your-username` | `robots.txt`, `sitemap.xml`, HTML files | Your GitHub Pages username |
| `YOUR_DISCORD_USER_ID` | `social.html` | Your numeric Discord user ID |

---

## 12. Troubleshooting

### The `/social` page returns 404

- **On GitHub Pages:** Ensure the `---\npermalink: /social\n---` frontmatter is present at the very top of `social.html` (before `<!DOCTYPE html>`). GitHub Pages' Jekyll processor needs this to create the clean URL.
- **On Netlify:** Add a `_redirects` file with `/social /social.html 200` or rely on `serve.json` locally.

### Dark mode flashes white on load

- Ensure the inline `<script>` at the top of `<head>` in `index.html` is intact and has not been accidentally removed.
- This script must run **before** any stylesheets are parsed.

### The anonymous message form does not submit

1. Verify that `YOUR_FORMSUBMIT_HASH` has been replaced with your real hash in **both** `js/components.js` and `js/mail.js`.
2. Verify you have completed the email verification step on formsubmit.co.
3. Open the browser DevTools Network tab, submit the form, and check the response from the FormSubmit endpoint.
4. Check that your site's Content Security Policy includes `https://formsubmit.co` in `connect-src` (it does by default).

### The navbar active section is not highlighting correctly

- Ensure all `<div class="section-bottom-indicator" data-section="SectionName">` elements are present after each content section in `index.html`.
- Ensure `navbar_active.js` is loaded and not throwing errors (check browser DevTools console).
- The `data-section` value must exactly match the section's heading `id` attribute.

### The profile photo is not showing

- Verify the file exists at `images/avatar.webp` (or whatever filename you used).
- If you changed the filename, update the `src`, `href`, and `<link rel="preload">` in `index.html` and `social.html`.
- Check for case sensitivity issues on Linux-based servers (GitHub Pages is case-sensitive).

### Styles look different in development vs production

- In development (`index.html` opened directly in browser), the browser may serve `stylesheet.css` instead of `stylesheet.min.css` if you modified the link. Always load `stylesheet.min.css`.
- After editing `stylesheet.css`, regenerate `stylesheet.min.css`.

### `document.lastModified` shows the wrong date

- On GitHub Pages, the `Last-Modified` header is set by the CDN based on the file's last commit. If you committed without changing `index.html`, the date will not update even if other files changed. This is a known limitation of the approach.

---

## 13. Maintenance Recommendations

1. **Keep `stylesheet.css` in sync with `stylesheet.min.css`** — Always edit the source file and regenerate the minified version. Never edit `stylesheet.min.css` directly.

2. **Update `sitemap.xml` dates** when you significantly update content. Search engines use `<lastmod>` to prioritize recrawling.

3. **Replace placeholder content before going live** — Search for `[` in `index.html` and `social.html` to find all unfilled placeholders: `grep -r "\[" *.html`.

4. **Test mobile at multiple breakpoints** — The two critical breakpoints are `1024px` (hamburger menu switches) and `480px` (mobile spacing). Test at both.

5. **Verify FormSubmit periodically** — FormSubmit.co is a free third-party service. Test the form occasionally to ensure messages are being received. Consider setting up an alternative contact method as a backup.

6. **Monitor CDN availability** — Bootstrap Icons is loaded from jsDelivr CDN. If jsDelivr is unavailable, icons will not render. Consider self-hosting the icon font for reliability.

7. **Check for broken links** — Run a link checker on your site periodically, especially for external links in the Experience, Project, and Research sections.

8. **Review the Content Security Policy** when adding new external resources — Any new CDN, analytics service, or embedded content must be added to the appropriate CSP directive, or it will be blocked.

---

## 14. Cleanup & Removal Guide

> **Warning:** The following files can be removed but may have cascading effects. Read each entry before deleting.

### Safe to Remove (No Production Impact)

| File | Why Safe | Action Required |
|---|---|---|
| `serve.json` | Dev-only local server config | None |
| `css/stylesheet.css` | Not loaded by HTML; only the minified version is used | Keep for future editing |
| `README.md` | Not served to site visitors | None |

### Safe to Remove (With Minor Cleanup)

| File | Cleanup Required |
|---|---|
| `browserconfig.xml` | Remove `<meta name="msapplication-config">` from HTML |
| `images/mstile-150x150.png` | Remove `<meta name="msapplication-TileImage">` from HTML |
| `social.html` | Remove "Social Media" footer link from `js/components.js` |
| `site.webmanifest` | Remove `<link rel="manifest">` from HTML |
| `js/last_modified.js` | Remove `<span id="lastModified">` from `js/components.js` footer |
| `js/navbar_scroll.js` | Navbar will stay visible at all times (no other impact) |
| `js/bio_scroll.js` | Bio link will jump-scroll to top instantly instead of smoothly |
| `js/dark_mode.js` | Dark mode toggle button will stop working; theme will still apply from inline script |

### Risky to Remove (Requires Careful Review)

| File | Risk |
|---|---|
| `js/cross_page_scroll.js` | Deep links (e.g., `/index.html#Project`) will jump instantly without animation; inline `<head>` script must also be updated to re-enable `visibility` on load |
| `js/navbar_active.js` | No active section highlighting; `.section-bottom-indicator` divs become dead weight |
| `js/smooth_scroll.js` | Section links will jump without smooth scroll; navbar offset will cause headings to hide behind the fixed navbar |
| `js/components.js` | **Do not remove.** Entire navbar and footer are defined here. |
| `css/mail.css` | Remove alongside the form HTML in `components.js` and `js/mail.js` |
| `_headers` | On Netlify: PDFs will be cached by CDN; users may download stale resumes |

---

*Template by [badhon495](https://github.com/badhon495) — Inspired by [Jon Barron's website](https://github.com/jonbarron/website)*
