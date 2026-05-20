// ===== TopAIJobs.com — Global JS =====

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// Fade-in on scroll
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.pillar,.intel-card,.ds-item,.method-item,.newsletter,.about-text,.about-aside,.article-body h2,.article-body .callout').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  obs.observe(el);
});

// Nav scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 100) { nav.style.background = 'rgba(4,7,13,0.92)'; }
  else { nav.style.background = 'rgba(4,7,13,0.75)'; }
});

// Mobile nav
function openMobileNav() { document.getElementById('mobnav').classList.add('open'); }
function closeMobileNav() { document.getElementById('mobnav').classList.remove('open'); }

// Copy link to clipboard (for share buttons)
function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  const btn = document.querySelector('.share-copy');
  if (btn) { btn.textContent = '✓'; setTimeout(() => { btn.textContent = '🔗'; }, 2000); }
}
