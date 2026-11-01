/* ============================================================================
   DUBE FLAME & FEAST — GALLERY + LIGHTBOX
   Responsive grid, hover zoom, keyboard-accessible lightbox with prev/next.
   ========================================================================== */
window.DFF_gallery = function () {
  "use strict";
  var D = window.DFF, $ = D.$, esc = D.esc;
  var gallery = D.gallery || [];
  var grid = $("#galleryGrid");
  if (!grid || !gallery.length) return;

  // Editorial layout classes for an interesting grid rhythm.
  var layout = ["tall", "", "", "wide", "", "tall", "", ""];
  grid.innerHTML = gallery.map(function (g, i) {
    return '<div class="gallery__item ' + (layout[i] || "") + '" data-index="' + i + '" role="button" tabindex="0" aria-label="View ' + esc(g.tag) + ' image">' +
      '<img src="' + esc(g.src) + '" alt="' + esc(g.tag) + ' — Dube Flame & Feast" loading="lazy" />' +
      '<span class="tag">' + esc(g.tag) + '</span></div>';
  }).join("");

  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "Image viewer");
  lb.innerHTML =
    '<button class="lightbox__btn lightbox__close" aria-label="Close">&times;</button>' +
    '<button class="lightbox__btn lightbox__prev" aria-label="Previous image">&#8249;</button>' +
    '<img alt="" />' +
    '<button class="lightbox__btn lightbox__next" aria-label="Next image">&#8250;</button>' +
    '<span class="lightbox__count"></span>';
  document.body.appendChild(lb);

  var img = lb.querySelector("img");
  var count = lb.querySelector(".lightbox__count");
  var idx = 0;

  function show(i) {
    idx = (i + gallery.length) % gallery.length;
    img.src = gallery[idx].src;
    img.alt = gallery[idx].tag + " — Dube Flame & Feast";
    count.textContent = (idx + 1) + " / " + gallery.length;
  }
  function open(i) {
    show(i);
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    lb.querySelector(".lightbox__close").focus();
  }
  function close() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }

  grid.addEventListener("click", function (e) {
    var item = e.target.closest(".gallery__item");
    if (item) open(+item.getAttribute("data-index"));
  });
  grid.addEventListener("keydown", function (e) {
    var item = e.target.closest(".gallery__item");
    if (item && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(+item.getAttribute("data-index")); }
  });
  lb.querySelector(".lightbox__close").addEventListener("click", close);
  lb.querySelector(".lightbox__next").addEventListener("click", function () { show(idx + 1); });
  lb.querySelector(".lightbox__prev").addEventListener("click", function () { show(idx - 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(idx + 1);
    if (e.key === "ArrowLeft") show(idx - 1);
  });
};
