/* ============================================================
   Shared JS — Nav, Lightbox, Scroll Reveal
   ============================================================ */

const navToggle = document.querySelector('.nav-toggle');
const navLinksEl = document.getElementById('nav-links');

navToggle?.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinksEl?.addEventListener('click', e => {
  if (e.target.matches('a')) {
    navLinksEl.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

/* Lightbox */
const lightbox = document.querySelector('.lightbox');
const lbImg = lightbox?.querySelector('img');
const lbCaption = lightbox?.querySelector('p');
const lbClose = document.querySelector('.lightbox-close');

document.querySelectorAll('[data-lightbox]').forEach(btn => {
  btn.addEventListener('click', () => {
    lbImg.src = btn.getAttribute('data-lightbox');
    lbImg.alt = btn.getAttribute('data-caption') || '';
    lbCaption.textContent = btn.getAttribute('data-caption') || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});
function closeLB() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  if (lbImg) lbImg.src = '';
  document.body.style.overflow = '';
}
lbClose?.addEventListener('click', closeLB);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox?.classList.contains('open')) closeLB(); });

/* Scroll reveal */
(function() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();
