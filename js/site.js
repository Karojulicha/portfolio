/* =========================================================
   Portfolio – Karol Chaparro
   ========================================================= */

/* AOS */
AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 70 });

/* Typed.js */
new Typed('.typed', {
  strings: [
    'Fullstack Developer',
    'Angular Specialist',
    '.NET Developer',
    'React Developer',
    'API Integration Expert'
  ],
  typeSpeed:  55,
  backSpeed:  30,
  backDelay:  2200,
  loop:       true,
  showCursor: false
});

/* Navbar */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightNav();
});

function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const pos = window.scrollY + 120;
  sections.forEach(s => {
    const link = document.querySelector(`.nav-links a[href="#${s.id}"]`);
    if (!link) return;
    link.classList.toggle('active', pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight);
  });
}

/* Mobile nav toggle */
const toggle  = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
toggle?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  toggle.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    toggle.classList.remove('open');
  })
);

/* Counter animation */
const counters = document.querySelectorAll('.stat-num[data-count]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el     = e.target;
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const t0     = performance.now();
    const run = now => {
      const p    = Math.min((now - t0) / 1400, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(run);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(run);
    observer.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => observer.observe(el));

/* Experience accordion */
document.querySelectorAll('.tl-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.tl-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.tl-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.tl-toggle').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ── EmailJS ──────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = 'portafoli_mio';     // ✓ listo
const EMAILJS_TEMPLATE_ID = 'template_3irnr6f';  // ✓ listo
const EMAILJS_PUBLIC_KEY  = 'X1eCUObM8NYlMfHeJ'; // ✓ listo

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const form    = document.getElementById('contactForm');
const btnSend = document.getElementById('btnSend');
const btnText = document.getElementById('btnText');
const success = document.getElementById('formSuccess');

form?.addEventListener('submit', e => {
  e.preventDefault();

  btnSend.disabled = true;
  btnText.textContent = 'Enviando...';
  btnSend.querySelector('i').className = 'fas fa-spinner fa-spin';

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
    .then(() => {
      form.style.display = 'none';
      success.style.display = 'block';
    })
    .catch(() => {
      btnSend.disabled = false;
      btnText.textContent = 'Enviar mensaje';
      btnSend.querySelector('i').className = 'fas fa-paper-plane';
      alert('Ocurrió un error al enviar. Intenta de nuevo o escríbeme directamente a karol.chaparro171@gmail.com');
    });
});
