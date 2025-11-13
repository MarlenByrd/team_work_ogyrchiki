// Данные товаров
const products = [
    {
        id: 1,
        name: "Смартфон iPhone 15",
        description: "Новейший смартфон с отличной камерой и производительностью",
        price: 79990,
        emoji: "📱"
    },
    {
        id: 2,
        name: "Ноутбук MacBook Air",
        description: "Легкий и мощный ноутбук для работы и развлечений",
        price: 99990,
        emoji: "💻"
    },
    {
        id: 3,
        name: "Беспроводные наушники",
        description: "Качественный звук и долгое время работы",
        price: 15990,
        emoji: "🎧"
    },
    {
        id: 4,
        name: "Умные часы",
        description: "Отслеживание фитнеса и уведомлений",
        price: 25990,
        emoji: "⌚"
    },
    {
        id: 5,
        name: "Планшет iPad",
        description: "Идеален для работы и развлечений",
        price: 49990,
        emoji: "📱"
    },
    {
        id: 6,
        name: "Фотоаппарат Sony",
        description: "Профессиональная съемка и отличное качество",
        price: 89990,
        emoji: "📷"
    }
];

// Корзина
let cart = [];

// DOM элементы
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const totalAmount = document.getElementById('totalAmount');
const checkoutBtn = document.getElementById('checkoutBtn');

// Отображение товаров
function displayProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">${product.price.toLocaleString()} ₽</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Добавить в корзину
            </button>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Добавление в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${product.name} добавлен в корзину!`);
}

// Обновление счетчика корзины
function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;
}

// Отображение корзины
function displayCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Корзина пуста</p>';
        totalAmount.textContent = '0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} ₽</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Удалить</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    totalAmount.textContent = total.toLocaleString();
}

// Обновление количества товара
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        updateCartCount();
        displayCart();
    }
}

// Удаление из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCart();
}

// Показ уведомления
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ed573;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Обработчики событий
cartIcon.addEventListener('click', () => {
    displayCart();
    cartModal.classList.add('open');
    overlay.classList.add('open');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('open');
    overlay.classList.remove('open');
});

overlay.addEventListener('click', () => {
    cartModal.classList.remove('open');
    overlay.classList.remove('open');
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Корзина пуста!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Заказ оформлен! Сумма: ${total.toLocaleString()} ₽`);
    cart = [];
    updateCartCount();
    displayCart();
});

// Инициализация
displayProducts();
updateCartCount();
