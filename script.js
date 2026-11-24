/* ==========================================================
   WAQAS COLLECTION – script.js  (vanilla JS, no dependencies)
   Sections:
   1. CONFIG          – announcement text, currency, etc.
   2. PRODUCTS        – edit/add products here
   3. Helpers + state
   4. Rendering
   5. Cart / Wishlist
   6. Layers (drawers/modals)
   7. Checkout
   8. Events + init
   ========================================================== */
(() => {
  "use strict";

  /* ---------- 1. CONFIG (edit freely) ---------- */
  const CONFIG = {
    announcement: "Free Delivery Across Pakistan",
    welcome: "Welcome to Waqas Collection",
    currency: "Rs.",
    categories: [
      {
        name: "Fashion",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fashion-category-hfFBDap9k5rrazgPox6kl0nLvg9Lba.jpg",
      },
      { name: "Bedding", image: "assets/products/3d-panel-blanket.jpg" },
      {
        name: "Home Textiles",
        image: "assets/products/bin-saeed-airjet-khaddar.jpg",
      },
      { name: "Lifestyle", image: "assets/products/smart-electric-kettle.jpg" },
    ],
    policies: {
      "Shipping Policy":
        "Demo text: Free delivery across Pakistan. Orders are typically delivered in 3–5 working days. Replace this text with your real shipping policy.",
      "Return & Refund":
        "Demo text: Unused items may be returned within 7 days. Replace this text with your real return policy.",
      "Privacy Policy":
        "Demo text: This is a frontend demo. No personal data is sent anywhere. Replace with your real privacy policy.",
      "Terms & Conditions":
        "Demo text: Replace this text with your real terms and conditions.",
    },
  };

  /* ---------- 2. PRODUCTS (edit/add items here) ----------
     image: "" → generated placeholder. To use your own photo:
            image: "assets/products/lawn-suit.jpg"  (or any https URL)
     price = regular price, salePrice = optional discounted price
     badge: "Sale" | "New" | "Best Seller" | ""
     added: date used for the "Newest" sort and New Arrivals
     featured: true → shown in the "Featured Products" selection                  */
  const PRODUCTS = [
    {
      id: 1,
      name: "Palachi Velvet 2-Piece Suit",
      category: "Fashion",
      price: 2350,
      salePrice: null,
      badge: "Winter 2026",
      added: "2026-11-24",
      featured: true,
      stock: 8,
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      description:
        "Printed Plachi velvet shirt and matching plain velvet trousers. Soft winter touch, wide-width fabric and a rich floral look for casual or party wear.",
    },
    {
      id: 2,
      name: "Patchwork King Bedsheet",
      category: "Bedding",
      price: 1300,
      salePrice: null,
      badge: "Export Quality",
      added: "2026-11-24",
      featured: true,
      stock: 10,
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
      description:
        "King-size cotton-mix bedsheet with embroidered or panel patchwork. Export-quality finish.",
    },
    {
      id: 3,
      name: "Premium Puffy Bedsheet Set",
      category: "Bedding",
      price: 4200,
      salePrice: null,
      badge: "Winter Pick",
      added: "2026-11-24",
      featured: true,
      stock: 7,
      image:
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
      description:
        "Puffy, cosy king-size bedsheet (95 × 95 in) with two pillow covers (19 × 29 in), modern prints and a durable finish.",
    },
    {
      id: 4,
      name: "Airjet Dhanak Embroidered Suit — Bareeze",
      category: "Fashion",
      price: 4600,
      salePrice: null,
      badge: "Winter 2026",
      added: "2026-11-24",
      featured: true,
      stock: 5,
      image:
        "assets/products/airjet-breeze.jpeg",
      description:
        "Full-procedure Airjet Dhanak with embroidered shirt, sleeves, back, dyed trouser and embroidered Dhanak shawl.",
    },
    {
      id: 5,
      name: "Airjet Dhanak Suit — ELAF 1388",
      category: "Fashion",
      price: 4300,
      salePrice: null,
      badge: "Winter 2026",
      added: "2026-11-24",
      featured: true,
      stock: 5,
      image: "assets/products/elaf-airjet-dhanak.jpg",
      description:
        "Premium Airjet Dhanak three-piece suit with embroidered shirt and a digital-print wool shawl.",
    },
    {
      id: 6,
      name: "Airjet Dhanak Suit — Garnet 1302",
      category: "Fashion",
      price: 3750,
      salePrice: null,
      badge: "Winter 2026",
      added: "2026-11-24",
      featured: true,
      stock: 6,
      image:
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      description:
        "Embroidered Airjet Dhanak shirt and sleeves, dyed trouser and digital-print wool shawl.",
    },
    {
      id: 7,
      name: "Aneela’s Hit Code Dhanak Suit",
      category: "Fashion",
      price: 3850,
      salePrice: null,
      badge: "Winter 2026",
      added: "2026-11-24",
      featured: true,
      stock: 5,
      image: "assets/products/aneelas-airjet-dhanak.jpg",
      description:
        "Premium Airjet Dhanak with heavy front and sleeve embroidery, embroidered back and trouser, and a matching embroidered Dhanak shawl.",
    },
    {
      id: 8,
      name: "Digital Print Airjet Slub Khaddar 3-Piece",
      category: "Fashion",
      price: 3600,
      salePrice: null,
      badge: "3-Piece",
      added: "2026-11-24",
      featured: true,
      stock: 6,
      image: "assets/products/bin-saeed-airjet-khaddar.jpg",
      description:
        "Digital-print Airjet Slub Khaddar set with a printed shirt, matching trouser and dupatta.",
    },
    {
      id: 9,
      name: "Batik Dhanak 2-Piece Suit",
      category: "Fashion",
      price: 3000,
      salePrice: null,
      badge: "Winter 2026",
      added: "2026-11-24",
      featured: false,
      stock: 6,
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
      description:
        "Premium Dhanak two-piece with a full heavy-embroidered front, embroidered sleeves and matching Dhanak trouser.",
    },
    {
      id: 10,
      name: "3D Panel Blanket",
      category: "Bedding",
      price: 3400,
      salePrice: null,
      badge: "Winter Pick",
      added: "2026-11-24",
      featured: true,
      stock: 5,
      image: "assets/products/3d-panel-blanket.jpg",
      description:
        "Double-bed blanket with a plush embossed 3D floral panel design.",
    },
    {
      id: 11,
      name: "Rechargeable 2-in-1 Egg & Coffee Beater",
      category: "Lifestyle",
      price: 1600,
      salePrice: null,
      badge: "Type-C",
      added: "2026-11-24",
      featured: false,
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80",
      description:
        "Convenient handheld rechargeable 2-in-1 egg and coffee beater with Type-C charging.",
    },
    {
      id: 12,
      name: "Scarlett 7-Speed Hand Mixer",
      category: "Lifestyle",
      price: 2350,
      salePrice: null,
      badge: "7 Speeds",
      added: "2026-11-24",
      featured: false,
      stock: 8,
      image:
        "https://images.unsplash.com/photo-1578643463396-0997cb5328fc?auto=format&fit=crop&w=900&q=80",
      description:
        "Easy-to-hold Scarlett super hand mixer with seven speed settings.",
    },
    {
      id: 13,
      name: "Smart Electric Kettle",
      category: "Lifestyle",
      price: 2250,
      salePrice: null,
      badge: "New",
      added: "2026-11-24",
      featured: true,
      stock: 10,
      image: "assets/products/smart-electric-kettle.jpg",
      description:
        "Stainless-steel electric kettle with a 2-year warranty and easy-pour handle.",
    },
    {
      id: 14,
      name: "3-Piece Palachi Bedsheet Set",
      category: "Bedding",
      price: 3900,
      salePrice: null,
      badge: "New",
      added: "2026-11-24T23:59:00",
      featured: true,
      stock: 8,
      image: "assets/products/palachi-bedsheet.jpg",
      description:
        "King-size laced bedsheet (95 × 95 in) with two matching laced pillow covers and elegant gift-bag packaging.",
    },
    {
      id: 15,
      name: "Pure Cotton 3-Piece Bedsheet",
      category: "Bedding",
      price: 2650,
      salePrice: null,
      badge: "Pure Cotton",
      added: "2026-11-24T23:59:00",
      featured: true,
      stock: 8,
      image: "assets/products/pure-cotton-bedsheet.jpg",
      description:
        "Soft 100% cotton set with a 98 × 98 in king bedsheet and two 19 × 29 in pillow covers.",
    },
    {
      id: 16,
      name: "Ultrasonic Sofa Cover — 5 Seater",
      category: "Home Textiles",
      price: 3800,
      salePrice: null,
      badge: "New",
      added: "2026-11-24T23:59:00",
      featured: true,
      stock: 8,
      image: "assets/products/ultrasonic-sofa-cover.jpg",
      description:
        "Soft layered microfiber sofa cover with a polyester middle layer and non-woven backing. Fits a 3+1+1, five-seat arrangement.",
    },
    {
      id: 17,
      name: "Ultrasonic Sofa Cover — 6 Seater",
      category: "Home Textiles",
      price: 4100,
      salePrice: null,
      badge: "New",
      added: "2026-11-24T23:59:00",
      featured: true,
      stock: 8,
      image: "assets/products/ultrasonic-sofa-cover.jpg",
      description:
        "Soft layered microfiber sofa cover with a polyester middle layer and non-woven backing. Fits a 3+2+1, six-seat arrangement.",
    },
    {
      id: 18,
      name: "Ultrasonic Sofa Cover — 7 Seater",
      category: "Home Textiles",
      price: 4500,
      salePrice: null,
      badge: "New",
      added: "2026-11-24T23:59:00",
      featured: true,
      stock: 8,
      image: "assets/products/ultrasonic-sofa-cover.jpg",
      description:
        "Soft layered microfiber sofa cover with a polyester middle layer and non-woven backing. Fits a 3+2+1+1, seven-seat arrangement.",
    },
  ];

  /* ---------- 3. Helpers + state ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k, d) {
      try {
        const v = JSON.parse(localStorage.getItem(k));
        return v ?? d;
      } catch {
        return d;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, JSON.stringify(v));
      } catch {
        /* storage unavailable */
      }
    },
  };
  const money = (n) =>
    `${CONFIG.currency} ${Number(n).toLocaleString("en-US")}`;
  const esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const unitPrice = (p) => p.salePrice ?? p.price;
  const byId = (id) => PRODUCTS.find((p) => p.id === Number(id));

  const PALETTE = {
    Fashion: ["#0d5c38", "#C49A43"],
    Bedding: ["#073D25", "#8fb59f"],
    "Home Textiles": ["#7a1f3d", "#C49A43"],
    Lifestyle: ["#1b4f6b", "#e0c27a"],
  };
  function placeholder(label, category) {
    const [a, b] = PALETTE[category] || PALETTE.Fashion;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="500" fill="url(#g)"/><circle cx="200" cy="210" r="70" fill="none" stroke="#F9F3E5" stroke-opacity=".5" stroke-width="2"/><text x="200" y="225" text-anchor="middle" font-family="Georgia,serif" font-size="56" fill="#F9F3E5">W</text><text x="200" y="340" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="#F9F3E5">${esc(label).slice(0, 32)}</text><text x="200" y="372" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" letter-spacing="4" fill="#F9F3E5" fill-opacity=".8">${esc(category).toUpperCase()}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  const imgSrc = (p) => p.image || placeholder(p.name, p.category);
  const imgTag = (p, extra = "") =>
    `<img src="${esc(imgSrc(p))}" alt="${esc(p.name)}" data-ph="${esc(p.name)}" data-cat="${esc(p.category)}" loading="lazy" ${extra}>`;

  let cart = store.get("wc_cart", []);
  let wishlist = store.get("wc_wishlist", []);
  const stock = store.get(
    "wc_stock",
    Object.fromEntries(PRODUCTS.map((p) => [p.id, p.stock])),
  );
  PRODUCTS.forEach((p) => {
    p.stock = Number.isFinite(stock[p.id]) ? stock[p.id] : p.stock;
  });
  const view = {
    category: "all",
    search: "",
    sort: "default",
    wishlistOnly: false,
  };
  let qvQty = 1,
    lastFocus = null;
  const layerStack = [];

  /* ---------- 4. Rendering ---------- */
  function cardHTML(p) {
    const tagClass =
      p.badge === "Sale" ? "sale" : p.badge === "New" ? "new" : "best";
    const wished = wishlist.includes(p.id);
    return `
    <article class="card" data-id="${p.id}">
      <div class="card__media">
        ${imgTag(p, `data-action="quick-view" data-id="${p.id}"`)}
        ${p.badge ? `<span class="tag tag--${tagClass}">${esc(p.badge)}</span>` : ""}
        <button class="icon-btn wish ${wished ? "is-active" : ""}" data-action="wish" data-id="${p.id}" aria-pressed="${wished}" aria-label="${wished ? "Remove" : "Add"} ${esc(p.name)} ${wished ? "from" : "to"} wishlist"><svg class="icon"><use href="#i-heart"/></svg></button>
        <button class="quick" data-action="quick-view" data-id="${p.id}"><svg class="icon"><use href="#i-eye"/></svg> Quick View</button>
      </div>
      <div class="card__body">
        <span class="card__cat">${esc(p.category)}</span>
        <h3 class="card__title">${esc(p.name)}</h3>
        <div class="price">${money(unitPrice(p))}${p.salePrice ? `<s>${money(p.price)}</s>` : ""}</div>
        <p class="stock-note" aria-label="${p.stock} in stock">${p.stock > 0 ? `${p.stock} available` : "Out of stock"}</p>
        <button class="btn btn--green" data-action="add" data-id="${p.id}" ${p.stock < 1 ? "disabled" : ""}>${p.stock > 0 ? "Add to Cart" : "Sold Out"}</button>
      </div>
    </article>`;
  }

  function renderCategories() {
    $("#catGrid").innerHTML = CONFIG.categories
      .map((c) => {
        const src = c.image || placeholder(c.name, c.name);
        return `<a href="#shop" class="cat-card" data-category="${esc(c.name)}">
        <div class="cat-card__img"><img src="${esc(src)}" alt="${esc(c.name)} collection" data-ph="${esc(c.name)}" data-cat="${esc(c.name)}" loading="lazy"></div>
        <h3>${esc(c.name)}</h3><span>Explore Collection <svg class="icon"><use href="#i-arrow"/></svg></span></a>`;
      })
      .join("");
  }

  function getVisible() {
    let list = PRODUCTS.slice();
    const hasFilter =
      view.category !== "all" || view.search || view.wishlistOnly;
    // Default homepage view shows featured items only; any filter/search/sort shows everything.
    if (!hasFilter && view.sort === "default")
      list = list.filter((p) => p.featured);
    if (view.category !== "all")
      list = list.filter((p) => p.category === view.category);
    if (view.wishlistOnly) list = list.filter((p) => wishlist.includes(p.id));
    if (view.search) {
      const q = view.search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (view.sort === "low") list.sort((a, b) => unitPrice(a) - unitPrice(b));
    if (view.sort === "high") list.sort((a, b) => unitPrice(b) - unitPrice(a));
    if (view.sort === "new")
      list.sort((a, b) => new Date(b.added) - new Date(a.added));
    return list;
  }

  function renderShop() {
    const list = getVisible();
    $("#productGrid").innerHTML = list.map(cardHTML).join("");
    $("#noResults").hidden = list.length > 0;
    $("#productGrid").hidden = list.length === 0;

    const parts = [];
    if (view.wishlistOnly) parts.push("<b>Wishlist</b>");
    else if (view.category !== "all")
      parts.push(`Category: <b>${esc(view.category)}</b>`);
    if (view.search) parts.push(`Search: <b>“${esc(view.search)}”</b>`);
    const filtered = parts.length > 0;
    $("#activeFilter").innerHTML = filtered
      ? `Showing ${list.length} result${list.length === 1 ? "" : "s"} · ${parts.join(" · ")} <button data-action="reset-filters">Clear</button>`
      : "";
    $("#shopTitle").textContent = view.wishlistOnly
      ? "Your Wishlist"
      : view.category !== "all"
        ? view.category
        : view.sort !== "default"
          ? "All Products"
          : "Featured Products";

    $("#noResultsMsg").textContent =
      view.wishlistOnly && !view.search
        ? "Tap the heart on any product to save it here."
        : view.search
          ? `We couldn’t find anything matching “${view.search}”. Try a different word.`
          : "Nothing here yet.";

    $$("#chips .chip").forEach((ch) => {
      const active = view.wishlistOnly
        ? ch.dataset.action === "show-wishlist"
        : ch.dataset.category && ch.dataset.category === view.category;
      ch.classList.toggle("is-active", !!active);
      ch.setAttribute("aria-pressed", String(!!active));
    });
    $("#sortSelect").value = view.sort;
  }

  function renderArrivals() {
    const list = PRODUCTS.slice()
      .sort((a, b) => new Date(b.added) - new Date(a.added))
      .slice(0, 4);
    $("#arrivalGrid").innerHTML = list.map(cardHTML).join("");
  }
  const refreshCards = () => {
    renderShop();
    renderArrivals();
  };

  /* ---------- 5. Cart / Wishlist ---------- */
  const cartCount = () => cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = () =>
    cart.reduce((s, i) => s + unitPrice(byId(i.id)) * i.qty, 0);

  function saveCart() {
    store.set("wc_cart", cart);
    renderCart();
  }
  function addToCart(id, qty = 1, openDrawer = false) {
    const product = byId(id);
    if (!product || product.stock < qty) {
      toast("Sorry, this item is out of stock.");
      return;
    }
    const item = cart.find((i) => i.id === Number(id));
    if (item && item.qty >= product.stock) {
      toast("You have added all available stock.");
      return;
    }
    if (item) item.qty = Math.min(product.stock, item.qty + qty);
    else cart.push({ id: Number(id), qty });
    saveCart();
    toast(`Added to cart: ${product.name}`);
    if (openDrawer) openLayer("cartDrawer");
  }
  function changeQty(id, delta) {
    const item = cart.find((i) => i.id === Number(id));
    if (!item) return;
    const product = byId(id);
    item.qty = Math.min(product.stock, item.qty + delta);
    if (item.qty <= 0) cart = cart.filter((i) => i !== item);
    saveCart();
  }
  function removeFromCart(id) {
    cart = cart.filter((i) => i.id !== Number(id));
    saveCart();
  }

  function renderCart() {
    cart = cart.filter((i) => byId(i.id)); // drop products that no longer exist
    const count = cartCount();
    const badge = $("#cartCount");
    badge.textContent = count;
    badge.hidden = count === 0;
    const body = $("#cartBody"),
      foot = $("#cartFoot");
    if (!cart.length) {
      body.innerHTML = `<div class="empty"><svg class="icon"><use href="#i-bag"/></svg><h3>Your cart is empty</h3><p>Discover something lovely from our collection.</p></div>`;
      foot.innerHTML = `<button class="btn btn--green btn--block" data-action="continue">Continue Shopping</button>`;
      return;
    }
    body.innerHTML = cart
      .map((i) => {
        const p = byId(i.id);
        return `<div class="cart-item">
        ${imgTag(p)}
        <div><h4>${esc(p.name)}</h4><div class="price">${money(unitPrice(p))}</div>
          <div class="qty"><button data-action="dec" data-id="${p.id}" aria-label="Decrease quantity"><svg class="icon"><use href="#i-minus"/></svg></button><span aria-live="polite">${i.qty}</span><button data-action="inc" data-id="${p.id}" aria-label="Increase quantity"><svg class="icon"><use href="#i-plus"/></svg></button></div></div>
        <button class="remove" data-action="remove" data-id="${p.id}" aria-label="Remove ${esc(p.name)}"><svg class="icon"><use href="#i-trash"/></svg></button>
      </div>`;
      })
      .join("");
    foot.innerHTML = `
      <div class="row"><span>Subtotal</span><strong>${money(cartTotal())}</strong></div>
      <div class="row"><span>Delivery</span><span>Free</span></div>
      <button class="btn btn--gold btn--block" data-action="checkout">Proceed to Checkout</button>
      <button class="btn btn--outline btn--block" data-action="continue">Continue Shopping</button>`;
  }

  function toggleWish(id) {
    id = Number(id);
    wishlist = wishlist.includes(id)
      ? wishlist.filter((w) => w !== id)
      : [...wishlist, id];
    store.set("wc_wishlist", wishlist);
    updateWishBadge();
    toast(
      wishlist.includes(id) ? "Saved to wishlist" : "Removed from wishlist",
    );
    refreshCards();
    if (layerStack.includes("quickView")) openQuickView(id, true);
  }
  function updateWishBadge() {
    const b = $("#wishCount");
    b.textContent = wishlist.length;
    b.hidden = wishlist.length === 0;
  }

  /* ---------- 6. Layers: drawers / modals ---------- */
  function openLayer(id) {
    const el = $("#" + id);
    if (!el) return;
    if (!layerStack.length) lastFocus = document.activeElement;
    if (!layerStack.includes(id)) layerStack.push(id);
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    $("#backdrop").classList.add("is-open");
    document.body.classList.add("is-locked");
    const focusEl = $('[data-action="close-layer"], button, input', el);
    if (focusEl) setTimeout(() => focusEl.focus(), 60);
  }
  function closeLayer(id) {
    id = id || layerStack[layerStack.length - 1];
    if (!id) return;
    const el = $("#" + id);
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
    const i = layerStack.indexOf(id);
    if (i > -1) layerStack.splice(i, 1);
    if (!layerStack.length) {
      $("#backdrop").classList.remove("is-open");
      document.body.classList.remove("is-locked");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
  }
  const closeAllLayers = () => [...layerStack].forEach(closeLayer);

  function openQuickView(id, keepQty) {
    const p = byId(id);
    if (!p) return;
    if (!keepQty) qvQty = 1;
    const wished = wishlist.includes(p.id);
    $("#quickViewBody").innerHTML = `
      <div class="qv">
        <div class="qv__img">${imgTag(p)}</div>
        <div>
          <span class="card__cat">${esc(p.category)}</span>
          <h2>${esc(p.name)}</h2>
          <div class="price">${money(unitPrice(p))}${p.salePrice ? `<s>${money(p.price)}</s>` : ""}</div>
          <p>${esc(p.description)}</p>
          <div class="qv__actions">
            <div class="qty"><button data-action="qv-dec" aria-label="Decrease quantity"><svg class="icon"><use href="#i-minus"/></svg></button><span id="qvQty">${qvQty}</span><button data-action="qv-inc" aria-label="Increase quantity"><svg class="icon"><use href="#i-plus"/></svg></button></div>
            <button class="btn btn--green" data-action="qv-add" data-id="${p.id}">Add to Cart</button>
            <button class="icon-btn wish ${wished ? "is-active" : ""}" style="position:static;border:1px solid var(--border)" data-action="wish" data-id="${p.id}" aria-pressed="${wished}" aria-label="Toggle wishlist"><svg class="icon"><use href="#i-heart"/></svg></button>
          </div>
        </div>
      </div>`;
    openLayer("quickView");
  }

  /* ---------- 7. Checkout (DEMO ONLY – nothing is sent anywhere) ---------- */
  function openCheckout() {
    if (!cart.length) {
      toast("Your cart is empty");
      return;
    }
    closeLayer("cartDrawer");
    $("#checkoutBody").innerHTML = `
      <div class="checkout">
        <form id="checkoutForm" novalidate>
          <h2>Checkout</h2>
          <div class="grid-2">
            <div class="field"><label for="coName">Full name *</label><input id="coName" name="name" autocomplete="name" required><span class="error"></span></div>
            <div class="field"><label for="coPhone">Phone *</label><input id="coPhone" name="phone" type="tel" autocomplete="tel" placeholder="03XX XXXXXXX" required><span class="error"></span></div>
          </div>
          <div class="field"><label for="coEmail">Email *</label><input id="coEmail" name="email" type="email" autocomplete="email" required><span class="error"></span></div>
          <div class="field"><label for="coAddress">Address *</label><input id="coAddress" name="address" autocomplete="street-address" required><span class="error"></span></div>
          <div class="field"><label for="coCity">City *</label><input id="coCity" name="city" autocomplete="address-level2" required><span class="error"></span></div>
          <h3>Payment method</h3>
          <div class="pay"><label><input type="radio" name="pay" value="Cash on Delivery" checked><span><strong>Cash on Delivery</strong><br><small>Confirm your order with us on WhatsApp.</small></span></label></div>
          <button class="btn btn--gold btn--block" type="submit">Send Order on WhatsApp</button>
          <p class="note">Your order details will open in WhatsApp. Please press Send in WhatsApp to complete your order request.</p>
        </form>
        <aside class="summary" aria-label="Order summary">
          <h3>Order summary</h3>
          <ul>${cart
            .map((i) => {
              const p = byId(i.id);
              return `<li><span>${esc(p.name)} × ${i.qty}</span><span>${money(unitPrice(p) * i.qty)}</span></li>`;
            })
            .join("")}</ul>
          <div class="row"><span>Subtotal</span><span>${money(cartTotal())}</span></div>
          <div class="row"><span>Delivery</span><span>Free</span></div>
          <div class="row row--total"><span>Total</span><span>${money(cartTotal())}</span></div>
        </aside>
      </div>`;
    openLayer("checkoutModal");
  }

  function setError(input, msg) {
    const f = input.closest(".field");
    f.classList.toggle("has-error", !!msg);
    const e = $(".error", f);
    if (e) e.textContent = msg || "";
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  }
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const phoneOk = (v) => {
    const d = v.replace(/[\s\-()]/g, "");
    return /^(\+92|0092|0)?3\d{9}$/.test(d) || /^(\+92|0)\d{9,10}$/.test(d);
  };

  function submitCheckout(form) {
    const f = form.elements;
    const checks = [
      setError(
        f.name,
        f.name.value.trim().length < 2 ? "Please enter your full name." : "",
      ),
      setError(
        f.phone,
        !phoneOk(f.phone.value.trim())
          ? "Enter a valid Pakistani phone number."
          : "",
      ),
      setError(
        f.email,
        !emailOk(f.email.value.trim()) ? "Enter a valid email address." : "",
      ),
      setError(
        f.address,
        f.address.value.trim().length < 5 ? "Please enter your address." : "",
      ),
      setError(
        f.city,
        f.city.value.trim().length < 2 ? "Please enter your city." : "",
      ),
    ];
    if (checks.includes(false)) {
      const bad = $(".has-error input", form);
      if (bad) bad.focus();
      return;
    }

    const orderNo = "WC-" + Date.now().toString().slice(-8);
    const total = cartTotal();
    const name = f.name.value.trim();
    const lines = cart.map((item) => {
      const product = byId(item.id);
      return `• ${product.name} × ${item.qty} — ${money(unitPrice(product) * item.qty)}`;
    });
    const message = [
      "New order for Waqas Collection",
      `Order: ${orderNo}`,
      "",
      "Customer details:",
      `Name: ${name}`,
      `Phone: ${f.phone.value.trim()}`,
      `Email: ${f.email.value.trim()}`,
      `Address: ${f.address.value.trim()}`,
      `City: ${f.city.value.trim()}`,
      "",
      "Items:",
      ...lines,
      "",
      `Total: ${money(total)}`,
      `Payment: ${f.pay.value}`,
    ].join("\n");
    window.open(
      `https://wa.me/923281690695?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    cart.forEach((item) => {
      byId(item.id).stock = Math.max(0, byId(item.id).stock - item.qty);
    });
    store.set(
      "wc_stock",
      Object.fromEntries(
        PRODUCTS.map((product) => [product.id, product.stock]),
      ),
    );
    cart = [];
    saveCart();
    renderShop();
    renderArrivals();
    $("#checkoutBody").innerHTML = `
      <div class="success">
        <div class="check" aria-hidden="true">✓</div>
        <h2>Thank you, ${esc(name)}!</h2>
        <p>Order <strong>${orderNo}</strong> is ready in WhatsApp with your items and delivery details.</p>
        <p class="note">Please press Send in the WhatsApp window to submit your order to Waqas Collection.</p>
        <button class="btn btn--green" data-action="close-layer">Continue Shopping</button>
      </div>`;
  }

  /* ---------- Misc UI ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-show"), 2200);
  }
  function scrollToShop() {
    const s = $("#shop");
    if (s)
      s.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
  }
  function setCategory(cat) {
    view.category = cat;
    view.wishlistOnly = false;
    if (cat === "all") {
      view.search = "";
      $("#searchInput").value = "";
    }
    renderShop();
  }
  function resetFilters() {
    Object.assign(view, {
      category: "all",
      search: "",
      sort: "default",
      wishlistOnly: false,
    });
    $("#searchInput").value = "";
    renderShop();
  }
  function toggleSearch(force) {
    const panel = $("#searchPanel"),
      btn = $('[data-action="toggle-search"]');
    const open = force ?? panel.hidden;
    panel.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    if (open) $("#searchInput").focus();
  }
  function showInfo(title) {
    $("#infoBody").innerHTML =
      `<h2>${esc(title)}</h2><p style="margin-top:12px">${esc(CONFIG.policies[title] || "Content coming soon.")}</p>`;
    openLayer("infoModal");
  }
  function openAccount() {
    $("#infoBody").innerHTML = `
      <h2>My Account</h2>
      <p class="note">Demo sign-in – accounts are not connected to any backend.</p>
      <form id="accountForm" novalidate style="margin-top:14px">
        <div class="field"><label for="acEmail">Email</label><input id="acEmail" type="email" autocomplete="email"><span class="error"></span></div>
        <div class="field"><label for="acPass">Password</label><input id="acPass" type="password" autocomplete="current-password"><span class="error"></span></div>
        <button class="btn btn--green btn--block" type="submit">Sign in (demo)</button>
      </form>`;
    openLayer("infoModal");
  }
  function handleNewsletter(form) {
    const input = $("input", form),
      msg = $(".form-msg", form);
    const v = input.value.trim();
    if (!emailOk(v)) {
      msg.className = "form-msg bad";
      msg.textContent = "Please enter a valid email address.";
      input.focus();
      return;
    }
    msg.className = "form-msg ok";
    msg.textContent =
      "Thank you for subscribing! (Demo only – your email was not saved.)";
    input.value = "";
  }

  /* ---------- 8. Events + init ---------- */
  document.addEventListener("click", (e) => {
    // Category / filter links (nav, cards, chips, hero CTA)
    const catEl = e.target.closest("[data-category]");
    if (catEl && !e.target.closest('[data-action="wish"]')) {
      e.preventDefault();
      closeAllLayers();
      setCategory(catEl.dataset.category);
      scrollToShop();
      return;
    }
    const polEl = e.target.closest("[data-policy]");
    if (polEl) {
      e.preventDefault();
      showInfo(polEl.dataset.policy.replace(/&amp;/g, "&"));
      return;
    }

    const t = e.target.closest("[data-action]");
    if (!t) return;
    const id = t.dataset.id;
    switch (t.dataset.action) {
      case "add":
        addToCart(id);
        break;
      case "wish":
        toggleWish(id);
        break;
      case "quick-view":
        openQuickView(id);
        break;
      case "qv-inc":
        qvQty = Math.min(99, qvQty + 1);
        $("#qvQty").textContent = qvQty;
        break;
      case "qv-dec":
        qvQty = Math.max(1, qvQty - 1);
        $("#qvQty").textContent = qvQty;
        break;
      case "qv-add":
        addToCart(id, qvQty);
        closeLayer("quickView");
        openLayer("cartDrawer");
        break;
      case "inc":
        changeQty(id, 1);
        break;
      case "dec":
        changeQty(id, -1);
        break;
      case "remove":
        removeFromCart(id);
        break;
      case "open-cart":
        openLayer("cartDrawer");
        break;
      case "open-nav":
        openLayer("mobileNav");
        break;
      case "close-layer":
        closeLayer();
        break;
      case "continue":
        closeLayer("cartDrawer");
        scrollToShop();
        break;
      case "checkout":
        openCheckout();
        break;
      case "toggle-search":
        toggleSearch();
        break;
      case "clear-search":
        view.search = "";
        $("#searchInput").value = "";
        $("#searchInput").focus();
        renderShop();
        break;
      case "open-account":
        e.preventDefault();
        closeAllLayers();
        openAccount();
        break;
      case "show-wishlist":
        e.preventDefault();
        closeAllLayers();
        view.wishlistOnly = true;
        view.category = "all";
        renderShop();
        scrollToShop();
        break;
      case "reset-filters":
        resetFilters();
        break;
      case "view-all-new":
        closeAllLayers();
        Object.assign(view, {
          category: "all",
          search: "",
          wishlistOnly: false,
          sort: "new",
        });
        renderShop();
        scrollToShop();
        break;
      case "go-home":
        e.preventDefault();
        closeAllLayers();
        resetFilters();
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
    }
  });

  // Anchor links to About/Contact inside layers should close them
  $$('#mobileNav a[href^="#"]').forEach((a) =>
    a.addEventListener("click", () => closeAllLayers()),
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (layerStack.length) closeLayer();
      else if (!$("#searchPanel").hidden) toggleSearch(false);
    }
  });

  document.addEventListener("submit", (e) => {
    const form = e.target;
    e.preventDefault();
    if (form.id === "checkoutForm") submitCheckout(form);
    else if (form.id === "searchForm") {
      view.search = $("#searchInput").value.trim();
      view.wishlistOnly = false;
      renderShop();
      scrollToShop();
    } else if (form.classList.contains("js-newsletter")) handleNewsletter(form);
    else if (form.id === "contactForm") {
      const ok = [
        setError(
          $("#cName"),
          $("#cName").value.trim().length < 2 ? "Please enter your name." : "",
        ),
        setError(
          $("#cEmail"),
          !emailOk($("#cEmail").value.trim()) ? "Enter a valid email." : "",
        ),
        setError(
          $("#cMsg"),
          $("#cMsg").value.trim().length < 5
            ? "Please write a short message."
            : "",
        ),
      ];
      const msg = $(".form-msg", form);
      if (ok.includes(false)) {
        msg.className = "form-msg bad";
        msg.textContent = "Please fix the highlighted fields.";
        return;
      }
      msg.className = "form-msg ok";
      msg.textContent = "Thanks! (Demo only – your message was not sent.)";
      form.reset();
    } else if (form.id === "accountForm") {
      closeLayer("infoModal");
      toast("Demo sign-in only – no account created");
    }
  });

  // Live search while typing
  $("#searchInput").addEventListener("input", (e) => {
    view.search = e.target.value.trim();
    view.wishlistOnly = false;
    renderShop();
  });
  $("#sortSelect").addEventListener("change", (e) => {
    view.sort = e.target.value;
    renderShop();
  });

  // Sticky-header shadow
  const header = $("#header");
  const onScroll = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Image fallbacks (never show broken images)
  document.addEventListener(
    "error",
    (e) => {
      const img = e.target;
      if (!(img instanceof HTMLImageElement)) return;
      if (img.dataset.logo !== undefined) {
        img.closest(".logo").classList.add("logo--fallback");
        return;
      }
      if (img.id === "heroImg") {
        $("#hero").classList.remove("hero--has-image");
        return;
      }
      if (img.dataset.failed || !img.dataset.ph) return;
      img.dataset.failed = "1";
      img.src = placeholder(img.dataset.ph, img.dataset.cat || "Fashion");
    },
    true,
  );

  // Hero: show banner only when it actually loads
  const heroImg = $("#heroImg");
  const heroLoaded = () => $("#hero").classList.add("hero--has-image");
  if (heroImg.complete && heroImg.naturalWidth > 0) heroLoaded();
  else heroImg.addEventListener("load", heroLoaded);

  // Story image placeholder (src is blank by default)
  $$("img[data-ph]").forEach((img) => {
    if (!img.getAttribute("src"))
      img.src = placeholder(img.dataset.ph, img.dataset.cat || "Home Textiles");
  });

  // Init
  $("#announceMain").textContent = CONFIG.announcement;
  $("#announceWelcome").textContent = CONFIG.welcome;
  $("#year").textContent = new Date().getFullYear();
  renderCategories();
  renderShop();
  renderArrivals();
  renderCart();
  updateWishBadge();
})();
