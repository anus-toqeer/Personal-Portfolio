# Anus Toqeer — Portfolio Website

A fully static, multi-page personal portfolio built with HTML, CSS, and vanilla JavaScript for the Web Technologies course Assignment 01.

## Pages

- `index.html` — Home (hero intro, highlights, featured projects)
- `about.html` — About (bio, education, certifications, achievements)
- `skills.html` — Skills & services
- `projects.html` — Projects (filterable gallery)
- `contact.html` — Contact (validated form + contact details)

## Structure

```
portfolio/
├── index.html
├── about.html
├── skills.html
├── projects.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── img/
        └── profile.jpg
```

## JavaScript features (viva talking points)

1. **Responsive hamburger nav** — toggles a class on click, closes on link tap (`initNav`).
2. **Terminal typing effect** — home hero types out lines character-by-character using `setTimeout` recursion and DOM element creation (`initTerminal`).
3. **Accordion** — certifications on the About page expand/collapse via `maxHeight` transitions, one open at a time (`initAccordion`).
4. **Skill bar animation on scroll** — uses `IntersectionObserver` to animate bar widths only once they enter the viewport (`initSkillBars`).
5. **Project filter** — toggles `.is-hidden` on cards based on a `data-tags` attribute match (`initProjectFilter`).
6. **Contact form validation** — regex email check, min-length checks, per-field error messages, `preventDefault()` on submit (`initContactForm`).

## Running locally

No build step — just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Git workflow used

```
main
├── feature-navbar
├── feature-hero-terminal
├── feature-projects-filter
├── feature-contact-form
└── feature-responsive
```

Each feature was built on its own branch and merged into `main` once complete, per the assignment's version-control requirement.

## Notes for customization

- Swap `assets/img/profile.jpg` for a different photo any time — it's already cropped/sized for the About page.
- Update contact details in `contact.html`'s `.contact-list` and in each page's footer.
- The contact form is a static front-end demo (no backend) — connect it to a service like Formspree, EmailJS, or your own backend endpoint to make it functional.
