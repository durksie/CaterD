/* ============================================================================
   DUBE FLAME & FEAST — QUOTE FORM
   Validation (incl. SA phone), WhatsApp fallback, demo-safe submission.
   ========================================================================== */
window.DFF_quoteForm = function () {
  "use strict";
  var D = window.DFF, $ = D.$, $$ = D.$$, cfg = D.cfg, emailRe = D.emailRe, waLink = D.waLink;

  var form = $("#quoteForm");
  if (!form) return;
  var status = $("#quoteStatus");
  var submit = $("#quoteSubmit");
  var note = $("#quoteModeNote");
  var demo = !cfg.quoteEndpoint;

  note.textContent = demo
    ? "Demo mode: no email backend is configured yet, so this form cannot send an enquiry. Use the WhatsApp option, or add a form endpoint in js/config.js to go live."
    : "Your enquiry is sent securely to our team. We aim to respond within one business day.";

  // SA phone: 0XXXXXXXXX (10 digits) or +27XXXXXXXXX / 27XXXXXXXXX
  function validPhone(v) {
    var d = v.replace(/[\s()-]/g, "");
    return /^0\d{9}$/.test(d) || /^\+?27\d{9}$/.test(d);
  }
  function setErr(field, on) { field.closest(".field").classList.toggle("invalid", on); }

  // Select the <option> whose text/value matches `val` (case-insensitive).
  // Returns true if a match was found and applied.
  function selectByText(sel, val) {
    if (!sel || !val) return false;
    var target = String(val).trim().toLowerCase();
    var matched = false;
    Array.prototype.forEach.call(sel.options, function (o) {
      var text = (o.value || o.textContent).trim().toLowerCase();
      if (!matched && text === target) { sel.value = o.value || o.textContent; matched = true; }
    });
    if (matched) sel.dispatchEvent(new Event("change", { bubbles: true }));
    return matched;
  }

  // Briefly highlight a field so the user sees what was auto-filled.
  function flash(el) {
    if (!el) return;
    var field = el.closest(".field") || el;
    field.classList.add("prefilled");
    setTimeout(function () { field.classList.remove("prefilled"); }, 1600);
  }

  // Auto-populate the quote form when any service card, menu category or
  // package "Enquire" control is clicked. The #quote href handles scrolling.
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-prefill-service],[data-prefill-event],[data-prefill-package],[data-prefill-note]");
    if (!b) return;

    var service = b.getAttribute("data-prefill-service");
    var event = b.getAttribute("data-prefill-event");
    var pkg = b.getAttribute("data-prefill-package");
    var note = b.getAttribute("data-prefill-note") || pkg;

    if (service && selectByText($("#q-service"), service)) flash($("#q-service"));
    if (event && selectByText($("#q-eventType"), event)) flash($("#q-eventType"));

    if (note) {
      var msg = $("#q-message");
      var line = pkg
        ? "I'm interested in the " + pkg + "."
        : "I'd like to enquire about " + note + ".";
      if (msg && msg.value.indexOf(line) === -1) {
        msg.value = line + (msg.value ? "\n" + msg.value : "");
        flash(msg);
      }
    }
  });

  function validate() {
    var ok = true;
    var req = ["q-name", "q-email", "q-phone", "q-eventType", "q-service", "q-date", "q-guests", "q-venue"];
    req.forEach(function (id) {
      var f = $("#" + id), empty = !f.value.trim(), bad = empty;
      if (id === "q-email" && !empty) bad = !emailRe.test(f.value.trim());
      if (id === "q-phone" && !empty) bad = !validPhone(f.value.trim());
      setErr(f, bad); if (bad) ok = false;
    });
    var consent = $("#q-consent");
    consent.closest(".form__consent").style.color = consent.checked ? "" : "var(--red)";
    if (!consent.checked) ok = false;
    return ok;
  }

  function collect() {
    return {
      name: $("#q-name").value.trim(), email: $("#q-email").value.trim(),
      phone: $("#q-phone").value.trim(), eventType: $("#q-eventType").value,
      service: $("#q-service").value, date: $("#q-date").value,
      guests: $("#q-guests").value, venue: $("#q-venue").value.trim(),
      message: $("#q-message").value.trim()
    };
  }

  function waMessage(d) {
    return "Hello Dube Flame & Feast, I'd like to request a quote.\n\n" +
      "Name: " + d.name + "\nEmail: " + d.email + "\nPhone: " + d.phone + "\n" +
      "Event Type: " + d.eventType + "\nCatering Service: " + d.service + "\n" +
      "Event Date: " + d.date + "\nGuests: " + d.guests + "\nVenue/Area: " + d.venue + "\n" +
      (d.message ? "Notes: " + d.message : "");
  }

  function showStatus(type, msg) {
    status.className = "form__status show " + type;
    status.textContent = msg;
  }

  $$("#quoteForm input, #quoteForm select, #quoteForm textarea").forEach(function (f) {
    f.addEventListener("input", function () { setErr(f, false); });
  });

  $("#quoteWhatsApp").addEventListener("click", function () {
    if (!validate()) { showStatus("error", "Please complete the required fields first, then we'll open WhatsApp with your details."); return; }
    window.open(waLink(waMessage(collect())), "_blank", "noopener");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.className = "form__status";
    if (form.company && form.company.value) return; // honeypot
    if (!validate()) { showStatus("error", "Please fix the highlighted fields and accept the consent box."); return; }

    var data = collect();
    if (demo) {
      showStatus("info", "No email backend is configured yet, so nothing was sent. Tap \u201CEnquire via WhatsApp\u201D to send your details now \u2014 or add a form endpoint in config.js.");
      return;
    }

    submit.classList.add("loading"); submit.disabled = true;
    fetch(cfg.quoteEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(Object.assign({}, data, { _subject: "New catering enquiry — Dube Flame & Feast", to: cfg.ownerEmail }))
    }).then(function (res) {
      if (res.ok) { form.reset(); showStatus("success", "Thank you! Your enquiry has been sent. We'll be in touch within one business day."); }
      else { showStatus("error", "Sorry, something went wrong sending your enquiry. Please try again or use the WhatsApp option."); }
    }).catch(function () {
      showStatus("error", "We couldn't reach the server. Please check your connection or use the WhatsApp option.");
    }).then(function () {
      submit.classList.remove("loading"); submit.disabled = false;
    });
  });
};
