const products = [
  {
    id: "dessert-glass",
    name: "Berry Dessert Glass Candle",
    type: "candle",
    price: 20,
    image: "assets/dessert-glass.jpg",
    badge: "One of a kind",
    description: "A playful dessert-inspired candle topped with colorful wax berries."
  },
  {
    id: "succulent-bowl",
    name: "Succulent Garden Candle",
    type: "candle",
    price: 30,
    image: "assets/succulent-bowl.jpg",
    badge: "Statement piece",
    description: "A decorative bowl filled with hand-shaped wax succulents and blossoms."
  },
  {
    id: "wood-vessel",
    name: "Floral Wood Vessel Candle",
    type: "candle",
    price: 32,
    image: "assets/wood-vessel.jpg",
    badge: "Gift favorite",
    description: "A warm, decorative wood vessel finished with colorful botanical details."
  },
  {
    id: "cappuccino-cup",
    name: "Cappuccino Cup Candle",
    type: "candle",
    price: 20,
    image: "assets/cappuccino-cup.jpg",
    badge: "Cozy scent",
    description: "A charming teacup candle topped with creamy, coffee-inspired wax details."
  },
  {
    id: "pumpkin-jar",
    name: "Pumpkin Jar Candle",
    type: "candle",
    price: 18,
    image: "assets/pumpkin-jar.jpg",
    badge: "Seasonal",
    description: "A double-wick jar candle with a rich pumpkin color and cozy presentation."
  },
  {
    id: "watermelon-tumbler",
    name: "Watermelon Tumbler Candle",
    type: "candle",
    price: 22,
    image: "assets/watermelon-tumbler.jpg",
    badge: "Bright & fruity",
    description: "A frosted tumbler candle with a cheerful watermelon-inspired finish."
  },
  {
    id: "lavender-soap",
    name: "Lavender Soap",
    type: "soap",
    price: 10,
    image: "assets/lavender-soap.jpg",
    badge: "Calming",
    description: "A smooth lavender bar with a soft floral scent and gift-ready box."
  },
  {
    id: "peppermint-soap",
    name: "Peppermint Soap",
    type: "soap",
    price: 8,
    image: "assets/peppermint-soap.jpg",
    badge: "Fresh",
    description: "A refreshing green-and-white molded soap with a crisp peppermint scent."
  },
  {
    id: "eucalyptus-soap",
    name: "Eucalyptus Soap",
    type: "soap",
    price: 8,
    image: "assets/eucalyptus-soap.jpg",
    badge: "Refreshing",
    description: "A bright eucalyptus bar with a fresh, clean herbal scent."
  },
  {
    id: "cucumber-soap",
    name: "Cucumber + Green Tea Soap",
    type: "soap",
    price: 8,
    image: "assets/cucumber-soap.jpg",
    badge: "Clean scent",
    description: "A light, refreshing soap with a cool cucumber and green tea profile."
  },
  {
    id: "tea-tree-soap",
    name: "Tea Tree Soap",
    type: "soap",
    price: 10,
    image: "assets/tea-tree-soap.jpg",
    badge: "Herbal",
    description: "A deep green molded bar with a crisp, botanical tea tree scent."
  },
  {
    id: "oatmeal-soap",
    name: "Oatmeal, Milk + Honey Soap",
    type: "soap",
    price: 10,
    image: "assets/oatmeal-soap.jpg",
    badge: "Comforting",
    description: "A warm, creamy bar pairing oatmeal, milk, and honey notes."
  },
  {
    id: "cedar-soap",
    name: "Cedar for Men Soap",
    type: "soap",
    price: 10,
    image: "assets/cedar-soap.jpg",
    badge: "Woodsy",
    description: "A warm cedar-scented bar in a simple kraft gift box."
  },
  {
    id: "honey-soap",
    name: "Pure Honey Soap",
    type: "soap",
    price: 10,
    image: "assets/honey-soap.jpg",
    badge: "Warm & sweet",
    description: "A creamy honey-toned bar with a gentle, comforting scent."
  },
  {
    id: "shea-soap",
    name: "Shea Butter Soap",
    type: "soap",
    price: 8,
    image: "assets/shea-soap.jpg",
    badge: "Moisturizing",
    description: "A rich shea butter bar packaged in a delicate organza gift bag."
  }
];

