/* Theme Toggle + Persistence + Icon Swap (sun/moon) */
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  const iconUse = btn?.querySelector(".themer use");

  function setIcon() {
    const mode = root.getAttribute("data-theme") || "dark";
    if (iconUse) iconUse.setAttribute("href", mode === "dark" ? "#icon-sun" : "#icon-moon");
  }

  const saved = localStorage.getItem("theme");
  if (saved) {
    root.setAttribute("data-theme", saved);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
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
    mq.addEventListener?.("change", (e) => {
      root.setAttribute("data-theme", e.matches ? "light" : "dark");
      setIcon();
    });
  }
})();

/* Mobile Menu (open/close) */
(function () {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("mobile-menu");

  function closeMenu() {
    hamburger.setAttribute("aria-expanded", "false");
    menu.classList.remove("open");
  }
  function openMenu() {
    hamburger.setAttribute("aria-expanded", "true");
    menu.classList.add("open");
  }

  hamburger?.addEventListener("click", () => {
    const open = hamburger.getAttribute("aria-expanded") === "true";
    open ? closeMenu() : openMenu();
  });

  menu?.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

/* Scroll Reveal */
(function () {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add("in-view");
          io.unobserve(target);
        }
      });
    },
    { threshold: 0.14 }
  );

  els.forEach((el) => io.observe(el));
})();

/* Projects: Master-Detail (left list -> right details) */
(function () {
  const detail = document.querySelector(".project-detail");
  const items = document.querySelectorAll(".project-item");

  const PROJECTS = {
    okiri: {
      title: "Okiri Mobile",
      meta: "React Native • Audio/Video Calling • Native Integrations",
      links: [
        { label: "Website", href: "https://okirimobile.com/landing/" },
        { label: "GitHub", href: "https://github.com/tboywixxy" },
      ],
      bullets: [
        "Sole frontend developer for a cross-platform mobile app built with React Native.",
        "Implemented real-time audio and video calling flows: ringing, connecting, in-call, ended states, mute/speaker controls, and call timers.",
        "Integrated native call continuity features including Picture-in-Picture (PiP) on iOS and Android for seamless multitasking.",
        "Built Android-native call screens using separate Activities for incoming/outgoing/in-call, improving performance in background/lock states.",
        "Ensured reliable high-priority Firebase triggers for call events and consistent incoming-call behavior across foreground, background, and killed states.",
        "Developed the public-facing marketing website in React with responsive layouts and polished UX (NDA constraints until official release).",
      ],
    },

    mastaskillz: {
      title: "Mastaskillz",
      meta: "Frontend Internship • Auth • Admin Dashboard",
      links: [{ label: "Live", href: "https://mastaskillz.com/" }],
      bullets: [
        "Led frontend development and UI design for the Mastaskillz web platform, delivering responsive and accessible pages.",
        "Built a complete authentication flow (login/signup) with strong UX for onboarding and returning users.",
        "Implemented Google authentication to streamline sign-in and reduce friction.",
        "Developed an admin dashboard that surfaces platform metrics and user activity for operational visibility.",
        "Collaborated with stakeholders to iterate quickly and ship production-ready UI updates.",
      ],
    },

    yorkshire: {
      title: "Yorkshire Global Consulting Inc.",
      meta: "Next.js • Multilingual (i18n) • Contact Form Email Templates",
      links: [{ label: "Live", href: "https://yorkshireglobal.ca/" }],
      bullets: [
        "Built and deployed a multilingual corporate website using Next.js with consistent routing and localized content structure.",
        "Implemented a contact form workflow that sends emails using a structured template for reliable lead capture.",
        "Delivered responsive UI across key pages and ensured production readiness (deployment + stability checks).",
        "Improved SEO fundamentals with semantic structure, metadata, and performance-conscious UI patterns.",
      ],
    },

    jak: {
      title: "JAK Technologies Website",
      meta: "HTML • CSS • JavaScript • Marketing Site",
      links: [{ label: "Live", href: "https://www.jaktechhub.com/index.html" }],
      bullets: [
        "Implemented a marketing website including Home, Services, Academy, Internship Trainings, Technical Support, IT Consulting, Blog, and Contact pages.",
        "Built reusable UI components and mobile-first layouts to improve usability across devices.",
        "Improved on-page SEO via structured headings and metadata for better search visibility.",
        "Integrated contact/subscription forms and supported deployment with environment-based configurations.",
      ],
    },

    willeder: {
      title: "Willeder",
      meta: "Next.js 15 • TypeScript • Tailwind • Blog System",
      links: [
        { label: "Repo", href: "https://github.com/tboywixxy/Willeder" },
        { label: "Live", href: "https://willeder-eta.vercel.app" },
      ],
      bullets: [
        "Built a blog + marketing site using Next.js 15 App Router, server components, and TypeScript.",
        "Implemented blog list and detail pages with pagination, tag filters, and search; used ISR where appropriate.",
        "Developed dev data via JSON Server and production data via Next.js Route Handlers with the same API shape.",
        "Implemented email delivery for the contact form using Nodemailer on Vercel (Node runtime + env-based SMTP).",
        "Optimized images with next/image and ensured responsive, accessible layouts.",
      ],
    },

    recipe: {
      title: "Recipe Mobile App",
      meta: "Expo Router • React Native • TypeScript",
      links: [
        {
          label: "APK",
          href: "https://expo.dev/accounts/anthony11/projects/mobile/builds/ed68892b-7ff3-4a70-9a14-e5dbbf543874",
        },
        { label: "GitHub", href: "https://github.com/tboywixxy/" },
      ],
      bullets: [
        "Built a cross-platform recipe app using Expo Router, React Native, and TypeScript.",
        "Implemented category & keyword search, rich recipe details, YouTube embeds, and favorites.",
        "Optimized lists using FlatList and built responsive UI with expo-image and LinearGradient.",
        "Set up EAS Development Builds and OTA updates; published a shareable Android APK for portfolio downloads.",
      ],
    },

    jamub: {
      title: "Jamub Group of Companies",
      meta: "Company Website • UI Implementation",
      links: [{ label: "Live", href: "https://jamubgroup.com/" }],
      bullets: [
        "Contributed to designing and developing the company website with a focus on clean UI and usability.",
        "Improved navigation and accessibility to ensure smooth functionality across devices.",
        "Supported stable operations by collaborating with the team on reliable infrastructure and site maintenance.",
      ],
    },
  };

  function renderProject(key) {
    const p = PROJECTS[key];
    if (!p || !detail) return;

    const linksHtml = (p.links || [])
      .map((l) => {
        const isPrimary = /live|website|apk/i.test(l.label);
        return `
          <a class="${isPrimary ? "btn btn-primary" : "btn btn-outline"}"
             href="${l.href}" target="_blank" rel="noopener">
            ${l.label}
          </a>
        `;
      })
      .join("");

    const bulletsHtml = (p.bullets || []).map((b) => `<li>${b}</li>`).join("");

    detail.innerHTML = `
      <div class="project-detail-head">
        <div class="pd-left">
          <h3>${p.title}</h3>
          <div class="project-meta">${p.meta}</div>
        </div>
        <div class="pd-right">
          ${linksHtml}
        </div>
      </div>

      <div class="project-divider"></div>

      <ul class="project-bullets">
        ${bulletsHtml}
      </ul>
    `;
  }

  const active = document.querySelector(".project-item.active")?.getAttribute("data-project") || "okiri";
  renderProject(active);

  items.forEach((btn) => {
    btn.addEventListener("click", () => {
      items.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProject(btn.getAttribute("data-project"));
    });
  });
})();
