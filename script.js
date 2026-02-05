const products = [
  {
    id: 1,
    name: "QAED AL FURSAN",
    price: 430,
    stock: 0,
    desc: "Aroma intenso y sofisticado",
    img: "qaed.png"
  },
  {
    id: 2,
    name: "VALENTINO BORN IN ROMA INTENSE",
    price: 460,
    stock: 0,
    desc: "Fragancia floral elegante",
    img: "valennnn.png"
  },
  {
    id: 3,
    name: "KHAMRAH LATAFFA",
    price: 500,
    stock: 1,
    desc: "Balance cálido y moderno",
    img: "kham suelto.png"
  }
];

const productBox = document.getElementById("products");
const cartBox = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");

let cart = [];

function renderProducts(){
  productBox.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <strong>$${p.price}</strong><br>
      <button class="btn" onclick="addToCart(${p.id})">Agregar</button>
    `;
    productBox.appendChild(div);
  });
}

function addToCart(id){
  const product = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);

  if(item){
    if(item.qty < product.stock) item.qty++;
  } else {
    cart.push({...product, qty: 1});
  }
  updateCart();
}

function updateCart(){
  cartItems.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.alignItems = "center";
    row.style.marginBottom = "8px";

    const text = document.createElement("span");
    text.textContent = `${item.name} x${item.qty}`;

    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.style.border = "none";
    btn.style.background = "transparent";
    btn.style.color = "#c9a24d";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "1rem";
    btn.onclick = (e) => {
    e.stopPropagation(); // evita que el carrito se cierre
    removeFromCart(item.id);
  };

    row.appendChild(text);
    row.appendChild(btn);
    cartItems.appendChild(row);
  });

  const iva = subtotal * 0.16;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("iva").textContent = iva.toFixed(2);
  document.getElementById("total").textContent = (subtotal + iva).toFixed(2);
  cartCount.textContent = cart.length;
}

function removeFromCart(id){
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

renderProducts();

document.getElementById("cartBtn").onclick = () => {
  cartBox.classList.toggle("hidden");
};

// Cerrar carrito al hacer clic fuera de él
window.addEventListener("click", (e) => {
  if (!cartBox.contains(e.target) && !e.target.closest('#cartBtn')) {
    cartBox.classList.add("hidden");
  }
});
