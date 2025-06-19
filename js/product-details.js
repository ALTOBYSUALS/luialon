// Funciones para manejar la página de detalles del producto

// Variables para el zoom optimizado
let zoomLens = null;
let zoomResult = null;
let mobileZoomOverlay = null;
let isZoomActive = false;
let zoomFactor = 2.2; // Factor optimizado
let animationFrame = null;

// Función para obtener el ID del producto desde la URL
function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('id'));
}

// Función para renderizar los detalles del producto
function renderProductDetails(productId) {
  const product = getProductById(productId);
  
  if (!product) {
    console.error(`Producto con ID ${productId} no encontrado`);
    window.location.href = 'store.html';
    return;
  }
  
  // Actualizar el título de la página
  document.title = `LUIALON | ${product.title}`;
  
  // Actualizar breadcrumbs
  const breadcrumbsHTML = `
    <a href="index.html" class="breadcrumb-link">Inicio</a>
    <span class="breadcrumb-separator">/</span>
    <a href="store.html" class="breadcrumb-link">Tienda</a>
    <span class="breadcrumb-separator">/</span>
    <span class="breadcrumb-current">${product.title}</span>
  `;
  document.getElementById('breadcrumbs').innerHTML = breadcrumbsHTML;
  
  // Renderizar contenido del producto
  const productDetailsHTML = `
    <div class="product-images-section">
      <div class="thumbnails-container">
        ${renderThumbnails(product)}
      </div>
      <div class="main-image-container">
        <div class="zoom-container" id="zoomContainer">
          <img src="${product.imageUrl}" alt="${product.title}" class="zoom-image" id="zoomImage">
          <div class="zoom-lens" id="zoomLens"></div>
        </div>
        <div class="zoom-result" id="zoomResult">
          <img src="${product.imageUrl}" alt="${product.title}" id="zoomResultImage">
        </div>
      </div>
    </div>
    
    <div class="product-info">
      <h1 class="product-title">${product.title}</h1>
      <div class="product-price">€${product.price.toFixed(2)}</div>
      
      ${product.availableForSale 
        ? '<div class="availability-badge">Disponible</div>'
        : '<div class="availability-badge out-of-stock">Agotado</div>'
      }
      
      <div class="product-meta">
        <div class="meta-item">
          <span class="meta-label">Dimensiones:</span>
          <span>${product.dimensions}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Colección:</span>
          <span>${product.collection}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Materiales:</span>
          <span>${product.materials || 'No especificado'}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Año:</span>
          <span>${product.year || 'No especificado'}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">SKU:</span>
          <span>${product.sku || 'No especificado'}</span>
        </div>
      </div>
      
      <div class="product-description">
        <h3>Descripción</h3>
        <p>${product.description}</p>
      </div>
      
      ${product.availableForSale ? `
        <div class="quantity-section">
          <h3>Cantidad</h3>
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="decreaseQuantity()">−</button>
            <input type="number" class="quantity-input" id="quantity-input" value="1" min="1" max="${product.stock || 10}">
            <button class="quantity-btn" onclick="increaseQuantity()">+</button>
          </div>
        </div>
        
        <div class="product-actions">
          <button class="btn btn-primary" onclick="addToCart(${product.id})">
            Añadir al Carrito
          </button>
          <button class="btn btn-secondary" onclick="buyNow(${product.id})">
            Comprar Ahora
          </button>
        </div>
      ` : ''}
      
      ${product.tags && product.tags.length > 0 ? `
        <div class="product-tags">
          ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `;
  
  document.getElementById('product-details-container').innerHTML = productDetailsHTML;
  
  // Configurar zoom después de renderizar
  setTimeout(() => {
    setupAmazonZoom();
  }, 100);
}

// Función para renderizar thumbnails
function renderThumbnails(product) {
  // Por ahora solo una imagen, pero preparado para múltiples
  const images = [product.imageUrl];
  
  return images.map((img, index) => `
    <div class="thumbnail-item ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', ${index})">
      <img src="${img}" alt="${product.title} - ${index + 1}">
    </div>
  `).join('');
}

// Sistema de zoom estilo Amazon optimizado
function setupAmazonZoom() {
  const container = document.getElementById('zoomContainer');
  const image = document.getElementById('zoomImage');
  const lens = document.getElementById('zoomLens');
  const result = document.getElementById('zoomResult');
  const resultImage = document.getElementById('zoomResultImage');
  
  if (!container || !image || !lens || !result || !resultImage) return;
  
  // Calcular zoom ratio
  const zoomLevel = 2.5;
  
  // Pre-cargar imagen para evitar lag
  const preloadImage = new Image();
  preloadImage.src = image.src;
  
  // Variables para optimización
  let isZooming = false;
  let animationFrame = null;
  
  // Configurar tamaño de imagen resultado
  resultImage.style.width = (image.offsetWidth * zoomLevel) + 'px';
  resultImage.style.height = (image.offsetHeight * zoomLevel) + 'px';
  
  // Función optimizada de movimiento
  function moveLens(e) {
    e.preventDefault();
    
    if (!isZooming) return;
    
    // Cancelar frame anterior
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    
    animationFrame = requestAnimationFrame(() => {
      const rect = container.getBoundingClientRect();
      
      // Calcular posición del cursor
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      
      // Limitar posición del lente
      const lensWidth = lens.offsetWidth;
      const lensHeight = lens.offsetHeight;
      
      x = Math.max(lensWidth / 2, Math.min(x, rect.width - lensWidth / 2));
      y = Math.max(lensHeight / 2, Math.min(y, rect.height - lensHeight / 2));
      
      // Posicionar lente
      lens.style.left = (x - lensWidth / 2) + 'px';
      lens.style.top = (y - lensHeight / 2) + 'px';
      
      // Calcular posición de la imagen resultado
      const bgX = -(x * zoomLevel - result.offsetWidth / 2);
      const bgY = -(y * zoomLevel - result.offsetHeight / 2);
      
      // Aplicar transformación con GPU
      resultImage.style.transform = `translate(${bgX}px, ${bgY}px)`;
    });
  }
  
  // Event listeners optimizados
  container.addEventListener('mouseenter', () => {
    isZooming = true;
    lens.style.opacity = '1';
    result.style.opacity = '1';
  });
  
  container.addEventListener('mouseleave', () => {
    isZooming = false;
    lens.style.opacity = '0';
    result.style.opacity = '0';
    
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  });
  
  container.addEventListener('mousemove', moveLens);
  
  // Touch support para móviles
  container.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isZooming = true;
    lens.style.opacity = '1';
    result.style.opacity = '1';
  });
  
  container.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    moveLens(mouseEvent);
  });
  
  container.addEventListener('touchend', () => {
    isZooming = false;
    lens.style.opacity = '0';
    result.style.opacity = '0';
  });
}

// Función para cambiar imagen principal
function changeMainImage(imageUrl, index) {
  const mainImage = document.getElementById('zoomImage');
  const resultImage = document.getElementById('zoomResultImage');
  const thumbnails = document.querySelectorAll('.thumbnail-item');
  
  if (mainImage && resultImage) {
    mainImage.src = imageUrl;
    resultImage.src = imageUrl;
    
    // Actualizar thumbnail activo
    thumbnails.forEach((thumb, i) => {
      if (i === index) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
    
    // Reconfigurar zoom
    setTimeout(() => {
      setupAmazonZoom();
    }, 100);
  }
}

// Función para aumentar cantidad
function increaseQuantity() {
  const input = document.getElementById('quantity-input');
  if (input) {
    const currentValue = parseInt(input.value);
    const maxValue = parseInt(input.max);
    if (currentValue < maxValue) {
      input.value = currentValue + 1;
    }
  }
}

// Función para disminuir cantidad  
function decreaseQuantity() {
  const input = document.getElementById('quantity-input');
  if (input) {
    const currentValue = parseInt(input.value);
    if (currentValue > 1) {
      input.value = currentValue - 1;
    }
  }
}

// Función mejorada para añadir al carrito
function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) {
    showNotification('Error: Producto no encontrado', 'error');
    return;
  }
  
  if (!product.availableForSale) {
    showNotification('Este producto no está disponible para la venta', 'warning');
    return;
  }
  
  const quantityInput = document.getElementById('quantity-input');
  const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
  
  if (quantity <= 0) {
    showNotification('Cantidad inválida', 'error');
    return;
  }
  
  // Añadir al carrito con animación
  const cartItem = {
    id: product.id,
    title: product.title,
    price: product.price,
    quantity: quantity,
    imageUrl: product.imageUrl,
    maxQuantity: product.stock || 10
  };
  
  // Obtener carrito actual
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Verificar si el producto ya está en el carrito
  const existingItemIndex = cart.findIndex(item => item.id === productId);
  
  if (existingItemIndex > -1) {
    // Actualizar cantidad
    const newQuantity = cart[existingItemIndex].quantity + quantity;
    if (newQuantity <= cartItem.maxQuantity) {
      cart[existingItemIndex].quantity = newQuantity;
      showNotification(`Cantidad actualizada en el carrito: ${cart[existingItemIndex].title}`, 'success');
    } else {
      showNotification(`Stock insuficiente. Máximo disponible: ${cartItem.maxQuantity}`, 'warning');
      return;
    }
  } else {
    // Añadir nuevo item
    cart.push(cartItem);
    showNotification(`Añadido al carrito: ${product.title}`, 'success');
  }
  
  // Guardar carrito actualizado
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Actualizar contador del carrito
  if (typeof updateCartCount === 'function') {
    updateCartCount();
  }
  
  // Animación del botón
  const button = event.target;
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 150);
}

// Función para comprar ahora
function buyNow(productId) {
  addToCart(productId);
  
  // Pequeño delay para asegurar que se añade al carrito
  setTimeout(() => {
    window.location.href = 'checkout.html';
  }, 500);
}

// Función mejorada para mostrar notificaciones
function showNotification(message, type = 'info') {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">
        ${type === 'success' ? '✓' : type === 'error' ? '✗' : type === 'warning' ? '⚠' : 'ℹ'}
      </span>
      <span class="notification-message">${message}</span>
    </div>
  `;
  
  // Añadir estilos si no existen
  if (!document.querySelector('#notification-styles')) {
    const styles = document.createElement('style');
    styles.id = 'notification-styles';
    styles.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-family: 'Inter', sans-serif;
      }
      
      .notification-success {
        background: #4caf50;
        color: white;
      }
      
      .notification-error {
        background: #f44336;
        color: white;
      }
      
      .notification-warning {
        background: #ff9800;
        color: white;
      }
      
      .notification-info {
        background: #2196f3;
        color: white;
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .notification-icon {
        font-weight: bold;
        font-size: 16px;
      }
      
      .notification-message {
        font-size: 14px;
        line-height: 1.4;
      }
      
      .notification.show {
        transform: translateX(0);
      }
    `;
    document.head.appendChild(styles);
  }
  
  // Añadir al DOM
  document.body.appendChild(notification);
  
  // Mostrar con animación
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Ocultar después de 4 segundos
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Inicializar página cuando se carga
document.addEventListener('DOMContentLoaded', function() {
  const productId = getProductIdFromUrl();
  
  if (productId) {
    renderProductDetails(productId);
  } else {
    console.error('No se encontró ID de producto en la URL');
    window.location.href = 'store.html';
  }
});

// Funciones de utilidad para responsive
function isMobile() {
  return window.innerWidth <= 768;
}

function handleResize() {
  // Reconfigurar zoom en cambio de tamaño
  if (isZoomActive) {
    setupAmazonZoom();
  }
}

window.addEventListener('resize', handleResize); 