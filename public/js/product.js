const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id'); // e.g., product.html?id=p1

let PRODUCTS = []; // fetch from products.json

const productImg = document.getElementById('productImg');
const productTitle = document.getElementById('productTitle');
const productDesc = document.getElementById('productDesc');
const productPrice = document.getElementById('productPrice');
const productCategory = document.getElementById('productCategory');
const addToCartBtn = document.getElementById('addToCartBtn');
const backBtn = document.getElementById('backBtn');

let cart = JSON.parse(localStorage.getItem('mystore_cart_v1') || '{}');

fetch('./products.json')
  .then(res => res.json())
  .then(data => {
    PRODUCTS = data;
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return alert('Product not found');

    productImg.src = product.img;
    productTitle.textContent = product.title;
    productDesc.textContent = product.desc;
    productPrice.textContent = `$${product.price.toFixed(2)}`;
    productCategory.textContent = `Category: ${product.category}`;

    addToCartBtn.addEventListener('click', () => {
      cart[product.id] = (cart[product.id] || 0) + 1;
      localStorage.setItem('mystore_cart_v1', JSON.stringify(cart));
      
    });
  });

backBtn.addEventListener('click', () => window.location.href = './index.html');
