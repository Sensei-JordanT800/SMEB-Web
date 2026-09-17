/* ==========================================================================
   SMEB — SITIO WEB INFORMATIVO
   JavaScript principal (sin dependencias externas)

   Este archivo hace 5 cosas, cada una en su propia funcion:
   1. initNav()      -> abre/cierra el menu movil
   2. initReveal()    -> revela secciones al hacer scroll (IntersectionObserver)
   3. initCounters()  -> anima las cifras grandes de "Lo que ya demostramos"
   4. initAnatomy()   -> maneja el mapa anatomico interactivo (tap/click, no solo hover)
   5. initPrototypeGallery() -> alterna entre las vistas reales del dashboard

   Para agregar una nueva seccion animada: agrega la clase "reveal" al
   elemento en el HTML, initReveal() la detecta automaticamente.
   ========================================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- 1. Navegacion movil ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Cierra el menu al elegir un enlace (mejora la experiencia en movil)
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 2. Revelado al hacer scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- 3. Contadores animados ---------- */
  function initCounters() {
    var counters = document.querySelectorAll("[data-counter-target]");
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseFloat(el.getAttribute("data-counter-target"));
      var suffix = el.getAttribute("data-counter-suffix") || "";
      var decimals = el.getAttribute("data-counter-decimals") ? 1 : 0;

      if (prefersReducedMotion) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }

      var duration = 900;
      var start = null;

      function step(timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = target * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = target.toFixed(decimals) + suffix;
        }
      }
      window.requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- 4. Mapa anatomico interactivo ---------- */
  function initAnatomy() {
    var hotspots = document.querySelectorAll(".anatomy-hotspot");
    var panels = document.querySelectorAll(".anatomy-panel");
    if (!hotspots.length) return;

    function showZone(zone) {
      hotspots.forEach(function (h) {
        h.setAttribute("aria-pressed", String(h.getAttribute("data-zone") === zone));
      });
      panels.forEach(function (p) {
        p.hidden = p.getAttribute("data-zone") !== zone;
      });
    }

    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("click", function () {
        showZone(hotspot.getAttribute("data-zone"));
      });
    });
  }

  /* ---------- 5. Galeria del prototipo (dashboard) ---------- */
  function initPrototypeGallery() {
    var tabs = document.querySelectorAll(".prototype-tab");
    var views = document.querySelectorAll(".prototype-figure [data-view]");
    if (!tabs.length) return;

    function showView(view) {
      tabs.forEach(function (t) {
        t.setAttribute("aria-pressed", String(t.getAttribute("data-view") === view));
      });
      views.forEach(function (v) {
        v.hidden = v.getAttribute("data-view") !== view;
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        showView(tab.getAttribute("data-view"));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initReveal();
    initCounters();
    initAnatomy();
    initPrototypeGallery();
  });
})();
