// Funciones para manejar el proceso de checkout

// Función para renderizar los items del pedido en el resumen
function renderOrderItems() {
  const orderItemsContainer = document.getElementById('order-items');
  
  if (!orderItemsContainer) {
    console.error('Contenedor de items del pedido no encontrado');
    return;
  }
  
  const cart = getCart();
  
  // Limpiar el contenedor
  orderItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    // Si el carrito está vacío, redirigir a la página del carrito
    window.location.href = 'cart.html';
    return;
  }
  
  // Mostrar los items del pedido
  cart.forEach(item => {
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    
    orderItem.innerHTML = `
      <div class="order-item-image">
        <img src="${item.imageUrl}" alt="${item.title}">
      </div>
      <div class="order-item-details">
        <div class="order-item-title">${item.title}</div>
        <div class="order-item-price">€${item.price.toFixed(2)}</div>
        <div class="order-item-quantity">Cantidad: ${item.quantity}</div>
      </div>
    `;
    
    orderItemsContainer.appendChild(orderItem);
  });
  
  // Calcular y mostrar los totales
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 15.00 : 0.00; // Costo de envío fijo de 15€
  const total = subtotal + shipping;
  
  document.getElementById('order-subtotal').textContent = `€${subtotal.toFixed(2)}`;
  document.getElementById('order-shipping').textContent = `€${shipping.toFixed(2)}`;
  document.getElementById('order-total').textContent = `€${total.toFixed(2)}`;
}

// Función para procesar el formulario de checkout
function processCheckoutForm(event) {
  event.preventDefault();
  
  // Validar el formulario (en un caso real, haríamos una validación más exhaustiva)
  const form = document.getElementById('checkout-form');
  
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  // Simular el procesamiento del pago
  const placeOrderBtn = document.getElementById('place-order-btn');
  placeOrderBtn.disabled = true;
  placeOrderBtn.textContent = 'Procesando...';
  
  // Simular un retraso en el procesamiento
  setTimeout(() => {
    // Aquí se conectaría con una pasarela de pago real
    
    // Limpiar el carrito después de la compra exitosa
    clearCart();
    
    // Redirigir a una página de confirmación
    alert('¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.');
    window.location.href = 'index.html';
  }, 2000);
}

// Cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  // Renderizar los items del pedido
  renderOrderItems();
  
  // Actualizar el contador del carrito
  updateCartCount();
  
  // Configurar el formulario de checkout
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', processCheckoutForm);
  }
  
  // Configurar validación básica de los campos de tarjeta de crédito
  const cardNumberInput = document.getElementById('card-number');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function() {
      this.value = this.value
        .replace(/\D/g, '') // Eliminar todo lo que no sean dígitos
        .replace(/(\d{4})(?=\d)/g, '$1 '); // Añadir espacios cada 4 dígitos
    });
  }
  
  const expiryDateInput = document.getElementById('expiry-date');
  if (expiryDateInput) {
    expiryDateInput.addEventListener('input', function() {
      this.value = this.value
        .replace(/\D/g, '') // Eliminar todo lo que no sean dígitos
        .replace(/^(\d{2})(\d)/g, '$1/$2'); // Añadir / después de los primeros 2 dígitos
    });
  }
  
  const cvvInput = document.getElementById('cvv');
  if (cvvInput) {
    cvvInput.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, ''); // Eliminar todo lo que no sean dígitos
    });
  }
}); 