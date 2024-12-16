// Елементи для екранів
const startScreen = document.getElementById('start-screen');
const teamInputScreen = document.getElementById('team-input-screen');
const categoryScreen = document.getElementById('category-screen');
const levelScreen = document.getElementById('level-screen');
const questionScreen = document.getElementById('question-screen');
const answerScreen = document.getElementById('answer-screen');
const finalScreen = document.getElementById('final-screen');

// Кнопки
const startButton = document.getElementById('start-btn');
const startGameButton = document.getElementById('start-game-btn');
const checkAnswerButton = document.getElementById('check-answer-btn');
const correctButton = document.getElementById('correct-btn');
const incorrectButton = document.getElementById('incorrect-btn');
const finishGameButton = document.getElementById('finish-game-btn');
const playAgainButton = document.getElementById('play-again-btn');
const exitButton = document.getElementById('exit-btn');

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
            { level: "Easy", question: "Where does Santa Claus live?", answer: "North Pole", used: false },
            { level: "Medium", question: "What color is Santa's suit?", answer: "Red", used: false },
            { level: "Hard", question: "What is Santa's original name?", answer: "Saint Nicholas", used: false }
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
    { name: "Christmas Stockings" },
    // Дві нові категорії
    { 
        name: "Winter Wonderland", 
        levels: [
            { level: "Easy", question: "What is the typical color of snow?", answer: "White", used: false },
            { level: "Medium", question: "Which month marks the start of winter?", answer: "December", used: false },
            { level: "Hard", question: "What is the scientific term for frost?", answer: "Hoar frost", used: false }
        ]
    },
    { 
        name: "Holiday Traditions", 
        levels: [
            { level: "Easy", question: "What do people hang above fireplaces at Christmas?", answer: "Stockings", used: false },
            { level: "Medium", question: "Which country is credited with starting the Christmas tree tradition?", answer: "Germany", used: false },
            { level: "Hard", question: "What is the name of the traditional Christmas log cake?", answer: "Yule Log", used: false }
        ]
    }
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

    document.getElementById('team1-score').innerText = `${team1Name}: ${team1Score}`;
    document.getElementById('team2-score').innerText = `${team2Name}: ${team2Score}`;
    document.getElementById('turn-indicator').innerText = `Current Turn: ${currentTurn === 1 ? team1Name : team2Name}`;

    teamInputScreen.classList.remove('active');
    categoryScreen.classList.add('active');
    loadCategories();
});

// Завантаження категорій
function loadCategories() {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';

    categories.forEach((category, index) => {
        const button = document.createElement('div');
        button.className = 'category-button';

        // Перевіряємо, чи всі рівні в категорії використані
        const allUsed = category.levels && category.levels.every(level => level.used);

        // Якщо всі рівні використані, категорія стає неактивною
        if (allUsed) {
            button.classList.add('inactive'); // Додаємо клас для стилізації
            button.innerText = `${category.name} (Completed)`; // Додаємо позначку
        } else {
            button.innerText = category.name;
            button.addEventListener('click', () => selectCategory(index)); // Додаємо обробник події
        }

        categoryList.appendChild(button);
    });
}

// Вибір категорії
function selectCategory(index) {
    const category = categories[index];
    if (category.levels) {
        showLevels(category.levels);
    }
}

// Вибір рівня складності
function showLevels(levels) {
    levelScreen.classList.add('active');
    categoryScreen.classList.remove('active');

    const levelList = document.getElementById('level-list');
    levelList.innerHTML = '';

    levels.forEach((level) => {
        if (!level.used) {
            const button = document.createElement('button');
            button.className = 'level-button';
            button.innerText = level.level;
            button.addEventListener('click', () => showQuestion(level));
            levelList.appendChild(button);
        }
    });
}

// Відображення питання
function showQuestion(level) {
    currentQuestion = level;
    document.getElementById('question-text').innerText = level.question;
    levelScreen.classList.remove('active');
    questionScreen.classList.add('active');
}

// Показ відповіді
checkAnswerButton.addEventListener('click', () => {
    if (currentQuestion) {
        document.getElementById('correct-answer').innerText = `The correct answer is: ${currentQuestion.answer}`;
        questionScreen.classList.remove('active');
        answerScreen.classList.add('active');
    }
});

// Нарахування балів
correctButton.addEventListener('click', () => {
    if (currentQuestion) {
        let points = currentQuestion.level === "Easy" ? 1 : currentQuestion.level === "Medium" ? 2 : 3;
        if (currentTurn === 1) {
            team1Score += points;
            document.getElementById('team1-score').innerText = `${team1Name}: ${team1Score}`;
        } else {
            team2Score += points;
            document.getElementById('team2-score').innerText = `${team2Name}: ${team2Score}`;
        }
        currentQuestion.used = true;
    }
    endTurn();
});

// Пропуск балів
incorrectButton.addEventListener('click', () => {
    if (currentQuestion) currentQuestion.used = true;
    endTurn();
});

// Завершення ходу
function endTurn() {
    answerScreen.classList.remove('active');
    categoryScreen.classList.add('active');

    currentTurn = currentTurn === 1 ? 2 : 1;
    document.getElementById('turn-indicator').innerText = `Current Turn: ${currentTurn === 1 ? team1Name : team2Name}`;
    loadCategories();
}

// Завершення гри
finishGameButton.addEventListener('click', () => {
    showFinalResults();
});

// Відображення фінального екрану
function showFinalResults() {
    document.getElementById('team1-final-score').innerText = `${team1Name}: ${team1Score} points`;
    document.getElementById('team2-final-score').innerText = `${team2Name}: ${team2Score} points`;

    if (team1Score > team2Score) {
        document.getElementById('winner').innerText = `Winner: ${team1Name}`;
    } else if (team2Score > team1Score) {
        document.getElementById('winner').innerText = `Winner: ${team2Name}`;
    } else {
        document.getElementById('winner').innerText = "It's a tie!";
    }

    categoryScreen.classList.remove('active');
    finalScreen.classList.add('active');
}

// Почати знову
playAgainButton.addEventListener('click', () => {
    team1Score = 0;
    team2Score = 0;
    currentTurn = 1;

    document.getElementById('team1-score').innerText = `${team1Name}: ${team1Score}`;
    document.getElementById('team2-score').innerText = `${team2Name}: ${team2Score}`;
    document.getElementById('turn-indicator').innerText = `Current Turn: ${team1Name}`;

    finalScreen.classList.remove('active');
    categoryScreen.classList.add('active');
    loadCategories();
});

// Вихід
exitButton.addEventListener('click', () => {
    location.reload();
});



