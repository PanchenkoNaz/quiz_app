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
const backToCategoriesButton = document.getElementById('back-to-categories-btn');

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
        name: "History", 
        levels: [
            { level: "Easy", question: "Who was the first president of the United States?", answer: "George Washington", used: false },
            { level: "Medium", question: "How many years did the Hundred Years' War last?", answer: "116 years (from 1337 to 1453)", used: false },
            { level: "Hard", question: "Which country was the first to grant women the right to vote in 1893?", answer: "New Zealand", used: false }
        ]
    },
    { 
        name: "Sport",
        levels: [
            { level: "Easy", question: "Which tennis player has the most Grand Slam titles among men (as of 2024)?", answer: "Novak Djokovic", used: false },
            { level: "Medium", question: "Which country hosted the first FIFA World Cup?", answer: "Uruguay (1930)", used: false },
            { level: "Hard", question: "Which country is always the first to enter the parade of participants during the opening ceremony of the Olympic Games, and which country ends the parade?", answer: "The first is Greece, the last is the host country", used: false }
        ]
    },
    { 
        name: "Space",
        levels: [
            { level: "Easy", question: "How many planets are there in the solar system?", answer: "8", used: false },
            { level: "Medium", question: "What is the largest object in the solar system after the Sun?", answer: "Jupiter", used: false },
            { level: "Hard", question: "What is the name of the largest volcano in the solar system, which is located on Mars?", answer: "Olympus Mons", used: false }
        ]
    },
    { 
        name: "Food",
        levels: [
            { level: "Easy", question: "What is the most popular drink in the world after water?", answer: "Tea", used: false },
            { level: "Medium", question: "What kind of delicacy mushroom is grown underground and searched for with the help of dogs or pigs?", answer: "Truffle", used: false },
            { level: "Hard", question: "Which country is the birthplace of crispy croissants?", answer: "Austria", used: false }
        ]
    },
    { 
        name: "Fashion and style",
        levels: [
            { level: "Easy", question: "What is the name of the fabric that is the basis for jeans?", answer: "Denim", used: false },
            { level: "Medium", question: "Which designer created the famous “little black dress”?", answer: "Coco Chanel", used: false },
            { level: "Hard", question: "Who is the most famous male face of Dior Sauvage?", answer: "Johnny Depp", used: false }
        ]
    },
    { 
        name: "Netflix series",
        levels: [
            { level: "Easy", question: "Which Netflix series tells the story of paranormal events in the town of Hawkins in the 1980s?", answer: "Stranger Things", used: false },
            { level: "Medium", question: "Which Netflix series has become the most successful in the South Korean drama genre?", answer: "Squid Game", used: false },
            { level: "Hard", question: "Which Netflix series tells the story of a British criminal group in the early 20th century?", answer: "Peaky Blinders", used: false }
        ]
    },
    { 
        name: "Music",
        levels: [
            { level: "Easy", question: "Which song and band are considered the most popular in the history of the Eurovision Song Contest?", answer: "Waterloo by ABBA (Sweden, 1974)", used: false },
            { level: "Medium", question: "What famous music festival in the United States, held in 1969, became a symbol of the hippie era?", answer: "Woodstock", used: false },
            { level: "Hard", question: "What musical instrument is considered the oldest in the world?", answer: "Flute", used: false }
        ]
    },
    { 
        name: "Geography",
        levels: [
            { level: "Easy", question: "What city is the capital of Australia?", answer: "Canberra", used: false },
            { level: "Medium", question: "Which country is the smallest in the world by area?", answer: "Vatican City", used: false },
            { level: "Hard", question: "Which country has the largest number of neighboring countries?", answer: "China (14 neighbors)", used: false }
        ]
    },
    { 
        name: "Movies",
        levels: [
            { level: "Easy", question: "Which movie is considered the highest-grossing film in the history of cinema?", answer: "Avatar (2009)", used: false },
            { level: "Medium", question: "Which movie won the Oscar for Best Picture in 2024?", answer: "Oppenheimer", used: false },
            { level: "Hard", question: "What movie has the highest rating on IMDb in history as of 2024?", answer: "The Shawshank Redemption (1994)", used: false }
        ]
    },
    { 
        name: "Christmas",
        levels: [
            { level: "Easy", question: "What German dessert popular during the Christmas season is shaped like bread with raisins, nuts, and candied fruit?", answer: "Stollen", used: false },
            { level: "Medium", question: "What city does the legend of St. Nicholas come from?", answer: "Myra, Lycia (modern Turkey)", used: false },
            { level: "Hard", question: "In which country do people traditionally eat KFC fried chicken for Christmas?", answer: "Japan", used: false }
        ]
    },
    { 
        name: "Germany",
        levels: [
            { level: "Easy", question: "What is the typical color of snow?", answer: "White", used: false },
            { level: "Medium", question: "Which month marks the start of winter?", answer: "December", used: false },
            { level: "Hard", question: "What is the scientific term for frost?", answer: "Hoar frost", used: false }
        ]
    },
    { 
        name: "Celebrities",
        levels: [
            { level: "Easy", question: "Who is the most popular person on Instagram by number of followers?", answer: "Cristiano Ronaldo", used: false },
            { level: "Medium", question: "Which actress became famous for her role as Hermione Granger?", answer: "Emma Watson", used: false },
            { level: "Hard", question: "Who is the world's youngest billionaire who achieved this status through her own business?", answer: "Kylie Jenner (21 years old)", used: false }
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

// Повернення до категорій
backToCategoriesButton.addEventListener('click', () => {
    levelScreen.classList.remove('active');
    categoryScreen.classList.add('active');
});

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
        document.getElementById('correct-answer').innerText = ` ${currentQuestion.answer}`;
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








