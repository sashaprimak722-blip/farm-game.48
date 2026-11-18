// --- ФУНКЦИЯ ДЛЯ КНОПКИ "ГЛАЗ" ---
function setupPasswordToggle(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);
    if (input && button) {
        button.addEventListener('click', () => {
            if (input.type === 'password') {
                input.type = 'text';
                button.textContent = '🙈';
            } else {
                input.type = 'password';
                button.textContent = '👁️';
            }
        });
    }
}

setupPasswordToggle('regPassword', 'togglePassword');
setupPasswordToggle('loginPassword', 'toggleLoginPassword');

// --- РЕГИСТРАЦИЯ ---
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nick = document.getElementById('regNick').value.trim();
        const email = document.getElementById('regEmail').value.trim().toLowerCase();
        const password = document.getElementById('regPassword').value;
        const secret = document.getElementById('regSecret').value.trim();

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(u => u.email === email)) {
            alert('Пользователь с таким Email уже существует!');
            return;
        }

        const newUser = { nick, email, password, secret };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert(`Регистрация успешна! Добро пожаловать, ${nick}!`);
        window.location.href = 'login.html';
    });
}

// --- ВХОД ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert(`Привет, ${user.nick}! Вход выполнен.`);
            window.location.href = 'game.html';
        } else {
            alert('Неверный Email или пароль!');
        }
    });
}
