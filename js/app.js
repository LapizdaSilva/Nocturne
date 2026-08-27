(function () {
  "use strict";

  var products = [
    { id: "pen", name: "Nocturne Pen Wireless", subtitle: "Machine · 3.5 mm stroke", price: 199, art: "pen", imageKey: "products.pen" },
    { id: "ink", name: "Black Pigment 4oz", subtitle: "Ink · Deep black", price: 24.9, art: "ink", imageKey: "products.ink" },
    { id: "cartridge", name: "Round Liner Cartridges", subtitle: "Needles · Box of 20", price: 15.5, art: "cartridge", imageKey: "products.cartridge" },
    { id: "skin", name: "Double Practice Skin", subtitle: "Accessories · Realistic texture", price: 19.9, art: "skin", imageKey: "products.skin" }
  ];
  var cart = [];
  var productGrid = document.getElementById("product-grid");
  var relatedGrid = document.getElementById("related-grid");
  var cartContent = document.getElementById("cart-content");
  var cartDrawer = document.getElementById("cart-drawer");
  var mobileMenu = document.getElementById("mobile-menu");
  var drawerScrim = document.getElementById("drawer-scrim");
  var cartCount = document.getElementById("cart-count");
  var drawerCount = document.getElementById("drawer-count");
  var toast = document.getElementById("toast");
  var toastTimer;

  function imageHref(key) { return key.split(".").reduce(function (result, part) { return result && result[part]; }, window.NOCTURNE_IMAGES || {})?.href || ""; }
  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, function (character) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]; }); }
  function formatPrice(value) { return "US$ " + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function renderConfiguredImages() {
    document.querySelectorAll("[data-image]").forEach(function (placeholder) { var href = imageHref(placeholder.getAttribute("data-image")); if (!href) return; var image = document.createElement("img"); image.src = href; image.alt = placeholder.getAttribute("data-alt") || ""; image.className = placeholder.className.replace(/--placeholder/g, "").trim(); placeholder.replaceWith(image); });
    var faviconHref = imageHref("logo"); if (faviconHref) document.getElementById("favicon").href = faviconHref;
  }
  function productArt(kind, imageKey, label) {
    var href = imageHref(imageKey || "");
    if (href) return '<img class="product-photo" src="' + escapeHtml(href) + '" alt="' + escapeHtml(label || "") + '">';
    if (kind === "pen") return '<div class="product-art product-art--pen" aria-hidden="true"><span class="pen-body"></span><span class="pen-tip"></span></div>';
    if (kind === "ink") return '<div class="product-art product-art--ink" aria-hidden="true"><span class="ink-cap"></span><span class="ink-bottle"></span><span class="ink-label">N</span></div>';
    if (kind === "cartridge") return '<div class="product-art product-art--cartridge" aria-hidden="true"><span class="cartridge-one"></span><span class="cartridge-two"></span><span class="cartridge-three"></span></div>';
    return '<div class="product-art product-art--skin" aria-hidden="true"><span class="skin-card skin-card--back"></span><span class="skin-card skin-card--front"></span></div>';
  }
  function productCard(product, index, related) {
    return '<article class="product-card' + (related ? ' product-card--related' : '') + '"><a class="product-frame product-frame--' + (index + 1) + '" href="#product-detail" aria-label="View ' + escapeHtml(product.name) + '">' + productArt(product.art, product.imageKey, product.name) + '</a><div class="product-meta"><div><h3>' + escapeHtml(product.name) + '</h3><p>' + escapeHtml(product.subtitle) + '</p></div><strong>' + formatPrice(product.price) + '</strong></div><button class="product-quick-add" type="button" data-add="' + product.id + '" aria-label="Add ' + escapeHtml(product.name) + ' to cart">+</button></article>';
  }
  function renderProducts() { productGrid.innerHTML = products.map(function (product, index) { return productCard(product, index, false); }).join(""); relatedGrid.innerHTML = products.slice(1, 4).map(function (product, index) { return productCard(product, index, true); }).join(""); }
  function cartQuantity() { return cart.reduce(function (total, item) { return total + item.quantity; }, 0); }
  function cartSubtotal() { return cart.reduce(function (total, item) { return total + item.price * item.quantity; }, 0); }
  function renderCart() {
    var count = cartQuantity(); cartCount.textContent = count; cartCount.hidden = count === 0; drawerCount.textContent = "(" + count + ")"; document.querySelector("[data-open-cart]").setAttribute("aria-label", "Open cart, " + count + " items");
    if (!cart.length) { cartContent.innerHTML = '<div class="empty-cart"><span class="empty-bag" aria-hidden="true"></span><h3>Your bench is waiting.</h3><p>Add an instrument to begin building your selection.</p><button class="text-link" type="button" data-explore>Explore the selection <span aria-hidden="true">→</span></button></div>'; return; }
    var items = cart.map(function (item) { return '<article class="cart-item"><div class="cart-art">' + productArt(item.art, item.imageKey, item.name) + '</div><div class="cart-item-info"><h3>' + escapeHtml(item.name) + '</h3><p>' + escapeHtml(item.subtitle) + '</p><strong>' + formatPrice(item.price) + '</strong><div class="quantity-control"><button type="button" data-cart-action="decrease" data-id="' + item.id + '" aria-label="Decrease quantity of ' + escapeHtml(item.name) + '">−</button><span aria-live="polite">' + item.quantity + '</span><button type="button" data-cart-action="increase" data-id="' + item.id + '" aria-label="Increase quantity of ' + escapeHtml(item.name) + '">+</button></div></div><button class="remove-button" type="button" data-cart-action="remove" data-id="' + item.id + '" aria-label="Remove ' + escapeHtml(item.name) + '">×</button></article>'; }).join("");
    cartContent.innerHTML = '<div class="cart-items">' + items + '</div><div class="cart-summary"><div><span>Subtotal</span><strong>' + formatPrice(cartSubtotal()) + '</strong></div><p>Shipping calculated at the next step.</p><button class="solid-button" type="button" data-demo-checkout>Proceed to checkout <span aria-hidden="true">→</span></button></div>';
  }
  function showToast(message) { window.clearTimeout(toastTimer); toast.textContent = message; toast.classList.add("is-visible"); toastTimer = window.setTimeout(function () { toast.classList.remove("is-visible"); }, 2600); }
  function openDrawer(drawer) { closeDrawers(); drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); drawerScrim.classList.add("is-visible"); drawerScrim.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll"); var close = drawer.querySelector(".close-drawer"); if (close) close.focus(); }
  function closeDrawers() { [cartDrawer, mobileMenu].forEach(function (drawer) { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); }); drawerScrim.classList.remove("is-visible"); drawerScrim.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll"); }
  function addToCart(id, quantity) { var product = products.find(function (item) { return item.id === id; }); if (!product) return; var existing = cart.find(function (item) { return item.id === id; }); var amount = Math.max(1, Number(quantity) || 1); if (existing) existing.quantity += amount; else cart.push({ id: product.id, name: product.name, subtitle: product.subtitle, price: product.price, art: product.art, imageKey: product.imageKey, quantity: amount }); renderCart(); openDrawer(cartDrawer); showToast(product.name + " added to your selection."); }
  function updateQuantity(id, action) { var item = cart.find(function (product) { return product.id === id; }); if (!item) return; if (action === "increase") item.quantity += 1; if (action === "decrease") item.quantity -= 1; if (action === "remove" || item.quantity <= 0) cart = cart.filter(function (product) { return product.id !== id; }); renderCart(); }
  document.addEventListener("click", function (event) {
    var addButton = event.target.closest("[data-add]"), cartAction = event.target.closest("[data-cart-action]"), scrollButton = event.target.closest("[data-scroll]"), detailAction = event.target.closest("[data-detail-quantity]");
    if (addButton) { event.preventDefault(); addToCart(addButton.getAttribute("data-add"), addButton.hasAttribute("data-add") && addButton.classList.contains("detail-add-button") ? document.getElementById("detail-quantity").value : 1); }
    if (detailAction) { var detailInput = document.getElementById("detail-quantity"), next = Math.max(1, Number(detailInput.value) || 1) + (detailAction.getAttribute("data-detail-quantity") === "increase" ? 1 : -1); detailInput.value = next; }
    if (event.target.closest("[data-open-cart]")) openDrawer(cartDrawer); if (event.target.closest("#open-menu")) openDrawer(mobileMenu); if (event.target.closest("[data-close-drawers]") || event.target === drawerScrim) closeDrawers(); if (cartAction) updateQuantity(cartAction.getAttribute("data-id"), cartAction.getAttribute("data-cart-action"));
    if (event.target.closest("[data-explore]")) { closeDrawers(); document.getElementById("collections").scrollIntoView({ behavior: "smooth" }); }
    if (scrollButton) document.querySelector(scrollButton.getAttribute("data-scroll")).scrollIntoView({ behavior: "smooth" });
    if (event.target.closest("[data-demo-checkout]")) showToast("Checkout is not connected: this is a local demonstration.");
  });
  document.getElementById("newsletter-form").addEventListener("submit", function (event) { event.preventDefault(); document.getElementById("form-status").textContent = "You are on the list. Welcome to rare correspondence."; event.currentTarget.reset(); });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape") closeDrawers(); });
  renderConfiguredImages(); renderProducts(); renderCart();
})();
