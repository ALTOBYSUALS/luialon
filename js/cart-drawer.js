// Funcionalidad del carrito como panel lateral
document.addEventListener('DOMContentLoaded', function() {
    // Crear elementos del carrito lateral y overlay
    const cartDrawerHtml = `
        <div class="cart-overlay" id="cart-overlay"></div>
        <div class="cart-drawer" id="cart-drawer">
            <div class="cart-drawer-header">
                <h2 class="cart-drawer-title">Tu Carrito</h2>
                <button class="cart-close-btn" id="cart-close">&times;</button>
            </div>
            <div class="cart-items-container" id="cart-drawer-items">
                <!-- Items del carrito se renderizan aquí -->
            </div>
            <div class="cart-drawer-subtotal">
                <span>Total:</span>
                <span id="cart-drawer-total">€0.00</span>
            </div>
            <button class="cart-drawer-checkout" id="cart-drawer-checkout">Proceder al Pago</button>
        </div>
    `;

    // Insertar HTML al final del body
    document.body.insertAdjacentHTML('beforeend', cartDrawerHtml);

    // Referencias a los elementos DOM
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartCloseBtn = document.getElementById('cart-close');
    const cartCheckoutBtn = document.getElementById('cart-drawer-checkout');
    const cartIconLinks = document.querySelectorAll('nav#cart a');

    // Función para abrir el carrito
    function openCartDrawer() {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
        renderCartDrawer();
    }

    // Función para cerrar el carrito
    function closeCartDrawer() {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Función para renderizar los items del carrito en el panel lateral
    function renderCartDrawer() {
        const cartItemsContainer = document.getElementById('cart-drawer-items');
        const cartDrawerTotal = document.getElementById('cart-drawer-total');
        const cart = getCart();

        // Limpiar el contenedor
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            // Mostrar mensaje de carrito vacío
            cartItemsContainer.innerHTML = '<div class="cart-drawer-empty">Tu carrito está vacío</div>';
            cartDrawerTotal.textContent = '€0.00';
            return;
        }

        // Mostrar cada ítem del carrito
        cart.forEach(item => {
            const cartItemHtml = `
                <div class="cart-drawer-item" data-id="${item.id}">
                    <img src="${item.imageUrl}" alt="${item.title}" class="cart-drawer-item-image">
                    <div class="cart-drawer-item-details">
                        <h3 class="cart-drawer-item-title">${item.title}</h3>
                        <p class="cart-drawer-item-price">€${item.price.toFixed(2)}</p>
                        <div class="cart-drawer-quantity">
                            <button class="cart-drawer-quantity-btn cart-drawer-minus" data-id="${item.id}">-</button>
                            <span class="cart-drawer-quantity-value">${item.quantity}</span>
                            <button class="cart-drawer-quantity-btn cart-drawer-plus" data-id="${item.id}">+</button>
                        </div>
                        <button class="cart-drawer-remove" data-id="${item.id}">Eliminar</button>
                    </div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHtml);
        });

        // Actualizar el total
        cartDrawerTotal.textContent = `€${getCartTotal().toFixed(2)}`;

        // Añadir event listeners a los botones
        document.querySelectorAll('.cart-drawer-minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const item = cart.find(item => item.id === id);
                if (item) {
                    updateCartItemQuantity(id, item.quantity - 1);
                    renderCartDrawer();
                }
            });
        });

        document.querySelectorAll('.cart-drawer-plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const item = cart.find(item => item.id === id);
                if (item) {
                    updateCartItemQuantity(id, item.quantity + 1);
                    renderCartDrawer();
                }
            });
        });

        document.querySelectorAll('.cart-drawer-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                removeFromCart(id);
                renderCartDrawer();
            });
        });
    }

    // Asignar eventos
    cartIconLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openCartDrawer();
        });
    });

    cartCloseBtn.addEventListener('click', closeCartDrawer);
    cartOverlay.addEventListener('click', closeCartDrawer);
    
    cartCheckoutBtn.addEventListener('click', function() {
        window.location.href = 'checkout.html';
    });

    // Reemplazar completamente la función addToCart
    window.addToCart = function(productId, quantity = 1) {
        // Silenciar todas las alertas
        const originalAlert = window.alert;
        const originalNotification = window.Notification;
        
        window.alert = function() {};
        window.Notification = function() {};
        
        try {
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
            
            // Abrir el drawer sin mostrar alertas
            openCartDrawer();
        } finally {
            // Restaurar funciones originales
            window.alert = originalAlert;
            window.Notification = originalNotification;
            
            // Eliminar cualquier posible notificación del DOM
            const notifications = document.querySelectorAll('div[role="dialog"], div[role="alert"]');
            notifications.forEach(notification => {
                if (notification.textContent.includes('añadido al carrito') || 
                    notification.textContent.includes('dice')) {
                    notification.remove();
                }
            });
        }
    };
}); 