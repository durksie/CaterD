/* ============================================================================
   DUBE FLAME & FEAST — MAIN
   Shared helpers, content rendering, scroll reveal, hero, smooth scrolling.
   Feature modules (navigation / gallery / quote-form / newsletter) read the
   shared helpers exposed on window.DFF.
   ========================================================================== */
(function () {
  "use strict";
  var cfg = window.DFF_CONFIG || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m];
    });
  };
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function waLink(message) {
    var num = (cfg.whatsappNumber || "").replace(/\D/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(message);
  }
  var PH_FLAME = "assets/images/branding/placeholder-flame.svg";
  function placeholder(label, role, hint) {
    return '<div class="ph">' +
      '<img src="' + PH_FLAME + '" alt="" aria-hidden="true" />' +
      (role ? '<span class="ph__role">' + esc(role) + '</span>' : '') +
      '<span class="ph__label">' + esc(label) + '</span>' +
      '<span class="ph__hint">' + esc(hint || "Professional photograph to be supplied") + '</span>' +
      '</div>';
  }

  /* ---------- Inline SVG icons ---------- */
  var icon = {
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    phone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    pin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    wa: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.511 5.26l-.999 3.648 3.477-.912z"/></svg>',
    fb: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.25h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/></svg>',
    ig: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    quality: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.4H22l-6 4.3 2.3 7.3-6.3-4.6L5.7 21 8 13.7 2 9.4h7.6z"/></svg>',
    reliable: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2v7a3 3 0 0 0 3 3v10M9 2v20M6 2v4M18 2v20c2-.5 3-2 3-5V8c0-4-1-6-3-6z"/></svg>',
    flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c2 4-1 6-2 8 3 0 5 2 5 6a5 5 0 0 1-10 0c0-2 1-3 2-4 .5 2 2 2 2 2-1-3 2-5 3-8z"/></svg>',
    chef: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 13a4 4 0 0 1-1-7.9A4.5 4.5 0 0 1 12 3a4.5 4.5 0 0 1 7 2.1A4 4 0 0 1 18 13"/><path d="M6 13v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6"/></svg>'
  };

  /* ---------- Static content ---------- */
  // `service` / `event` map to the exact <option> text in the quote form so a
  // click can auto-populate the relevant dropdowns.
  var services = [
    { title: "Private Events & Birthdays", desc: "Create unforgettable memories for birthdays, anniversaries, family gatherings and special celebrations with delectable cuisine and professional catering customised for your event.", service: "Buffet Catering", event: "Birthday or Private Event" },
    { title: "Corporate Catering", desc: "Reliable catering for office functions, business meetings, conferences, staff celebrations, year-end functions and corporate events.", service: "Corporate Catering", event: "Corporate Event" },
    { title: "Spit Braai Experience", desc: "Bring people together around the fire with a traditional spit braai experience, ideal for weddings, birthdays, family gatherings, private functions and corporate celebrations.", service: "Spit Braai", event: "" },
    { title: "Buffet & Special-Occasion Catering", desc: "From hearty traditional meals to elegant buffet spreads, create a menu that suits your guests, event style and budget.", service: "Buffet Catering", event: "Wedding or Special Occasion" }
  ];
  // Service card imagery — authentic South African braai food throughout.
  var serviceMedia = [
    { img: "assets/images/food/braai-platter.jpg" },
    { img: "assets/images/food/buffet-spread.jpg" },
    { img: "assets/images/food/lamb-rack.jpg" },
    { img: "assets/images/food/steak-board.jpg" }
  ];

  var why = [
    { ic: icon.quality, t: "Quality Food & Flavour", d: "Delicious, carefully prepared meals designed to make every gathering special." },
    { ic: icon.reliable, t: "Professional & Reliable Service", d: "Careful planning, clear communication and attention to detail from enquiry to event day." },
    { ic: icon.menu, t: "Menus Tailored to Your Occasion", d: "Flexible catering options to suit your event, guest numbers, preferences and budget." },
    { ic: icon.flame, t: "Our Signature Spit Braai", d: "An authentic, flame-grilled experience that adds flavour and atmosphere to your celebration." },
    { ic: icon.chef, t: "Experienced Culinary Team", d: "Benefit from the culinary experience of our Chef de Partie and dedicated catering team." }
  ];

  var menuCats = [
    { img: "assets/images/food/braai-platter.jpg", t: "Birthday & Private Events", d: "Buffet menus, party meals and customised options.", service: "Buffet Catering", event: "Birthday or Private Event" },
    { img: "assets/images/food/lamb-braai.jpg", t: "Corporate Catering", d: "Business lunches, meetings, conferences and staff functions.", service: "Corporate Catering", event: "Corporate Event" },
    { img: "assets/images/food/lamb-rack.jpg", t: "Spit Braai Packages", d: "Meat selections, sides and accompaniments.", service: "Spit Braai Packages", event: "" },
    { img: "assets/images/food/buffet-spread.jpg", t: "Custom Catering", d: "Bespoke menus based on guest numbers, preferences and budget.", service: "Custom Menu", event: "" }
  ];

  var teamBios = {
    "Thokozani Dube": "Thokozani Dube brings a wealth of professional experience in leadership, administration, operations and management, gained through his career in the financial services and investment industry. Having developed strong leadership capabilities, he has experience in guiding teams, coordinating operations, managing competing priorities, resolving complex stakeholder queries and driving service excellence in a performance-driven environment. His professional background has equipped him with valuable business skills, including strategic thinking, problem-solving, relationship management, process improvement and operational oversight. He understands the importance of accountability, effective communication, teamwork and building lasting client relationships. Driven by ambition, a strong work ethic and a vision for sustainable business growth, Thokozani is committed to building Dube Signature Catering into a reputable and trusted catering brand.",
    "Nhlanhla Dube": "Nhlanhla Dube brings valuable culinary experience and kitchen expertise to Dube Signature Catering as an experienced Chef de Partie. His culinary background contributes to the preparation and presentation of quality meals, with an understanding of the importance of consistency, kitchen organisation, food preparation standards and delivering dishes that meet customer expectations. His experience across different dining environments, including banqueting, à la carte dining and breakfast services, strengthens the culinary offering of the business. Together with his understanding of dietary preferences and meal requirements, Nhlanhla plays an important role in developing food offerings that cater to a variety of occasions and client needs. His passion for food and professional kitchen experience support our commitment to delivering flavourful meals, thoughtful presentation and a quality dining experience for every event."
  };

  var commitments = [
    "Appropriate food-handling, hygiene and food-safety practices.",
    "Compliance with applicable municipal requirements and approved trading conditions.",
    "Responsible waste disposal and daily cleaning of the trading area.",
    "Professional customer service.",
    "Reliable operating hours and clear communication.",
    "Respect for residents, neighbouring properties and community rules.",
    "Providing relevant business and compliance documentation as required."
  ];

  // Gallery images (verified food only). Shared with gallery.js.
  var gallery = (cfg.food || []).map(function (f) { return { src: f.image, tag: f.tag }; });

  /* ---------- Rendering ---------- */
  function renderNav() {
    var nav = cfg.nav || [];
    $("#navLinks").innerHTML = nav.map(function (n) {
      return '<a class="nav__link" href="' + esc(n.target) + '" data-target="' + esc(n.target) + '">' + esc(n.label) + '</a>';
    }).join("");
    $("#mobileMenu").innerHTML = nav.map(function (n) {
      return '<a href="' + esc(n.target) + '" data-target="' + esc(n.target) + '">' + esc(n.label) + '</a>';
    }).join("") + '<a href="#quote" class="btn btn--red">Request a Quote</a>';
    $("#footerLinks").innerHTML = nav.map(function (n) {
      return '<a href="' + esc(n.target) + '">' + esc(n.label) + '</a>';
    }).join("");
  }

  function mediaFor(m, alt) {
    if (m && m.img) return '<img src="' + esc(m.img) + '" alt="' + esc(alt) + '" loading="lazy" />';
    return placeholder((m && m.ph) || alt, m && m.role, "Authentic photograph to be supplied");
  }

  // Build the data-* attributes that let a card auto-populate the quote form.
  function prefillAttrs(opts) {
    var a = "";
    if (opts.service) a += ' data-prefill-service="' + esc(opts.service) + '"';
    if (opts.event) a += ' data-prefill-event="' + esc(opts.event) + '"';
    if (opts.note) a += ' data-prefill-note="' + esc(opts.note) + '"';
    return a;
  }

  function renderServices() {
    $("#servicesGrid").innerHTML = services.map(function (s, i) {
      var m = serviceMedia[i] || {};
      var isPh = !m.img;
      return '<a class="svc-card ' + (isPh ? "is-ph" : "") + '" href="#quote"' + prefillAttrs({ service: s.service, event: s.event, note: s.title }) + ' data-reveal data-reveal-delay="' + ((i % 4) + 1) + '" aria-label="Enquire about ' + esc(s.title) + '">' +
        mediaFor(m, s.title) +
        '<div class="svc-card__body">' +
          '<span class="svc-card__num">0' + (i + 1) + '</span>' +
          '<h3 class="svc-card__title">' + esc(s.title) + '</h3>' +
          '<p class="svc-card__desc">' + esc(s.desc) + '</p>' +
          '<span class="textlink">Enquire ' + icon.arrow + '</span>' +
        '</div></a>';
    }).join("");
  }

  function renderWhy() {
    $("#whyGrid").innerHTML = why.map(function (w, i) {
      return '<div class="why-card" data-reveal data-reveal-delay="' + ((i % 4) + 1) + '">' +
        '<div class="why-card__icon">' + w.ic + '</div>' +
        '<h3>' + esc(w.t) + '</h3><p>' + esc(w.d) + '</p></div>';
    }).join("");
  }

  function renderMenuCats() {
    $("#menuCats").innerHTML = menuCats.map(function (c, i) {
      var isPh = !c.img;
      return '<a class="cat-card ' + (isPh ? "is-ph" : "") + '" href="#quote"' + prefillAttrs({ service: c.service, event: c.event, note: c.t }) + ' data-reveal data-reveal-delay="' + ((i % 4) + 1) + '" aria-label="Enquire about ' + esc(c.t) + '">' +
        mediaFor(c, c.t) +
        '<div class="cat-card__body"><h3>' + esc(c.t) + '</h3><p>' + esc(c.d) + '</p>' +
        '<span class="textlink">Enquire ' + icon.arrow + '</span></div></a>';
    }).join("");
  }

  function renderPackages() {
    var pk = cfg.packages || [];
    $("#pkgGrid").innerHTML = pk.map(function (p, i) {
      return '<div class="pkg-card ' + (p.featured ? "featured" : "") + '" data-reveal data-reveal-delay="' + ((i % 3) + 1) + '">' +
        (p.featured ? '<span class="pkg-card__flag">Most Popular</span>' : '') +
        '<div class="pkg-card__img"><img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy" /></div>' +
        '<div class="pkg-card__body">' +
          '<h3 class="pkg-card__name">' + esc(p.name) + '</h3>' +
          '<div class="pkg-card__price"><span class="amount">' + esc(p.price) + '</span>' +
            (p.unit ? '<span class="unit">' + esc(p.unit) + '</span>' : '') + '</div>' +
          '<p class="pkg-card__note">' + esc(p.note || "") + '</p>' +
          '<ul class="pkg-card__items">' + (p.items || []).map(function (it) {
            return '<li>' + icon.check + '<span>' + esc(it) + '</span></li>';
          }).join("") + '</ul>' +
          '<a href="#quote" class="btn btn--red btn--block" data-prefill-package="' + esc(p.name) + '" data-prefill-service="Spit Braai Packages">Enquire</a>' +
        '</div></div>';
    }).join("");
  }

  function renderFood() {
    var food = cfg.food || [];
    $("#foodGrid").innerHTML = food.map(function (f, i) {
      return '<div class="food-card" data-reveal data-reveal-delay="' + ((i % 4) + 1) + '">' +
        '<img src="' + esc(f.image) + '" alt="' + esc(f.label) + ' — authentic South African braai catering" loading="lazy" />' +
        '<span class="food-card__label"><span>' + esc(f.tag) + '</span>' + esc(f.label) + '</span></div>';
    }).join("");
  }

  function renderTeam() {
    var team = cfg.team || [];
    $("#teamGrid").innerHTML = team.map(function (m, i) {
      var media = m.image
        ? '<img src="' + esc(m.image) + '" alt="Portrait of ' + esc(m.name) + '" loading="lazy" />'
        : placeholder(m.name, m.role, "Professional portrait to be supplied");
      var bio = teamBios[m.name] || "";
      return '<div class="team-card" data-reveal data-reveal-delay="' + ((i % 2) + 1) + '">' +
        '<div class="team-card__img">' + media + '</div>' +
        '<div class="team-card__body">' +
          '<h3 class="team-card__name">' + esc(m.name) + '</h3>' +
          '<span class="team-card__role">' + esc(m.role) + '</span>' +
          '<div class="team-card__text"><p class="clamp">' + esc(bio) + '</p></div>' +
          '<button type="button" class="team-card__more">Read more</button>' +
        '</div></div>';
    }).join("");
    $$(".team-card__more").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var body = btn.closest(".team-card__body").querySelector(".team-card__text");
        var open = body.classList.toggle("open");
        btn.textContent = open ? "Read less" : "Read more";
      });
    });
  }

  function renderCommitments() {
    $("#commitList").innerHTML = commitments.map(function (c) {
      return '<li>' + icon.check + '<span>' + esc(c) + '</span></li>';
    }).join("");
  }

  function renderTestimonials() {
    var t = cfg.testimonials || [];
    var sec = $("#testimonials");
    if (!t.length) { sec.hidden = true; return; }
    sec.hidden = false;
    $("#testiTrack").innerHTML = t.map(function (x) {
      return '<div class="testi-card">' +
        (x.rating ? '<div class="testi-card__stars">' + Array(x.rating + 1).join("★") + '</div>' : '') +
        '<p class="testi-card__text">\u201C' + esc(x.text) + '\u201D</p>' +
        '<div class="testi-card__name">' + esc(x.name) + '</div>' +
        (x.eventType ? '<div class="testi-card__event">' + esc(x.eventType) + '</div>' : '') +
        '</div>';
    }).join("");
  }

  function socialLinks() {
    var s = cfg.social || {}, items = [];
    if (s.facebook) items.push('<a href="' + esc(s.facebook) + '" target="_blank" rel="noopener" aria-label="Facebook">' + icon.fb + '</a>');
    if (s.instagram) items.push('<a href="' + esc(s.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram">' + icon.ig + '</a>');
    return items.join("");
  }

  function renderContact() {
    var rows = [
      { ic: icon.phone, label: "Phone", value: cfg.phoneDisplay, href: "tel:" + cfg.phoneLink },
      { ic: icon.wa, label: "WhatsApp", value: cfg.phoneDisplay, href: waLink("Hello Dube Flame & Feast, I'd like to enquire about catering."), ext: true },
      { ic: icon.mail, label: "Email", value: cfg.email, href: "mailto:" + cfg.email },
      { ic: icon.pin, label: "Service Area", value: cfg.serviceArea, href: "#contact" }
    ];
    $("#contactDetails").innerHTML = rows.map(function (r) {
      return '<a class="contact__row" href="' + esc(r.href) + '"' + (r.ext ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<span class="ic">' + r.ic + '</span>' +
        '<span><span style="font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:#888;display:block;">' + esc(r.label) + '</span>' +
        '<strong>' + esc(r.value) + '</strong></span></a>';
    }).join("");

    var socials = socialLinks();
    $("#contactSocials").innerHTML = socials;
    $("#footerSocials").innerHTML = socials;

    $("#footerContact").innerHTML =
      '<a href="tel:' + esc(cfg.phoneLink) + '">' + esc(cfg.phoneDisplay) + '</a>' +
      '<a href="' + esc(waLink("Hello Dube Flame & Feast, I'd like to enquire about catering.")) + '" target="_blank" rel="noopener">WhatsApp</a>' +
      '<a href="mailto:' + esc(cfg.email) + '">' + esc(cfg.email) + '</a>' +
      '<span>' + esc(cfg.serviceArea) + '</span>';
    $("#footerArea").textContent = cfg.serviceArea || "";

    $("#quoteContacts").innerHTML = rows.slice(0, 3).map(function (r) {
      return '<a class="quote__contact" href="' + esc(r.href) + '"' + (r.ext ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<span class="ic">' + r.ic + '</span>' +
        '<span><span>' + esc(r.label) + '</span><strong>' + esc(r.value) + '</strong></span></a>';
    }).join("");
  }

  function setupFloatingWA() {
    $("#waFloat").href = waLink("Hello Dube Flame & Feast, I'd like to enquire about catering for my event.");
  }

  function setupReveal() {
    var items = $$("[data-reveal]");
    if (!("IntersectionObserver" in window)) { items.forEach(function (i) { i.classList.add("in"); }); return; }
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); o.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (i) { obs.observe(i); });
  }

  function setupSmoothScroll() {
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id === "#" || id.length < 2) return;
        var el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        var top = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: top, behavior: "smooth" });
        history.replaceState(null, "", id);
      });
    });
  }

  function splitHeroTitleLetters() {
    // Wrap every character of the hero title in its own <span class="char">
    // and assign an incrementing --i so the CSS can cascade them one letter
    // at a time on first launch. Word boundaries are preserved for wrapping.
    var words = $$(".hero__title .word");
    if (!words.length) return;
    var i = 0;
    words.forEach(function (word) {
      var text = word.textContent;
      word.textContent = "";
      text.split("").forEach(function (ch) {
        var span = document.createElement("span");
        span.className = "char";
        span.style.setProperty("--i", i++);
        // Preserve spaces as non-collapsing so letter boxes stay put.
        span.textContent = ch === " " ? "\u00A0" : ch;
        word.appendChild(span);
      });
    });
  }

  function setupHero() {
    var hero = $(".hero");
    if (hero) {
      splitHeroTitleLetters();
      requestAnimationFrame(function () { hero.classList.add("ready"); });
    }
    var date = $("#q-date");
    if (date) date.min = new Date().toISOString().split("T")[0];
  }

  /* ---------- Expose shared helpers for feature modules ---------- */
  window.DFF = {
    cfg: cfg, $: $, $$: $$, esc: esc, emailRe: emailRe, waLink: waLink, gallery: gallery
  };

  function init() {
    renderNav();
    renderServices();
    renderWhy();
    renderMenuCats();
    renderPackages();
    renderFood();
    renderTeam();
    renderCommitments();
    renderTestimonials();
    renderContact();
    setupFloatingWA();
    setupReveal();
    setupSmoothScroll();
    setupHero();

    // Feature modules expose init fns; call if present.
    if (window.DFF_nav) window.DFF_nav();
    if (window.DFF_gallery) window.DFF_gallery();
    if (window.DFF_quoteForm) window.DFF_quoteForm();
    if (window.DFF_newsletter) window.DFF_newsletter();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
