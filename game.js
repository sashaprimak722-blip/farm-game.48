// --- ПРОВЕРКА АВТОРИЗАЦИИ ---
const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = 'login.html';
}

// --- Состояние игры ---
let coins = 0;
let incomePerSecond = 0;
let upgrades = [
    { id: 'gpu1', name: 'Видеокарта GTX', cost: 50, income: 1, owned: 0 },
    { id: 'gpu2', name: 'Видеокарта RTX', cost: 500, income: 5, owned: 0 },
    { id: 'gpu3', name: 'ASIC Miner', cost: 2000, income: 15, owned: 0 },
    { id: 'server', name: 'Серверная', cost: 10000, income: 100, owned: 0 }
];

// --- Элементы на странице ---
const coinsDisplay = document.getElementById('coinsDisplay');
const incomeDisplay = document.getElementById('incomeDisplay');
const clickerBtn = document.getElementById('clickerBtn');
const shopItemsContainer = document.getElementById('shopItems');

// --- Обновление интерфейса ---
function updateUI() {
    coinsDisplay.textContent = Math.floor(coins);
    incomeDisplay.textContent = incomePerSecond;
    renderShop();
}

// --- Отрисовка магазина ---
function renderShop() {
    shopItemsContainer.innerHTML = '';
    
    upgrades.forEach(item => {
        const canAfford = coins >= item.cost;
        
        const itemHTML = `
            <div class="shop-item">
                <div class="shop-item-info">
                    <h3>${item.name}</h3>
                    <p>Доход: +${item.income}/сек (Куплено: ${item.owned})</p>
                </div>
                <button class="buy-btn" 
                        onclick="buyUpgrade('${item.id}')" 
                        ${!canAfford ? 'disabled' : ''}>
                    ${item.cost} 💰
                </button>
            </div>
        `;
        shopItemsContainer.innerHTML += itemHTML;
    });
}

// --- Покупка ---
window.buyUpgrade = function(id) {
    const item = upgrades.find(u => u.id === id);
    if (item && coins >= item.cost) {
        coins -= item.cost;
        item.owned += 1;
        incomePerSecond += item.income;
        item.cost = Math.floor(item.cost * 1.5);
        updateUI();
    }
};

// --- Клик ---
clickerBtn.addEventListener('click', () => {
    coins += 1;
    updateUI();
});

// --- Автодоход ---
setInterval(() => {
    if (incomePerSecond > 0) {
        coins += incomePerSecond;
        updateUI();
    }
}, 1000);

// --- Выход ---
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// --- Старт ---
updateUI();
