// The page and links work without JavaScript. This updates the nav and back-to-top visibility.
const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const update = () => {
    let current = sections[0];
    for (const section of sections) if (section.getBoundingClientRect().top <= 160) current = section;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections.at(-1);
    for (const link of navLinks) {
      if (link.hash === `#${current?.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(() => { update(); ticking = false; }); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
}

const backTop = document.querySelector('.back-top');
if (backTop) {
  const updateBackTop = () => backTop.classList.toggle('is-hidden', window.scrollY <= 240);
  window.addEventListener('scroll', updateBackTop, { passive: true });
  updateBackTop();
}
