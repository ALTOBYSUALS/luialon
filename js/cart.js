// Funciones para manejar el carrito de compras usando localStorage

// Función para obtener el carrito actual del localStorage
function getCart() {
  const cart = localStorage.getItem('luialonCart');
  return cart ? JSON.parse(cart) : [];
}

// Función para guardar el carrito en localStorage
function saveCart(cart) {
  localStorage.setItem('luialonCart', JSON.stringify(cart));
}

// Función para añadir un producto al carrito
function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  
  if (!product) {
    console.error(`Producto con ID ${productId} no encontrado`);
    return;
  }
  
  const cart = getCart();
  
  // Verificar si el producto ya está en el carrito
  const existingProductIndex = cart.findIndex(item => item.id === productId);
  
  if (existingProductIndex !== -1) {
    // Si el producto ya está en el carrito, actualizar la cantidad
    cart[existingProductIndex].quantity += quantity;
  } else {
    // Si el producto no está en el carrito, añadirlo
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      dimensions: product.dimensions,
      collection: product.collection,
      materials: product.materials,
      year: product.year,
      quantity: quantity
    });
  }
  
  // Guardar el carrito actualizado
  saveCart(cart);
  
  // Actualizar el contador del carrito en la interfaz
  updateCartCount();
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
  let cart = getCart();
  
  // Filtrar el producto a eliminar
  cart = cart.filter(item => item.id !== productId);
  
  // Guardar el carrito actualizado
  saveCart(cart);
  
  // Actualizar la interfaz si estamos en la página del carrito
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }
  
  // Actualizar el contador del carrito
  updateCartCount();
}

// Función para actualizar la cantidad de un producto en el carrito
function updateCartItemQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    return removeFromCart(productId);
  }
  
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = newQuantity;
    saveCart(cart);
    
    // Actualizar la interfaz si estamos en la página del carrito
    if (window.location.pathname.includes('cart.html')) {
      renderCart();
    }
    
    // Actualizar el contador del carrito
    updateCartCount();
  }
}

// Función para vaciar el carrito
function clearCart() {
  saveCart([]);
  
  // Actualizar la interfaz si estamos en la página del carrito
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }
  
  // Actualizar el contador del carrito
  updateCartCount();
}

// Función para calcular el total del carrito
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Función para actualizar el contador del carrito en la interfaz
function updateCartCount() {
  const cart = getCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Actualizar el contador en todas las páginas
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

// Función para renderizar el carrito en la página del carrito
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  
  if (!cartContainer) {
    return; // No estamos en la página del carrito
  }
  
  const cart = getCart();
  
  // Limpiar el contenedor
  cartContainer.innerHTML = '';
  
  if (cart.length === 0) {
    // Mostrar mensaje de carrito vacío
    cartContainer.innerHTML = '<div class="empty-cart-message">Tu carrito está vacío</div>';
    
    if (cartTotalElement) {
      cartTotalElement.textContent = '€0.00';
    }
    
    // Ocultar el botón de checkout si existe
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.style.display = 'none';
    }
    
    return;
  }
  
  // Mostrar cada ítem del carrito
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.imageUrl}" alt="${item.title}">
      </div>
      <div class="cart-item-details">
        <h3 class="cart-item-title">${item.title}</h3>
        <div class="cart-item-dimensions">${item.dimensions}</div>
        <div class="cart-item-price">€${item.price.toFixed(2)}</div>
        <div class="cart-item-quantity">
          <button class="quantity-btn minus" data-product-id="${item.id}">-</button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="quantity-btn plus" data-product-id="${item.id}">+</button>
        </div>
        <div class="cart-item-subtotal">Subtotal: €${(item.price * item.quantity).toFixed(2)}</div>
        <button class="remove-item-btn" data-product-id="${item.id}">Eliminar</button>
      </div>
    `;
    
    cartContainer.appendChild(cartItem);
  });
  
  // Actualizar el total del carrito
  if (cartTotalElement) {
    cartTotalElement.textContent = `€${getCartTotal().toFixed(2)}`;
  }
  
  // Mostrar el botón de checkout
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.style.display = 'block';
  }
  
  // Añadir event listeners a los botones de cantidad y eliminar
  document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      const currentItem = cart.find(item => item.id === productId);
      if (currentItem) {
        updateCartItemQuantity(productId, currentItem.quantity - 1);
      }
    });
  });
  
  document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      const currentItem = cart.find(item => item.id === productId);
      if (currentItem) {
        updateCartItemQuantity(productId, currentItem.quantity + 1);
      }
    });
  });
  
  document.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      removeFromCart(productId);
    });
  });
}

// Cuando el DOM esté cargado, actualizar el contador del carrito
document.addEventListener('DOMContentLoaded', function() {
  // Deshabilitar notificaciones del navegador si es posible
  if (window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      // Intencionalmente no hacemos nada aquí, solo necesitamos el permiso
      // para poder controlar las notificaciones
    });
  }
  
  updateCartCount();
  
  // Si estamos en la página del carrito, renderizar el carrito
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
    
    // Añadir event listener al botón de vaciar carrito
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', clearCart);
    }
    
    // Añadir event listener al botón de checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function() {
        window.location.href = 'checkout.html';
      });
    }
  }
}); 