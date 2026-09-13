/* =====================================================
   Anus Toqeer — Portfolio
   Shared interactivity
   ===================================================== */

/* ---------- 1. Responsive sidebar nav ---------- */
function initNav() {
  const toggle = document.querySelector('.mobile-bar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (!toggle || !sidebar || !overlay) return;

  function setOpen(isOpen) {
    sidebar.classList.toggle('is-open', isOpen);
    toggle.classList.toggle('is-open', isOpen);
    overlay.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  toggle.addEventListener('click', () => {
    setOpen(!sidebar.classList.contains('is-open'));
  });

  overlay.addEventListener('click', () => setOpen(false));

  // close the drawer once a link is picked (mobile)
  sidebar.querySelectorAll('.sidebar-link').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });
}

/* ---------- 2. Terminal typing effect (home hero) ---------- */
function initTerminal() {
  const el = document.getElementById('terminal-output');
  if (!el) return;

  const lines = [
    { type: 'cmd', text: 'whoami' },
    { type: 'out', text: 'Anus Toqeer — CS student, full-stack developer' },
    { type: 'cmd', text: 'cat interests.txt' },
    { type: 'out', text: 'web development · AI · information security' },
    { type: 'cmd', text: './build --status' },
    { type: 'out', text: 'open to internships & collaborations ✓' },
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentLineEl = null;

  function typeStep() {
    if (lineIndex >= lines.length) {
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      el.appendChild(cursor);
      return;
    }

    const line = lines[lineIndex];

    if (charIndex === 0) {
      currentLineEl = document.createElement('p');
      currentLineEl.className = 'line';
      if (line.type === 'cmd') {
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = '> ';
        currentLineEl.appendChild(prompt);
      } else {
        currentLineEl.classList.add('out');
      }
      el.appendChild(currentLineEl);
    }

    if (charIndex < line.text.length) {
      currentLineEl.append(line.text[charIndex]);
      charIndex += 1;
      setTimeout(typeStep, line.type === 'cmd' ? 45 : 14);
    } else {
      lineIndex += 1;
      charIndex = 0;
      setTimeout(typeStep, 260);
    }
  }

  typeStep();
}

/* ---------- 3. Accordion (certificates on About page) ---------- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // close all others (single-open accordion)
      items.forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.accordion-panel').style.maxHeight = null;
        other.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---------- 4. Skill bar fill-in on scroll ---------- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.style.width = target.dataset.level + '%';
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach((bar) => observer.observe(bar));
}

/* ---------- 5. Project filter (Projects page) ---------- */
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const tags = card.dataset.tags || '';
        const matches = filter === 'all' || tags.split(',').includes(filter);
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });
}

/* ---------- 6. Contact form validation ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');

  const rules = {
    name: (v) => v.trim().length >= 2 || 'Please enter your name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address.',
    message: (v) => v.trim().length >= 10 || 'Message should be at least 10 characters.',
  };

  function validateField(field) {
    const wrapper = field.closest('.form-field');
    const rule = rules[field.name];
    if (!rule) return true;

    const result = rule(field.value);
    const errorEl = wrapper.querySelector('.error-msg');

    if (result === true) {
      wrapper.classList.remove('has-error');
      return true;
    }
    wrapper.classList.add('has-error');
    if (errorEl) errorEl.textContent = result;
    return false;
  }

  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = form.querySelectorAll('input, textarea');
    let allValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) allValid = false;
    });

    status.classList.remove('is-success', 'is-error');

    if (!allValid) {
      status.textContent = 'Please fix the highlighted fields and try again.';
      status.classList.add('is-error');
      return;
    }

    // send the validated data to Formspree (no backend code needed)
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          status.textContent = "Thanks — your message has been sent. I'll get back to you soon.";
          status.classList.add('is-success');
          form.reset();
        } else {
          status.textContent = 'Something went wrong sending your message — please email me directly instead.';
          status.classList.add('is-error');
        }
      })
      .catch(() => {
        status.textContent = 'Network error — please check your connection and try again.';
        status.classList.add('is-error');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      });
  });
}

/* ---------- init everything once DOM is ready ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTerminal();
  initAccordion();
  initSkillBars();
  initProjectFilter();
  initContactForm();
});