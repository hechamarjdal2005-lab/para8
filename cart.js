/* ============================================
   CART LOGIC — Para Errahali
   Uses localStorage for cross-page persistence
   ============================================ */

const CART_KEY = "para_errahali_cart";
const WHATSAPP_NUMBER = "212716325533";

/* ── Helpers ── */

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  renderCartSidebar();
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

/* ── Cart Operations ── */

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  saveCart(cart);
  animateCartIcon();
  showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

function updateQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
  renderCartSidebar();
}

/* ── WhatsApp Order ── */

function orderViaWhatsApp() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }

  let lines = ["Hello, I would like to order from Para Errahali:\n"];
  cart.forEach(item => {
    const subtotal = (item.price * item.qty).toFixed(2);
    lines.push(`• ${item.name} (x${item.qty}) — ${subtotal} DH`);
  });
  lines.push(`\n💰 Total: ${getCartTotal().toFixed(2)} DH`);
  lines.push("\nThank you!");

  const message = lines.join("\n");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

/* ── UI: Badge ── */

function updateCartBadge() {
  const badges = document.querySelectorAll(".cart-count");
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });
}

/* ── UI: Cart Icon Animation ── */

function animateCartIcon() {
  const cartBtns = document.querySelectorAll(".nav-cart-btn");
  cartBtns.forEach(btn => {
    btn.classList.add("cart-bounce");
    setTimeout(() => btn.classList.remove("cart-bounce"), 600);
  });
}

/* ── UI: Toast Notification ── */

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("toast-show"));
  setTimeout(() => {
    toast.classList.remove("toast-show");
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

/* ── UI: Cart Sidebar ── */

function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");
  if (!sidebar) return;

  const isOpen = sidebar.classList.contains("cart-open");
  if (isOpen) {
    sidebar.classList.remove("cart-open");
    overlay.classList.remove("overlay-visible");
    document.body.style.overflow = "";
  } else {
    renderCartSidebar();
    sidebar.classList.add("cart-open");
    overlay.classList.add("overlay-visible");
    document.body.style.overflow = "hidden";
  }
}

function renderCartSidebar() {
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--green-300)" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
        </svg>
        <p>Your cart is empty</p>
        <span>Add some products to get started!</span>
      </div>
    `;
    if (totalEl) totalEl.textContent = "0.00 DH";
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" loading="lazy">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p class="cart-item-price">${item.price.toFixed(2)} DH</p>
        <div class="cart-item-qty">
          <button onclick="updateQty(${item.id}, -1)" aria-label="Decrease quantity">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${item.id}, 1)" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  `).join("");

  if (totalEl) totalEl.textContent = getCartTotal().toFixed(2) + " DH";
}

/* ── Init on every page ── */
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderCartSidebar();
});
