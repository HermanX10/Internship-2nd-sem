document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalSpan = document.getElementById('subtotal');
    const gstSpan = document.getElementById('gst');
    const totalSpan = document.getElementById('total');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const emptyCartMessage = document.querySelector('.empty-cart-message');

    // Load cart from localStorage (main.js already handles this, but we'll use the global 'cart' variable)
    // let cart = JSON.parse(localStorage.getItem('cart')) || []; // This line is now redundant if main.js is loaded first

    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Clear existing items
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            placeOrderBtn.disabled = true;
        } else {
            emptyCartMessage.style.display = 'none';
            placeOrderBtn.disabled = false;
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Price: ₹${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                    <span class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }
        updateCartSummary();
        updateCartCount(); // Update header cart count
    }

    function updateCartSummary() {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        const gstRate = 0.18; // 18% GST
        const gstAmount = subtotal * gstRate;
        const totalAmount = subtotal + gstAmount;

        subtotalSpan.textContent = `₹${subtotal.toFixed(2)}`;
        gstSpan.textContent = `₹${gstAmount.toFixed(2)}`;
        totalSpan.textContent = `₹${totalAmount.toFixed(2)}`;
    }

    function removeItem(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function updateQuantity(productId, newQuantity) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            cart[itemIndex].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart(); // Re-render to update item total and overall summary
        }
    }

    // Event delegation for quantity buttons and remove button
    cartItemsContainer.addEventListener('click', function(event) {
        const target = event.target;
        const productId = target.dataset.id;

        if (target.classList.contains('remove-item-btn')) {
            removeItem(productId);
        } else if (target.classList.contains('quantity-btn')) {
            const input = target.parentElement.querySelector('.quantity-input');
            let currentQuantity = parseInt(input.value);

            if (target.classList.contains('increase')) {
                currentQuantity++;
            } else if (target.classList.contains('decrease')) {
                currentQuantity--;
            }

            if (currentQuantity >= 1) {
                updateQuantity(productId, currentQuantity);
            } else {
                // If quantity goes to 0 or less, remove the item
                removeItem(productId);
            }
        }
    });

    cartItemsContainer.addEventListener('change', function(event) {
        const target = event.target;
        if (target.classList.contains('quantity-input')) {
            const productId = target.dataset.id;
            let newQuantity = parseInt(target.value);
            if (isNaN(newQuantity) || newQuantity < 1) {
                newQuantity = 1; // Default to 1 if invalid input
            }
            updateQuantity(productId, newQuantity);
        }
    });

    placeOrderBtn.addEventListener('click', function() {
        // Clear the cart after placing the order
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        // Redirect to the order confirmation page
        window.location.href = 'order-confirmation.html';
    });

    // Initial render of the cart when the page loads
    renderCart();
});
