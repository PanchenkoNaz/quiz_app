// Елементи для екранів
const startScreen = document.getElementById('start-screen');
const teamInputScreen = document.getElementById('team-input-screen');
const categoryScreen = document.getElementById('category-screen');
const levelScreen = document.getElementById('level-screen'); // Екран вибору рівня складності
const questionScreen = document.getElementById('question-screen');
const answerScreen = document.getElementById('answer-screen');

// Кнопки
const startButton = document.getElementById('start-btn');
const startGameButton = document.getElementById('start-game-btn');
const checkAnswerButton = document.getElementById('check-answer-btn'); // Кнопка "Show Answer"
const correctButton = document.getElementById('correct-btn'); // Кнопка "Correct"
const incorrectButton = document.getElementById('incorrect-btn'); // Кнопка "Incorrect"

// Змінні для зберігання імен команд та рахунків
let team1Name = '';
let team2Name = '';
let team1Score = 0;
let team2Score = 0;
let currentTurn = 1; // Відстежуємо, яка команда відповідає (1 - Team 1, 2 - Team 2)
let currentQuestion = null; // Зберігаємо поточне запитання

// Дані для категорій
const categories = [
    { 
        name: "Santa Claus", 
        levels: [
            { level: "Easy", question: "Where does Santa Claus live?", answer: "North Pole" },
            { level: "Medium", question: "What color is Santa's suit?", answer: "Red" },
            { level: "Hard", question: "What is Santa's original name?", answer: "Saint Nicholas" }
        ]
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
    // Зберігаємо введені імена команд або використовуємо значення за замовчуванням
    team1Name = document.getElementById('team1-name').value || 'Team 1';
    team2Name = document.getElementById('team2-name').value || 'Team 2';

    // Оновлення табло з іменами команд та початковими балами
    document.getElementById('team1-score').innerText = `${team1Name}: ${team1Score}`;
    document.getElementById('team2-score').innerText = `${team2Name}: ${team2Score}`;

    // Встановлення поточної черги з ім'ям команди
    document.getElementById('turn-indicator').innerText = `Current Turn: ${currentTurn === 1 ? team1Name : team2Name}`;

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

// Функція для вибору категорії
function selectCategory(index) {
    const category = categories[index];

    // Якщо в категорії є рівні запитань, відображаємо їх
    if (category.levels) {
        showLevels(category.levels);
    }
}

// Функція для відображення рівнів складності
function showLevels(levels) {
    levelScreen.classList.add('active');
    categoryScreen.classList.remove('active');

    const levelList = document.getElementById('level-list');
    levelList.innerHTML = ''; // Очищення попереднього вмісту

    levels.forEach((level) => {
        const button = document.createElement('button');
        button.className = 'level-button';
        button.innerText = level.level;
        button.addEventListener('click', () => showQuestion(level));
        levelList.appendChild(button);
    });
}

// Функція для відображення питання
function showQuestion(level) {
    currentQuestion = level; // Зберігаємо поточне питання
    document.getElementById('question-text').innerText = level.question;
    levelScreen.classList.remove('active');
    questionScreen.classList.add('active');
}

// Подія для кнопки "Show Answer"
checkAnswerButton.addEventListener('click', () => {
    if (currentQuestion) {
        document.getElementById('correct-answer').innerText = `The correct answer is: ${currentQuestion.answer}`;
        questionScreen.classList.remove('active');
        answerScreen.classList.add('active');
    }
});

// Подія для кнопки "Correct"
correctButton.addEventListener('click', () => {
    if (currentQuestion) {
        // Визначаємо кількість балів залежно від рівня складності
        let points = 0;
        if (currentQuestion.level === "Easy") points = 1;
        else if (currentQuestion.level === "Medium") points = 2;
        else if (currentQuestion.level === "Hard") points = 3;

        // Додаємо бали до відповідної команди
        if (currentTurn === 1) {
            team1Score += points;
            document.getElementById('team1-score').innerText = `${team1Name}: ${team1Score}`;
        } else {
            team2Score += points;
            document.getElementById('team2-score').innerText = `${team2Name}: ${team2Score}`;
        }
    }
    endTurn();
});


// Подія для кнопки "Incorrect"
incorrectButton.addEventListener('click', () => {
    endTurn();
});

// Завершення ходу та повернення до екрана категорій
function endTurn() {
    answerScreen.classList.remove('active');
    categoryScreen.classList.add('active');

    // Зміна черги на іншу команду з відображенням її імені
    currentTurn = currentTurn === 1 ? 2 : 1;
    document.getElementById('turn-indicator').innerText = `Current Turn: ${currentTurn === 1 ? team1Name : team2Name}`;
    loadCategories();
}
