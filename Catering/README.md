# Dube Flame & Feast — Website

A premium, one-page catering website for **Dube Flame & Feast** (Dube Signature Catering), a Black South African catering business in Gauteng. Built as a static site — HTML5, CSS3 and vanilla JavaScript. No framework, no build step, no `node_modules`.

## Project structure

```
Catering/
├── index.html
├── css/
│   ├── style.css          # design system + components
│   ├── animations.css     # keyframes, scroll-reveal, reduced-motion
│   └── responsive.css     # breakpoints
├── js/
│   ├── config.js          # ← edit business details here
│   ├── main.js            # content rendering, reveal, hero, smooth scroll
│   ├── navigation.js      # sticky nav, mobile menu, scroll-spy
│   ├── gallery.js         # grid + accessible lightbox
│   ├── quote-form.js      # validation, WhatsApp fallback, submission
│   └── newsletter.js      # email + consent (POPIA), submission
├── assets/
│   ├── images/
│   │   ├── branding/      # logo + favicon (SVG) + placeholder flame
│   │   ├── hero/          # hero backgrounds
│   │   ├── food/          # verified braai / buffet photography
│   │   └── packages/      # package card photography
│   └── icons/
└── README.md
```

## Run it locally

```bash
# Python (built in on macOS)
python3 -m http.server 5173     # visit http://localhost:5173

# or Node
npx serve .
```

You can also open `index.html` directly in a browser.

## Deploy

Static site — upload the whole folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, or FTP). No build command; publish directory is the project root.

## Edit business details — one place

Open **`js/config.js`**. Everything the owner changes lives there:

| Field | What it is |
|---|---|
| `phoneDisplay` / `phoneLink` | Phone (shown / dialable) — **PLACEHOLDER** |
| `whatsappNumber` | WhatsApp number, international format, no `+` — **PLACEHOLDER** |
| `email` | Business email — **PLACEHOLDER** |
| `social.facebook` / `social.instagram` | Social URLs — **PLACEHOLDER** |
| `packages` | Package names, prices, inclusions |
| `food` | Food-showcase / gallery images |
| `team` | Owner names + roles (set `image` to show a real photo) |
| `quoteEndpoint` / `newsletterEndpoint` | Form backends (see below) |
| `testimonials` | Add reviews here to reveal the hidden Testimonials section |

## People photography — branded placeholders (by design)

No photographs of real people are included. Per the brief, we do **not** use stock people to represent a Black South African business or its owners. Every people slot (the two owners, the About panel, two of the four service cards, one menu category) shows a **clean branded placeholder** — a dark panel with the flame mark and a "photograph to be supplied" note.

**To drop in a real photo:**
- **Owners / team:** set `team[n].image` in `config.js` to a file path, e.g. `assets/images/team/thokozani-dube.jpg`. The placeholder is replaced automatically.
- **Service / menu cards:** in `js/main.js`, the `serviceMedia` and `menuCats` arrays mark each slot as either `{ img: "..." }` (photo) or `{ ph: "Label", role: "..." }` (placeholder). Swap a placeholder entry for an `img` entry.

## Make the forms actually send (go live)

Both forms run in **demo mode** until endpoints are set — they validate and guide the user to WhatsApp but never falsely claim an email was sent.

- **Quote form** — set `quoteEndpoint` to a JSON-accepting form service (Formspree, Web3Forms, or your own backend).
- **Newsletter** — set `newsletterEndpoint` to a provider endpoint (Brevo / Mailchimp) or a backend proxy that stores the subscriber, prevents duplicates (`409` = already subscribed) and handles double opt-in + unsubscribe. Do not store subscribers only in the browser.

## Branding / logo

The logo renders from `assets/images/branding/dube-flame-feast-logo.svg` — a crisp, transparent vector of the supplied mark (red flame + "Dube Flame & Feast" + "JOB 22:28"). To use the original artwork, drop a transparent PNG at `assets/images/branding/dube-flame-feast-logo.png` and update `logo` in `config.js`.

## Image sources & licences

All photography is stored locally and deploys with the site (no hotlinking). Every photo is from **Pexels**, used under the [Pexels License](https://www.pexels.com/license/): free for commercial use, no attribution required, modification allowed. Images were reviewed individually; only authentic braai / grilled-meat / buffet food is used.

| File | Subject | Source | Licence |
|---|---|---|---|
| `hero/hero-braai-grid.jpg` | Steaks on an open braai grid | Pexels | Pexels License |
| `hero/hero-buffet.jpg` | Carved roast feast table | Pexels | Pexels License |
| `food/braai-grid.jpg` | Flame-grilled meat on the braai | Pexels | Pexels License |
| `food/braai-fire.jpg` | Coals & flames in a braai | Pexels | Pexels License |
| `food/lamb-braai.jpg` | Grilled meat platter with chips | Pexels | Pexels License |
| `food/chicken-wings.jpg` | Plate of golden wings | Pexels | Pexels License |
| `food/buffet-spread.jpg` | Carved roast feast table | Pexels | Pexels License |
| `packages/lamb-braai.jpg` | Braai meat (Lamb package) | Pexels | Pexels License |
| `packages/pork-spit-braai.jpg` | Roast feast (Pork package) | Pexels | Pexels License |
| `packages/braai-pack.jpg` | Wings plate (Braai Pack) | Pexels | Pexels License |
| `branding/*.svg` | Logo, favicon, placeholder | Original (this project) | — |

These stock photographs are illustrative and are **not** represented as actual photographs of Dube Flame & Feast events.

## Before launch — confirm with the owner

Flagged in the brief and **not invented**:

1. **Phone, WhatsApp, email, Facebook, Instagram** — placeholders in `config.js`.
2. **Package pricing unit** — the brief does **not** state whether the **Lamb Braai (R189)** and **Pork Spit Braai (R169)** are per person, per head or per package; they show the price with a "unit to be confirmed" note. The **Braai Pack** is per person as supplied. All prices **excl. VAT**.
3. **Team & event photography** — supply real photos to replace the branded placeholders.
4. **Testimonials** — none supplied; the section is hidden until entries are added to `config.js`.
5. **Privacy Policy / Website Terms** — footer links point to `#privacy` / `#terms`; add the real documents.

## Tech

- Semantic HTML5, CSS Grid + Flexbox, CSS custom properties, vanilla JS (ES5-safe).
- Fonts: Manrope (UI/body), Merriweather (editorial headings) via Google Fonts.
- Icons: inline SVG (no icon library, no emoji).
- Animations: CSS keyframes + IntersectionObserver; respects `prefers-reduced-motion`.
- SEO + Open Graph metadata, preloaded hero, lazy-loaded below-the-fold images.
