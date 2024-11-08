// Елементи екранів
const startScreen = document.getElementById('start-screen');
const teamInputScreen = document.getElementById('team-input-screen');
const categoryScreen = document.getElementById('category-screen');

// Кнопки
const startButton = document.getElementById('start-btn');
const startGameButton = document.getElementById('start-game-btn');

// Змінні для зберігання імен команд
let team1Name = '';
let team2Name = '';

// Подія для кнопки "Start Quiz"
startButton.addEventListener('click', () => {
    startScreen.classList.remove('active');
    teamInputScreen.classList.add('active');
});

// Подія для кнопки "Start Game"
startGameButton.addEventListener('click', () => {
    team1Name = document.getElementById('team1-name').value || 'Team 1';
    team2Name = document.getElementById('team2-name').value || 'Team 2';

    teamInputScreen.classList.remove('active');
    categoryScreen.classList.add('active');

    // Відображення імен команд у табло
    document.getElementById('team1-score').innerText = `${team1Name}: 0`;
    document.getElementById('team2-score').innerText = `${team2Name}: 0`;

    // Встановити початкову чергу на Team 1
    document.getElementById('turn-indicator').innerText = `Current Turn: ${team1Name}`;
});
