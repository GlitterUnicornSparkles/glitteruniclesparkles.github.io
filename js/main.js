// ─── Mobile hamburger nav ───────────────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', function() {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.classList.remove('open');
  });
});

// ─── Language selector ──────────────────────────────────────────────────────
const langBtn  = document.getElementById('lang-btn');
const langMenu = document.getElementById('lang-menu');

langBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  langMenu.classList.toggle('open');
});

document.addEventListener('click', function() {
  langMenu.classList.remove('open');
});

langMenu.addEventListener('click', function(e) {
  e.stopPropagation();
  const btn = e.target.closest('.lang-option');
  if (!btn) return;
  setLanguage(btn.dataset.lang);
  langMenu.classList.remove('open');
});

// Load saved language on page start
(function() {
  try {
    const saved = localStorage.getItem('velira-lang');
    if (saved && typeof translations !== 'undefined' && translations[saved]) {
      setLanguage(saved);
    }
  } catch(e) {}
})();

// ─── Form submit handlers with honeypot check ───────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const honeypot = e.target.querySelector('input[name="website"]');
  if (honeypot && honeypot.value) return; // bot detected — silent reject
  const btn = e.target.querySelector('button');
  const input = e.target.querySelector('input[type="email"]');
  btn.textContent = 'Subscribed ✓';
  btn.style.background = '#2a5240';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
  }, 3000);
}

function handleWhatsApp(e) {
  e.preventDefault();
  const honeypot = e.target.querySelector('input[name="website"]');
  if (honeypot && honeypot.value) return; // bot detected — silent reject
  const btn = e.target.querySelector('button');
  const select = e.target.querySelector('.nl-country-select');
  const input = e.target.querySelector('input[type="tel"]');
  const code = select ? select.value : '';
  btn.textContent = 'Joined ✓';
  btn.style.background = '#2a5240';
  if (input) input.value = '';
  setTimeout(() => {
    btn.textContent = 'Join on WhatsApp';
    btn.style.background = '';
  }, 3000);
}

// ─── Scroll animations ──────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.pillars, .resources, .newsletter, .notes').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});
