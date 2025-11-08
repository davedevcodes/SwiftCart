let PRODUCTS = []; // will be loaded from JSON

// ===== Cart logic (persisted to localStorage) =====
const CART_KEY = 'mystore_cart_v1';
let cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}'); // { productId: qty }

// ===== DOM refs =====
const productsEl = document.getElementById('products');
const cartBtn = document.getElementById('cartBtn');
const mobileCartBtn = document.getElementById('mobileCartBtn');
const cartCount = document.getElementById('cartCount');
const cartPanel = document.getElementById('cartPanel');
const overlay = document.getElementById('overlay');
const closeCart = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkout');
const searchInput = document.getElementById('search');
const searchX = document.getElementById('searchx');
const categoryButtons = document.querySelectorAll('#categoryBar > div');

// ===== Helper =====
function truncateText(text, maxLength = 30) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

// ===== Render products =====
function renderProducts(list = PRODUCTS) {
  productsEl.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('li');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" class="w-full h-60 object-cover">
      <div class="p-4 flex flex-col gap-2">
        <h3 class="font-semibold text-lg">${p.title}</h3>
        <p class="text-sm text-gray-500 font-normal">${truncateText(p.desc)}</p>
        <div class="flex flex-col">
          <span class="text-lg font-bold">$${p.price.toFixed(2)}</span>
          <div class="flex items-center justify-between">
            <button class="text-md" onclick="window.location.href='product.html?id=${p.id}'">View More</button>
            <button data-id="${p.id}" class="addBtn px-4 py-1.5 bg-orange-500 text-black rounded text-sm font-medium">Add to cart</button>
          </div>
        </div>
      </div>
    `;
    productsEl.appendChild(card);
  });

  document.querySelectorAll('.addBtn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.id));
  });
}

// ===== Cart functions =====
function addToCart(productId, qty = 1) {
  cart[productId] = (cart[productId] || 0) + qty;
  saveCart();
  updateCartUI();
  flashButton();
}

function removeFromCart(productId) {
  delete cart[productId];
  saveCart();
  updateCartUI();
}

function changeQty(productId, newQty) {
  if (newQty <= 0) { removeFromCart(productId); return; }
  cart[productId] = newQty;
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// ===== Update cart UI =====
function updateCartUI() {
  const entries = Object.entries(cart);
  const totalItems = entries.reduce((s, [,q]) => s + q, 0);
  cartCount.textContent = totalItems;

  cartItemsEl.innerHTML = '';
  let total = 0;
  if (entries.length === 0) {
    cartItemsEl.innerHTML = '<p class="text-gray-600">Your cart is empty.</p>';
  } else {
    entries.forEach(([id, qty]) => {
      const p = PRODUCTS.find(x => x.id === id);
      const line = p.price * qty;
      total += line;

      const item = document.createElement('div');
      item.className = 'flex items-center gap-4';
      item.innerHTML = `
        <img src="https://source.unsplash.com/random/400x300?${p.img}&sig=${Math.random()}" alt="${p.title}" class="w-16 h-16 object-cover rounded">
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-semibold">${p.title}</div>
              <div class="text-sm text-gray-600">$${p.price.toFixed(2)} each</div>
            </div>
            <button class="text-red-500 remove" data-id="${id}">Remove</button>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <button class="px-2 py-1 border rounded qty-btn" data-op="-" data-id="${id}">-</button>
            <div class="px-3 py-1 border rounded">${qty}</div>
            <button class="px-2 py-1 border rounded qty-btn" data-op="+" data-id="${id}">+</button>
            <div class="ml-auto font-semibold">$${line.toFixed(2)}</div>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(item);
    });
  }

  cartTotalEl.textContent = `$${total.toFixed(2)}`;

  document.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
  });
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const op = btn.dataset.op;
      const current = cart[id] || 0;
      changeQty(id, op === '+' ? current + 1 : current - 1);
    });
  });
}

// ===== UI helpers =====
function openCart() {
  cartPanel.style.transform = 'translateX(0)';
  overlay.classList.remove('hidden');
}

function closeCartPanel() {
  cartPanel.style.transform = 'translateX(100%)';
  overlay.classList.add('hidden');
}

function flashButton() {
  cartBtn.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.08)' },
    { transform: 'scale(1)' }
  ], { duration: 250 });
}

// ===== Search =====
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  renderProducts(q ? PRODUCTS.filter(p => p.title.toLowerCase().includes(q)) : PRODUCTS);
});
searchX.addEventListener('input', () => {
  const q = searchX.value.trim().toLowerCase();
  renderProducts(q ? PRODUCTS.filter(p => p.title.toLowerCase().includes(q)) : PRODUCTS);
});

// ===== Category filter =====
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Reset all
    categoryButtons.forEach(b => {
      b.classList.remove('bg-neutral-900','text-white','border-black','active');
      b.classList.add('bg-white','text-black','border-white');
    });

    // Set active
    btn.classList.add('bg-neutral-900','text-white','border-black','active');
    btn.classList.remove('bg-white','text-black','border-white');

    // Filter products
    const category = btn.textContent.trim();
    renderProducts(category === 'All Products' ? PRODUCTS : PRODUCTS.filter(p => p.category === category));
  });
});

// ===== Checkout =====
checkoutBtn.addEventListener('click', async () => {
  const items = Object.entries(cart).map(([id, qty]) => {
    const p = PRODUCTS.find(x => x.id === id);
    return { title: p.title, price: p.price, qty };
  });

  const r = await fetch('/create-checkout-session', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems: items })
  });

  const data = await r.json();
  window.location = data.url;
});


// ===== Init =====
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    PRODUCTS = data;
    renderProducts();
    updateCartUI();
  });

cartBtn.addEventListener('click', openCart);
mobileCartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartPanel);
overlay.addEventListener('click', closeCartPanel);



const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
