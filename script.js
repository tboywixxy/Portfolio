(function () {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  // Load saved theme or system preference
  const saved = localStorage.getItem('theme');
  if (saved) {
    root.setAttribute('data-theme', saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }

  // Update button icon
  function setIcon() {
    const mode = root.getAttribute('data-theme') || 'light';
    if (btn) btn.textContent = mode === 'dark' ? '☀️' : '🌙';
  }
  setIcon();

  // Toggle on click
  btn?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setIcon();
  });

  // Optional: react to system changes when no manual choice saved
  if (!saved && window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      setIcon();
    });
  }
})();
