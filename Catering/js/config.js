/* ============================================================================
   DUBE FLAME & FEAST — WEBSITE CONFIGURATION
   ----------------------------------------------------------------------------
   Single place to update business details. Items marked PLACEHOLDER must be
   replaced with real information before the site goes live.
   ========================================================================== */

window.DFF_CONFIG = {
  /* ---- Brand ---- */
  brandName: "Dube Flame & Feast",
  formalName: "Dube Signature Catering",
  abbreviation: "DSC",
  tagline: "JOB 22:28",
  logo: "assets/images/branding/dube-flame-feast-logo.svg",

  /* ---- Contact details ---- */
  phoneDisplay: "065 792 5309",               // Business contact number
  phoneLink: "+27657925309",                  // tel: link (intl format)
  whatsappNumber: "27657925309",              // intl format, no +, no spaces
  email: "info@dubecatering.co.za",           // Public enquiries email
  serviceArea: "Gauteng, South Africa",
  guestRange: "approximately 15 to 200 guests",

  /* ---- Social media ----
     Instagram handle: dubeflameandfeast · Facebook page: Dube Flame & Feast */
  social: {
    facebook: "https://www.facebook.com/DubeFlameandFeast",
    instagram: "https://www.instagram.com/dubeflameandfeast",
  },

  /* ---- Form & newsletter integration ----
     Leave endpoints empty ("") to run in DEMO mode (validates + WhatsApp
     fallback, never falsely claims an email was sent). Paste endpoints to
     go live. */
  quoteEndpoint: "",                          // e.g. "https://formspree.io/f/xxxx"
  newsletterEndpoint: "",                     // e.g. Brevo/Mailchimp proxy
  ownerEmail: "info@dubecatering.co.za",      // where quote enquiries are sent

  /* ---- Navigation ---- */
  nav: [
    { label: "Home", target: "#home" },
    { label: "About", target: "#about" },
    { label: "Services", target: "#services" },
    { label: "Menu", target: "#menu" },
    { label: "Gallery", target: "#gallery" },
    { label: "Contact", target: "#contact" },
  ],

  /* ---- Signature spit braai packages (editable) ----
     Prices are EXCL. VAT. The brief does not specify a pricing unit for the
     Lamb and Pork packages — do not invent one. "unit" left blank = confirm. */
  packages: [
    {
      name: "Lamb Braai Package",
      image: "assets/images/food/lamb-rack.jpg",
      price: "R189",
      unit: "per person",
      note: "Price excl. VAT",
      items: ["Full Lamb", "Chicken", "Baby Potatoes", "Garlic Bread or Pap", "Extra Side Item"],
      featured: true,
    },
    {
      name: "Pork Spit Braai",
      image: "assets/images/food/steak-board.jpg",
      price: "R169",
      unit: "per person",
      note: "Price excl. VAT",
      items: ["Full Pork", "Chicken", "Baby Potatoes", "Garlic Bread or Pap", "Extra Side Item"],
      featured: false,
    },
    {
      name: "Braai Pack",
      image: "assets/images/food/braai-platter.jpg",
      price: "R195",
      unit: "per person",
      note: "Price excl. VAT",
      items: ["Lamb Chops", "Boerewors", "Buffalo Wings", "Creamy Potato Salad", "Greek Salad"],
      featured: false,
    },
  ],

  /* ---- Testimonials ----
     EMPTY by design. No testimonials supplied, so the section stays hidden.
     Add { name, eventType, rating, text } objects to populate + reveal it. */
  testimonials: [],

  /* ---- Food showcase + gallery (verified South African braai photography) ---- */
  food: [
    { image: "assets/images/food/lamb-braai.jpg", label: "Flame-grilled meat", tag: "Mains" },
    { image: "assets/images/food/braai-platter.jpg", label: "Braai chicken & wors platter", tag: "Braai Platter" },
    { image: "assets/images/food/braai-fire.jpg", label: "Over the coals", tag: "The Fire" },
    { image: "assets/images/food/lamb-rack.jpg", label: "Roasted lamb", tag: "Lamb" },
    { image: "assets/images/food/chicken-wings.jpg", label: "Golden wings", tag: "Wings" },
    { image: "assets/images/food/steak-board.jpg", label: "Grilled steak & salad", tag: "Mains" },
    { image: "assets/images/food/buffet-spread.jpg", label: "Carved roast feast", tag: "Buffet" },
  ],

  /* ---- People placeholders (Option A) ----
     No people photographs are available yet. Each slot shows a branded panel
     until a real photo is supplied. To use a photo: set `image` to its path
     (e.g. "assets/images/team/thokozani-dube.jpg") and it replaces the panel. */
  team: [
    { image: "", name: "Thokozani Dube", role: "Founder & Owner" },
    { image: "", name: "Nhlanhla Dube", role: "Culinary Partner | Chef de Partie" },
  ],
};
