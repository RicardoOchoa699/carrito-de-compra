// Declare the cart variable
let cart = [];

// 1. ARREGLAR LA APERTURA DEL CARRITO
// Reemplaza la función abrirCarrito con esta:
function abrirCarrito() {
    console.log("🛒 Intentando abrir carrito");
    
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    
    if (overlay && sidebar) {
        // Forzar que se muestren
        overlay.style.display = 'block';
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        
        sidebar.style.transform = 'translateX(0)';
        sidebar.style.display = 'flex';
        
        // Agregar clases también
        overlay.classList.add('active');
        sidebar.classList.add('active');
        
        console.log("✅ Carrito abierto");
    } else {
        console.error("❌ No se encontraron elementos del carrito");
    }
}

// 2. ARREGLAR EL CIERRE DEL CARRITO
function cerrarCarrito() {
    console.log("❌ Cerrando carrito");
    
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    
    if (overlay && sidebar) {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        sidebar.style.transform = 'translateX(100%)';
        
        overlay.classList.remove('active');
        sidebar.classList.remove('active');
        
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
}

// 3. ARREGLAR EL CONTADOR
function actualizarContador() {
    console.log("🔢 Actualizando contador");
    
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity || 1;
    });
    
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = totalItems;
        if (totalItems > 0) {
            cartCount.style.display = 'flex';
            cartCount.style.visibility = 'visible';
        } else {
            cartCount.style.display = 'none';
        }
        console.log("✅ Contador actualizado:", totalItems);
    }
}

// 4. ARREGLAR AGREGAR AL CARRITO
function addToCart(productId) {
    console.log("➕ Agregando producto:", productId);
    
    // Productos simples
    const productos = {
        1: { id: 1, name: "iPhone 15 Pro Max", price: 1299 },
        2: { id: 2, name: "MacBook Air M3", price: 1199 },
        3: { id: 3, name: "AirPods Pro", price: 249 },
        4: { id: 4, name: "Samsung Galaxy S24", price: 899 },
        5: { id: 5, name: "Sony WH-1000XM5", price: 399 },
        6: { id: 6, name: "iPad Pro 12.9", price: 1099 },
        7: { id: 7, name: "Nintendo Switch OLED", price: 349 },
        8: { id: 8, name: "Canon EOS R5", price: 3899 }
    };
    
    const producto = productos[productId];
    if (!producto) return;
    
    // Buscar si ya existe
    let encontrado = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity = (cart[i].quantity || 1) + 1;
            encontrado = true;
            break;
        }
    }
    
    // Si no existe, agregarlo
    if (!encontrado) {
        cart.push({
            id: producto.id,
            name: producto.name,
            price: producto.price,
            quantity: 1
        });
    }
    
    console.log("Carrito actual:", cart);
    actualizarContador();
    mostrarCarrito();
}

// 5. ARREGLAR MOSTRAR CARRITO
function mostrarCarrito() {
    console.log("📋 Mostrando carrito");
    
    const cartItemsCount = document.getElementById('cartItemsCount');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const totalPrice = document.getElementById('totalPrice');
    
    let totalItems = 0;
    let totalPrecio = 0;
    
    cart.forEach(item => {
        totalItems += item.quantity || 1;
        totalPrecio += (item.price || 0) * (item.quantity || 1);
    });
    
    // Actualizar contador en sidebar
    if (cartItemsCount) {
        cartItemsCount.textContent = totalItems;
    }
    
    // Actualizar precio total
    if (totalPrice) {
        totalPrice.textContent = '$' + totalPrecio.toLocaleString();
    }
    
    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'flex';
        if (cartItems) cartItems.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        if (cartEmpty) cartEmpty.style.display = 'none';
        if (cartItems) cartItems.style.display = 'block';
        if (cartFooter) cartFooter.style.display = 'block';
        
        // Mostrar productos
        let html = '';
        cart.forEach(item => {
            const subtotal = (item.price || 0) * (item.quantity || 1);
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-price">$${item.price}</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                            <span class="quantity">${item.quantity || 1}</span>
                            <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <div class="cart-item-total">
                        <p class="cart-item-total-price">$${subtotal}</p>
                        <button class="remove-item" onclick="eliminarDelCarrito(${item.id})">✕</button>
                    </div>
                </div>
            `;
        });
        
        if (cartItems) {
            cartItems.innerHTML = html;
        }
    }
}

// 6. FUNCIONES PARA ELIMINAR Y CAMBIAR CANTIDAD
function eliminarDelCarrito(productId) {
    console.log("🗑️ Eliminando producto:", productId);
    cart = cart.filter(item => item.id !== productId);
    actualizarContador();
    mostrarCarrito();
}

function cambiarCantidad(productId, cambio) {
    console.log("🔢 Cambiando cantidad:", productId, cambio);
    
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity = (cart[i].quantity || 1) + cambio;
            if (cart[i].quantity <= 0) {
                eliminarDelCarrito(productId);
                return;
            }
            break;
        }
    }
    
    actualizarContador();
    mostrarCarrito();
}

// 7. CONFIGURAR EVENTOS AL CARGAR
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Configurando eventos del carrito");
    
    // Botón abrir carrito
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.onclick = abrirCarrito;
        console.log("✅ Evento abrir carrito configurado");
    }
    
    // Botón cerrar carrito
    const closeCart = document.getElementById('closeCart');
    if (closeCart) {
        closeCart.onclick = cerrarCarrito;
        console.log("✅ Evento cerrar carrito configurado");
    }
    
    // Overlay cerrar carrito
    const overlay = document.getElementById('cartOverlay');
    if (overlay) {
        overlay.onclick = cerrarCarrito;
        console.log("✅ Evento overlay configurado");
    }
    
    // Botón limpiar carrito
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.onclick = function() {
            if (confirm('¿Vaciar carrito?')) {
                cart = [];
                actualizarContador();
                mostrarCarrito();
            }
        };
        console.log("✅ Evento limpiar carrito configurado");
    }
    
    actualizarContador();
});

// Hacer funciones globales
window.addToCart = addToCart;
window.eliminarDelCarrito = eliminarDelCarrito;
window.cambiarCantidad = cambiarCantidad;
window.toggleFavorite = function(id) { console.log("Favorito:", id); };