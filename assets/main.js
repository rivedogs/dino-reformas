/* ============================================================
   Dinocan Reformas — JavaScript
============================================================ */

'use strict';

/* Navbar scroll */
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    mainNav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* Cierra menú móvil al pulsar enlace */
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('navMenu');
        if (menu.classList.contains('show')) {
            document.querySelector('.navbar-toggler').click();
        }
    });
});

/* Smooth scroll con offset del navbar */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
        }
    });
});

/* Formulario de contacto — Netlify Forms */
function sendContact(event) {
    event.preventDefault();
    const form = event.target;
    const btn  = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
    btn.disabled = true;

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
    })
    .then(() => {
        btn.innerHTML = '<i class="fa-solid fa-check me-2"></i>¡Solicitud enviada!';
        btn.style.background = '#16a34a';
        btn.style.borderColor = '#16a34a';
        showToast('<i class="fa-solid fa-check-circle me-2" style="color:#4ade80"></i>Gracias. Te contactaremos en menos de 24h.');
        form.reset();
        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.disabled = false;
        }, 4000);
    })
    .catch(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        showToast('<i class="fa-solid fa-triangle-exclamation me-2" style="color:#f59e0b"></i>Error al enviar. Llámanos directamente.');
    });
}

/* Toast */
function showToast(message) {
    document.getElementById('toastMsg').innerHTML = message;
    bootstrap.Toast.getOrCreateInstance(
        document.getElementById('mainToast'),
        { delay: 4000, autohide: true }
    ).show();
}

/* Animaciones reveal */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const col   = entry.target.closest('[class*="col"]');
        const row   = col?.parentElement;
        const index = row ? Array.from(row.children).indexOf(col) : 0;
        setTimeout(() => entry.target.classList.add('visible'), index * 100);
        observer.unobserve(entry.target);
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* Hero reveal inmediato */
document.querySelectorAll('.hero-content .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 150);
});

/* Parallax hero (solo desktop) */
if (window.matchMedia('(min-width: 768px)').matches) {
    const hero = document.querySelector('.hero-section');
    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight)
            hero.style.backgroundPositionY = `calc(center + ${window.scrollY * 0.28}px)`;
    }, { passive: true });
}
