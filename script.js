/* Theme toggle with persistence */
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  const iconUse = btn?.querySelector(".themer use");

  function setIcon() {
    const mode = root.getAttribute("data-theme") || "dark";
    if (iconUse) {
      iconUse.setAttribute("href", mode === "dark" ? "#icon-sun" : "#icon-moon");
    }
  }

  const saved = localStorage.getItem("theme");
  if (saved) {
    root.setAttribute("data-theme", saved);
  } else if (window.matchMedia?.("(prefers-color-scheme: light)").matches) {
    root.setAttribute("data-theme", "light");
  }
  setIcon();

  btn?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setIcon();
  });

  if (!saved && window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    mq.addEventListener?.("change", (event) => {
      root.setAttribute("data-theme", event.matches ? "light" : "dark");
      setIcon();
    });
  }
})();

/* Mobile menu */
(function () {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("mobile-menu");

  function closeMenu() {
    if (!hamburger || !menu) return;
    hamburger.setAttribute("aria-expanded", "false");
    menu.classList.remove("open");
  }

  function openMenu() {
    if (!hamburger || !menu) return;
    hamburger.setAttribute("aria-expanded", "true");
    menu.classList.add("open");
  }

  hamburger?.addEventListener("click", () => {
    const isOpen = hamburger.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu?.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
})();

/* Scroll reveal */
(function () {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add("in-view");
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.14 }
  );

  elements.forEach((element) => observer.observe(element));
})();
