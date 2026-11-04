// Mobile menu toggle
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
if (burger && menu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    menu.classList.remove('open');
  }));
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Counter animation
const counters = document.querySelectorAll('.num[data-count]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        cur += step;
        if (cur >= target) {
          el.textContent = target + suffix;
        } else {
          el.textContent = cur + suffix;
          requestAnimationFrame(tick);
        }
      };
      tick();
      cio.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => cio.observe(c));

// Accordion
document.querySelectorAll('.acc-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const open = item.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
    if (!open) item.classList.add('open');
  });
});

// Public forms are paused until a protected, school-owned service is configured.
function showPausedFormNotice(form, message) {
  let note = form.parentElement.querySelector('.form-note');
  if (!note) {
    note = document.createElement('p');
    note.className = 'form-note';
    note.setAttribute('role', 'status');
    note.setAttribute('aria-live', 'polite');
    form.insertAdjacentElement('afterend', note);
  }
  note.textContent = message;
  note.style.display = 'block';
}

document.querySelectorAll('.news form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    showPausedFormNotice(form, 'Newsletter sign-up is temporarily unavailable. Please do not submit personal details here.');
  });
});

const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
  admissionForm.addEventListener('submit', event => {
    event.preventDefault();
    showPausedFormNotice(admissionForm, 'Online applications are temporarily unavailable. Please contact the admissions office directly.');
  });
}

// Footer year
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
