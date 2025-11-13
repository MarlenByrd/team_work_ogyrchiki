// За HTML отвечает Данила Андреевич Абарбанель 
// за CSS отвечает Павел Изотов
const products = [
    {
        id: 1,
        name: "Смартфон iPhone 15",
        description: "Новейший смартфон с отличной камерой и производительностью",
        price: 79990,
        emoji:"📱"
    },
    {
        id: 2,  // в html мы указываем id или class т.к мы используем js то я взял id 
        name:"Ноутбук MacBook Air", // по id можно добавлять изменения как и в css
        description:"Легкий и мощный ноутбук для работы и развлечений",
        price: 99990,
        emoji:"💻"
    },
    {
        id: 3,
        name:"Беспроводные наушники",
        description:"Качественный звук и долгое время работы",
        price: 15990,
        emoji:"🎧"
    },
    {
        id: 4,
        name:"Умный часы",
        description: "Отслеживание фитнеса и уведомлений",
        price: 25990,
        emoji:"⌚"
    },
    {
        id: 5,
        name: "Планшет iPad"
        description: "Идеален для работы и развлечений",
        price: 49990,
        emoji:"⬛" //тут дожен был быть эмодзи ipad, но почему-то черный квадрат
    }
    {
        id: 6,
        name: "Фотоаппарат Sony",
        description: "Профессиональная съемка и отличное качество",
        price: 89990,
        emoji:"📷"
    }
];

//Корзина
let cart = [];

//DOM - как говориться в романе Война и Мир:
//DOM - милый дом
//DOM elements
const productsGrid = document.gitElementByld('productsGrid');
const cartlcon = document.gitElementByld('cartlcon');
const cartCount = = document.gitElementByld('cartCount');
const cartModal = document.gitElementByld('cartModal');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const totalAmount = document.getElementById('totalAmount');
const checkoutBtn = document.getElementById('checkoutBtn');


//отображение товаров
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