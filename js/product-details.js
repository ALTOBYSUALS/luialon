// Funciones para manejar la página de detalles del producto

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
  
  // Actualizar los elementos del DOM
  document.getElementById('product-title').textContent = product.title;
  document.getElementById('product-title-breadcrumb').textContent = product.title;
  document.getElementById('product-price').textContent = `€${product.price.toFixed(2)}`;
  document.getElementById('product-dimensions').textContent = `Dimensiones: ${product.dimensions}`;
  document.getElementById('product-collection').textContent = `Colección: ${product.collection}`;
  document.getElementById('product-materials').textContent = `Materiales: ${product.materials}`;
  document.getElementById('product-year').textContent = `Año: ${product.year}`;
  document.getElementById('product-sku').textContent = `SKU: ${product.sku}`;
  document.getElementById('product-availability').textContent = product.availableForSale ? (product.stock > 0 ? `Disponible (${product.stock} en stock)` : "Agotado") : "No disponible";
  document.getElementById('product-tags').textContent = `Tags: ${product.tags.join(', ')}`;
  document.getElementById('product-description').textContent = product.description;
  
  // Renderizar la imagen principal
  const mainImageContainer = document.getElementById('product-main-image');
  mainImageContainer.innerHTML = `<img src="${product.imageUrl}" alt="${product.title}">`;
  
  // Renderizar miniaturas (en este caso, creamos varias miniaturas de la misma imagen como ejemplo)
  // En un entorno real, cada producto tendría varias imágenes
  const thumbnailsContainer = document.getElementById('product-thumbnails');
  thumbnailsContainer.innerHTML = '';
  
  // Añadir la miniatura principal (activa por defecto)
  const mainThumbnail = document.createElement('div');
  mainThumbnail.className = 'product-thumbnail active';
  mainThumbnail.innerHTML = `<img src="${product.imageUrl}" alt="${product.title}">`;
  mainThumbnail.addEventListener('click', function() {
    setActiveImage(product.imageUrl);
    setActiveThumbnail(this);
  });
  thumbnailsContainer.appendChild(mainThumbnail);
  
  // Añadir ejemplos de thumbnails adicionales (en un caso real estas serían imágenes diferentes)
  // Aquí usamos las imágenes de otros productos solo como ejemplo
  const otherProducts = products.filter(p => p.id !== productId).slice(0, 3);
  otherProducts.forEach(otherProduct => {
    const thumbnail = document.createElement('div');
    thumbnail.className = 'product-thumbnail';
    thumbnail.innerHTML = `<img src="${otherProduct.imageUrl}" alt="Vista alternativa">`;
    thumbnail.addEventListener('click', function() {
      setActiveImage(otherProduct.imageUrl);
      setActiveThumbnail(this);
    });
    thumbnailsContainer.appendChild(thumbnail);
  });
}

// Función para cambiar la imagen principal
function setActiveImage(imageUrl) {
  const mainImageContainer = document.getElementById('product-main-image');
  mainImageContainer.innerHTML = `<img src="${imageUrl}" alt="Vista del producto">`;
}

// Función para cambiar la miniatura activa
function setActiveThumbnail(thumbnailElement) {
  // Eliminar la clase 'active' de todas las miniaturas
  document.querySelectorAll('.product-thumbnail').forEach(thumbnail => {
    thumbnail.classList.remove('active');
  });
  
  // Añadir la clase 'active' a la miniatura seleccionada
  thumbnailElement.classList.add('active');
}

// Funciones para manejar la cantidad
function setupQuantityControls() {
  const decreaseBtn = document.getElementById('decrease-quantity');
  const increaseBtn = document.getElementById('increase-quantity');
  const quantityInput = document.getElementById('quantity-input');
  
  decreaseBtn.addEventListener('click', function() {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });
  
  increaseBtn.addEventListener('click', function() {
    const currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  });
  
  quantityInput.addEventListener('change', function() {
    let value = parseInt(this.value);
    
    if (isNaN(value) || value < 1) {
      value = 1;
    }
    
    this.value = value;
  });
}

// Función para configurar el botón de añadir al carrito
function setupAddToCartButton(productId) {
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  
  addToCartBtn.addEventListener('click', function() {
    const quantity = parseInt(document.getElementById('quantity-input').value);
    addToCart(productId, quantity);
  });
}

// Cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  const productId = getProductIdFromUrl();
  
  if (!productId) {
    console.error('No se proporcionó un ID de producto');
    window.location.href = 'store.html';
    return;
  }
  
  renderProductDetails(productId);
  setupQuantityControls();
  setupAddToCartButton(productId);
  updateCartCount();
}); 