/* ============================================================================
   DUBE FLAME & FEAST — NEWSLETTER
   Email + consent validation (POPIA), demo-safe, 409 = already subscribed.
   ========================================================================== */
window.DFF_newsletter = function () {
  "use strict";
  var D = window.DFF, $ = D.$, cfg = D.cfg, emailRe = D.emailRe;

  var form = $("#newsletterForm");
  if (!form) return;
  var status = $("#newsletterStatus");
  var submit = $("#newsletterSubmit");
  var demo = !cfg.newsletterEndpoint;

  function show(msg) { status.textContent = msg; status.style.color = "#fff"; }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = $("#n-email").value.trim();
    var consent = $("#n-consent").checked;
    if (!emailRe.test(email)) { show("Please enter a valid email address."); return; }
    if (!consent) { show("Please tick the consent box so we can email you (POPIA)."); return; }

    if (demo) {
      show("Thanks! Subscriptions aren't connected to an email provider yet, so you're not on the list. Add a newsletter endpoint in config.js to go live.");
      return;
    }

    submit.classList.add("loading"); submit.disabled = true;
    fetch(cfg.newsletterEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ email: email, consent: true, source: "website" })
    }).then(function (res) {
      if (res.status === 409) { show("You're already subscribed — thank you!"); }
      else if (res.ok) { form.reset(); show("You're subscribed! Watch your inbox for our latest menus and offers."); }
      else { show("Something went wrong. Please try again shortly."); }
    }).catch(function () {
      show("We couldn't reach the server. Please try again shortly.");
    }).then(function () {
      submit.classList.remove("loading"); submit.disabled = false;
    });
  });
};
