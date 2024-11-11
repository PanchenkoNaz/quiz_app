// Елементи для екранів
const startScreen = document.getElementById('start-screen');
const teamInputScreen = document.getElementById('team-input-screen');
const categoryScreen = document.getElementById('category-screen');
const questionScreen = document.getElementById('question-screen');

// Кнопки
const startButton = document.getElementById('start-btn');
const startGameButton = document.getElementById('start-game-btn');
const checkAnswerButton = document.getElementById('check-answer-btn');

// Змінні для зберігання імен команд
let team1Name = '';
let team2Name = '';

// Дані для категорій
const categories = [
    { 
        name: "Santa Claus", 
        question: "Where does Santa Claus live?", 
        answer: "North Pole" 
    },
    { name: "Christmas Tree" },
    { name: "Snow" },
    { name: "Christmas Carols" },
    { name: "Rudolph" },
    { name: "Gifts" },
    { name: "Elves" },
    { name: "Christmas Dinner" },
    { name: "Holiday Movies" },
    { name: "Christmas Stockings" }
];

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

    // Відображення категорій
    loadCategories();
});

// Функція для завантаження категорій
function loadCategories() {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = ''; // Очищення попереднього вмісту

    categories.forEach((category, index) => {
        const button = document.createElement('div');
        button.className = 'category-button';
        button.innerText = category.name;
        button.addEventListener('click', () => selectCategory(index)); // Додаємо обробник події
        categoryList.appendChild(button);
    });
}

// Функція для вибору категорії та відображення питання
function selectCategory(index) {
    const category = categories[index];

    // Перевіряємо, що категорія — "Santa Claus" і містить питання
    if (category.name === "Santa Claus") {
        document.getElementById('question-text').innerText = category.question;
        categoryScreen.classList.remove('active');
        questionScreen.classList.add('active');
    }
}

// Подія для кнопки "Check Answer"
checkAnswerButton.addEventListener('click', () => {
    const category = categories[0]; // Перевіряємо тільки для "Santa Claus"
    alert(`The correct answer is: ${category.answer}`);
});