const state = {
  filter: "all",
  cart: JSON.parse(localStorage.getItem("warthItScentsCart") || "{}")
};

const grid = document.querySelector("#product-grid");
const cartDrawer = document.querySelector("#cart-drawer");
const backdrop = document.querySelector("#drawer-backdrop");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const toast = document.querySelector("#toast");

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

function renderProducts() {
  const visible = products.filter((product) => state.filter === "all" || product.type === state.filter);
  grid.innerHTML = visible.map((product) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-badge">${product.badge}</span>
      </div>
      <div class="product-body">
        <div class="product-topline">
          <h3>${product.name}</h3>
          <span class="price">${money(product.price)}</span>
        </div>
        <p>${product.description}</p>
        <button class="add-button" type="button" data-add="${product.id}">+ Add to cart</button>
      </div>
    </article>
  `).join("");
}

function saveCart() {
  localStorage.setItem("warthItScentsCart", JSON.stringify(state.cart));
}

function cartEntries() {
  return Object.entries(state.cart)
    .map(([id, quantity]) => ({
      product: products.find((item) => item.id === id),
      quantity
    }))
    .filter((entry) => entry.product && entry.quantity > 0);
}

function renderCart() {
  const entries = cartEntries();
  const count = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const total = entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);

  cartCount.textContent = count;
  cartTotal.textContent = money(total);
  cartEmpty.hidden = entries.length > 0;

  cartItems.innerHTML = entries.map(({ product, quantity }) => `
    <div class="cart-item">
      <img src="${product.image}" alt="">
      <div>
        <h3>${product.name}</h3>
        <div class="quantity-controls" aria-label="Quantity for ${product.name}">
          <button type="button" data-change="${product.id}" data-delta="-1" aria-label="Decrease quantity">−</button>
          <span>${quantity}</span>
          <button type="button" data-change="${product.id}" data-delta="1" aria-label="Increase quantity">+</button>
          <button class="remove-button" type="button" data-remove="${product.id}">Remove</button>
        </div>
      </div>
      <strong>${money(product.price * quantity)}</strong>
    </div>
  `).join("");

  saveCart();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function openCart() {
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
  document.querySelector("#close-cart").focus();
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  backdrop.hidden = true;
  document.body.style.overflow = "";
  document.querySelector("#open-cart").focus();
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
    renderProducts();
  });
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const id = button.dataset.add;
  state.cart[id] = (state.cart[id] || 0) + 1;
  renderCart();
  showToast("Added to cart");
});

cartItems.addEventListener("click", (event) => {
  const change = event.target.closest("[data-change]");
  const remove = event.target.closest("[data-remove]");

  if (change) {
    const id = change.dataset.change;
    state.cart[id] = Math.max(0, (state.cart[id] || 0) + Number(change.dataset.delta));
    if (state.cart[id] === 0) delete state.cart[id];
    renderCart();
  }

  if (remove) {
    delete state.cart[remove.dataset.remove];
    renderCart();
  }
});

document.querySelector("#open-cart").addEventListener("click", openCart);
document.querySelector("#close-cart").addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("is-open")) closeCart();
});

document.querySelector("#checkout-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = cartEntries();

  if (!entries.length) {
    showToast("Add an item before sending your order");
    return;
  }

  const form = new FormData(event.currentTarget);
  const total = entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
  const lines = entries.map(({ product, quantity }) =>
    `${quantity} x ${product.name} - ${money(product.price * quantity)}`
  );

  const body = [
    "Hello Deborah,",
    "",
    "I would like to place an order with Warth-It-Scents.",
    "",
    ...lines,
    "",
    `Subtotal: ${money(total)}`,
    `Fulfillment: ${form.get("fulfillment")}`,
    "",
    `Customer: ${form.get("name")}`,
    `Email: ${form.get("email")}`,
    `Phone: ${form.get("phone") || "Not provided"}`,
    `Notes: ${form.get("notes") || "None"}`,
    "",
    "Please reply with availability, pickup/shipping details, and payment instructions."
  ].join("\n");

  const subject = `Warth-It-Scents order from ${form.get("name")}`;
  window.location.href = `mailto:dzwarthen@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

renderProducts();
renderCart();
