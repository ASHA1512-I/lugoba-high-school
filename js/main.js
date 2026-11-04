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

// Public forms are intentionally paused until a protected, school-owned service is configured.
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
}// Mobile menu toggle
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
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
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
        if (cur >= target) { el.textContent = target + suffix; }
        else { el.textContent = cur + suffix; requestAnimationFrame(tick); }
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

const formRecipient = 'kidsarenaall@gmail.com';

async function sendForm(form, subject, note) {
  const submitButton = form.querySelector('button[type="submit"]');
  const payload = Object.fromEntries(new FormData(form).entries());
  payload._subject = subject;
  payload._template = 'table';
  const replyTo = form.querySelector('input[type="email"]');
  if (replyTo) payload._replyto = replyTo.value;
  note.classList.remove('error');
  note.textContent = 'Sending...';
  note.style.display = 'block';
  if (submitButton) submitButton.disabled = true;

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${formRecipient}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok || (result.success !== true && result.success !== 'true')) {
      throw new Error(result.message || 'FormSubmit did not accept the submission.');
    }

    note.textContent = subject === 'New admission application'
      ? 'FormSubmit accepted your application. If no email arrives, check the recipient inbox and spam folder, and complete any FormSubmit activation email.'
      : 'FormSubmit accepted your subscription. If no notification arrives, check the recipient inbox and spam folder, and complete any FormSubmit activation email.';
    form.reset();
  } catch (error) {
    note.classList.add('error');
    note.textContent = error instanceof TypeError
      ? 'Could not connect to FormSubmit. Check your internet connection and open the site from its hosted HTTP/HTTPS address (not as a local file), then try again.'
      : error instanceof Error
        ? `FormSubmit rejected the form: ${error.message} Check the recipient address and activation email, then try again.`
        : 'Unable to send your form. Please try again.';
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
  const note = document.getElementById('admissionFormNote');
  if (note) {
    admissionForm.addEventListener('submit', event => {
      event.preventDefault();
      sendForm(admissionForm, 'New admission application', note);
    });
  }
}

document.querySelectorAll('.news form').forEach(form => {
  const emailInput = form.querySelector('input[type="email"]');
  if (emailInput) emailInput.name = 'Subscriber email';
  const note = document.createElement('div');
  note.className = 'form-note';
  note.setAttribute('role', 'status');
  note.setAttribute('aria-live', 'polite');
  form.append(note);
  form.addEventListener('submit', event => {
    event.preventDefault();
    sendForm(form, 'New newsletter subscription', note);
  });
});

// Footer year
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
