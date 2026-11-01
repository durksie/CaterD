/* ============================================================================
   DUBE FLAME & FEAST — NAVIGATION
   Sticky background transition, animated mobile menu, scroll-spy.
   ========================================================================== */
window.DFF_nav = function () {
  "use strict";
  var D = window.DFF, $ = D.$, $$ = D.$$, cfg = D.cfg;

  var nav = $("#nav");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 40); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var toggle = $("#navToggle");
  function close() {
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
  toggle.addEventListener("click", function () {
    var open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  $$("#mobileMenu a").forEach(function (a) { a.addEventListener("click", close); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

  /* Scroll-spy: highlight active section link */
  var sections = (cfg.nav || []).map(function (n) { return $(n.target); }).filter(Boolean);
  var links = $$(".nav__link");
  var map = {};
  links.forEach(function (l) { map[l.getAttribute("data-target")] = l; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          var link = map["#" + e.target.id];
          if (link) link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }
};
