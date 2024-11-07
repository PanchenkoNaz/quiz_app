// Елементи для екранів та індикаторів
const questionScreen = document.getElementById('question-screen');
const answerScreen = document.getElementById('answer-screen');
const questionText = document.getElementById('question-text');
const correctAnswerText = document.getElementById('correct-answer');
const turnIndicator = document.getElementById('turn-indicator');

// Кнопки та елементи керування
const showAnswerButton = document.getElementById('show-answer-btn');
const correctButton = document.getElementById('correct-btn');
const incorrectButton = document.getElementById('incorrect-btn');
const backToCategoriesButton = document.getElementById('back-to-categories-btn');
const categoryList = document.getElementById('category-list');

// Дані для категорій і запитань
const categories = [
    { name: "Santa Claus", question: "Where does Santa Claus live?", answer: "North Pole", used: false },
    { name: "Christmas Tree", question: "What type of tree is commonly used as a Christmas tree?", answer: "Evergreen", used: false },
    { name: "Snow", question: "What color is snow?", answer: "White", used: false },
    { name: "Christmas Carols", question: "What carol contains the lyrics 'Silent night, holy night'?", answer: "Silent Night", used: false },
    { name: "Rudolph", question: "What color is Rudolph’s nose?", answer: "Red", used: false },
    { name: "Gifts", question: "What is traditionally placed under a Christmas tree?", answer: "Gifts", used: false },
    { name: "Elves", question: "Who helps Santa make toys?", answer: "Elves", used: false },
    { name: "Christmas Dinner", question: "What bird is often served as the main course of Christmas dinner?", answer: "Turkey", used: false },
    { name: "Holiday Movies", question: "What is the title of the famous Christmas movie with Kevin McCallister?", answer: "Home Alone", used: false },
    { name: "Christmas Stockings", question: "Where are Christmas stockings traditionally hung?", answer: "On the fireplace", used: false }
];

// Змінні для черги команд та рахунку
let team1Score = 0;
let team2Score = 0;
let currentTurn = 1; // 1 - Team 1, 2 - Team 2
let currentQuestionIndex = null;

// Функція для завантаження категорій
function loadCategories() {
    categoryList.innerHTML = '';
    categories.forEach((category, index) => {
        const button = document.createElement('button');
        button.innerText = category.name;
        button.disabled = category.used; // Вимикаємо кнопку, якщо категорія використана
        button.addEventListener('click', () => selectCategory(index));
        categoryList.appendChild(button);
    });
}

// Підготовка запитання для обраної категорії
function selectCategory(index) {
    currentQuestionIndex = index;
    const category = categories[index];
    category.used = true; // Позначаємо категорію як використану

    // Відображення запитання
    questionText.innerText = category.question;
    categoryScreen.classList.remove('active');
    questionScreen.classList.add('active');
}

// Показ відповіді
showAnswerButton.addEventListener('click', () => {
    const category = categories[currentQuestionIndex];
    correctAnswerText.innerText = category.answer;
    questionScreen.classList.remove('active');
    answerScreen.classList.add('active');
});

// Обробка правильної відповіді
correctButton.addEventListener('click', () => {
    if (currentTurn === 1) {
        team1Score++;
        document.getElementById('team1-score').innerText = `${team1Name}: ${team1Score}`;
    } else {
        team2Score++;
        document.getElementById('team2-score').innerText = `${team2Name}: ${team2Score}`;
    }
    endTurn();
});

// Обробка неправильної відповіді
incorrectButton.addEventListener('click', () => {
    endTurn();
});

// Повернення до екрану категорій
backToCategoriesButton.addEventListener('click', () => {
    answerScreen.classList.remove('active');
    categoryScreen.classList.add('active');
    loadCategories(); // Оновлення кнопок категорій
});

// Закінчення ходу і зміна черги
function endTurn() {
    answerScreen.classList.remove('active');
    categoryScreen.classList.add('active');
    currentTurn = currentTurn === 1 ? 2 : 1; // Змінюємо чергу
    turnIndicator.innerText = `Current Turn: ${currentTurn === 1 ? team1Name : team2Name}`;
    loadCategories(); // Оновлення кнопок категорій
}

// Ініціалізація гри
loadCategories();
