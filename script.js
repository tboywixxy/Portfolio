/* Theme Toggle + Persistence + Icon Swap (sun/moon) */
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const iconUse = btn?.querySelector('.themer use');

  function setIcon() {
    const mode = root.getAttribute('data-theme') || 'dark';
    if (iconUse) iconUse.setAttribute('href', mode === 'dark' ? '#icon-sun' : '#icon-moon');
  }

  // Determine initial theme
  const saved = localStorage.getItem('theme');
  if (saved) {
    root.setAttribute('data-theme', saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.setAttribute('data-theme', 'light');
  }
  setIcon();

  // Toggle theme
  btn?.addEventListener('click', (e) => {
    e.preventDefault(); // keep as button-like even though it's an <a>
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setIcon();
  });

  // Follow system changes if no manual choice
  if (!saved && window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    mq.addEventListener?.('change', (e) => {
      root.setAttribute('data-theme', e.matches ? 'light' : 'dark');
      setIcon();
    });
  }
})();

/* Mobile Menu (open/close animation states) */
(function () {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }
  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
  }

  hamburger?.addEventListener('click', (e) => {
    e.preventDefault(); // since it's an <a>
    const open = hamburger.getAttribute('aria-expanded') === 'true';
    open ? closeMenu() : openMenu();
  });

  // close when link clicked
  menu?.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* Scroll Reveal (IntersectionObserver) */
(function () {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.classList.add('in-view');
        io.unobserve(target);
      }
    });
  }, { threshold: 0.14 });

  els.forEach(el => io.observe(el));
})();
