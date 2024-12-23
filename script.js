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
            { level: "Easy", question: "Who was the first president of the United States?", translation: "Wer war der erste Präsident der Vereinigten Staaten?", answer: "George Washington", used: false },
            { level: "Medium", question: "How many years did the Hundred Years' War last?", translation: "Wie viele Jahre dauerte der Hundertjährige Krieg?", answer: "116 years (from 1337 to 1453)", used: false },
            { level: "Hard", question: "Which country was the first to grant women the right to vote in 1893?", translation: "Welches Land war das erste, das 1893 den Frauen das Wahlrecht gewährte?", answer: "New Zealand", used: false }
        ]
    },
    { 
        name: "Sport",
        levels: [
            { level: "Easy", question: "Which tennis player has the most Grand Slam titles among men (as of 2024)?", translation: "Welcher Tennisspieler hat die meisten Grand-Slam-Titel bei den Männern (ab 2024)?", answer: "Novak Djokovic", used: false },
            { level: "Medium", question: "Which country hosted the first FIFA World Cup?", translation: "Welches Land war Gastgeber der ersten FIFA-Weltmeisterschaft?", answer: "Uruguay (1930)", used: false },
            { level: "Hard", question: "Which country is always the first to enter the parade of participants during the opening ceremony of the Olympic Games, and which country ends the parade?", translation: "Welches Land nimmt bei der Eröffnungsfeier der Olympischen Spiele immer als erstes an der Parade der Teilnehmer teil, und welches Land beendet die Parade?", answer: "The first is Greece, the last is the host country", used: false }
        ]
    },
    { 
        name: "Space",
        levels: [
            { level: "Easy", question: "How many planets are there in the solar system?", translation: "Wie viele Planeten gibt es in unserem Sonnensystem?", answer: "8", used: false },
            { level: "Medium", question: "What is the largest object in the solar system after the Sun?", translation: "Welches ist das größte Objekt im Sonnensystem nach der Sonne?", answer: "Jupiter", used: false },
            { level: "Hard", question: "What is the name of the largest volcano in the solar system, which is located on Mars?", translation: "Wie heißt der größte Vulkan im Sonnensystem, der sich auf dem Mars befindet?", answer: "Olympus Mons", used: false }
        ]
    },
    { 
        name: "Food",
        levels: [
            { level: "Easy", question: "What is the most popular drink in the world after water?", translation: "Welches ist nach Wasser das beliebteste Getränk der Welt?", answer: "Tea", used: false },
            { level: "Medium", question: "What kind of delicacy mushroom is grown underground and searched for with the help of dogs or pigs?", translation: "Welche Art von Delikatesspilz wird unterirdisch gezüchtet und mit Hilfe von Hunden oder Schweinen gesucht?", answer: "Truffle", used: false },
            { level: "Hard", question: "Which country is the birthplace of crispy croissants?", translation: "Which country is the birthplace of crispy croissants?", answer: "Austria", used: false }
        ]
    },
    { 
        name: "Fashion and style",
        levels: [
            { level: "Easy", question: "What is the name of the fabric that is the basis for jeans?", translation: "Wie heißt der Stoff, aus dem die Jeans hergestellt wird?", answer: "Denim", used: false },
            { level: "Medium", question: "Which designer created the famous “little black dress”?", translation: "Welcher Designer hat das berühmte „kleine Schwarze“ entworfen?", answer: "Coco Chanel", used: false },
            { level: "Hard", question: "Who is the most famous male face of Dior Sauvage?", translation: "Wer ist das berühmteste männliche Gesicht von Dior Sauvage?", answer: "Johnny Depp", used: false }
        ]
    },
    { 
        name: "Netflix series",
        levels: [
            { level: "Easy", question: "Which Netflix series tells the story of paranormal events in the town of Hawkins in the 1980s?", translation: "Welche Netflix-Serie erzählt die Geschichte von paranormalen Ereignissen in der Stadt Hawkins in den 1980er Jahren?", answer: "Stranger Things", used: false },
            { level: "Medium", question: "Which Netflix series has become the most successful in the South Korean drama genre?", translation: "Welche Netflix-Serie ist die erfolgreichste im südkoreanischen Drama-Genre?", answer: "Squid Game", used: false },
            { level: "Hard", question: "Which Netflix series tells the story of a British criminal group in the early 20th century?", translation: "Welche Netflix-Serie erzählt die Geschichte einer britischen Verbrecherbande im frühen 20. Jahrhundert?", answer: "Peaky Blinders", used: false }
        ]
    },
    { 
        name: "Music",
        levels: [
            { level: "Easy", question: "Which song and band are considered the most popular in the history of the Eurovision Song Contest?", translation: "Welcher Song und welche Band gelten als die beliebtesten in der Geschichte des Eurovision Song Contest?", answer: "Waterloo by ABBA (Sweden, 1974)", used: false },
            { level: "Medium", question: "What famous music festival in the United States, held in 1969, became a symbol of the hippie era?", translation: "Welches berühmte Musikfestival in den Vereinigten Staaten, das 1969 stattfand, wurde zum Symbol der Hippie-Ära?", answer: "Woodstock", used: false },
            { level: "Hard", question: "What musical instrument is considered the oldest in the world?", translation: "Welches Musikinstrument gilt als das älteste der Welt?", answer: "Flute", used: false }
        ]
    },
    { 
        name: "Geography",
        levels: [
            { level: "Easy", question: "What city is the capital of Australia?", translation: "Welche Stadt ist die Hauptstadt von Australien?", answer: "Canberra", used: false },
            { level: "Medium", question: "Which country is the smallest in the world by area?", translation: "Welches Land ist flächenmäßig das kleinste der Welt?", answer: "Vatican City", used: false },
            { level: "Hard", question: "Which country has the largest number of neighboring countries?", translation: "Welches Land hat die größte Anzahl von Nachbarländern?", answer: "China (14 neighbors)", used: false }
        ]
    },
    { 
        name: "Movies",
        levels: [
            { level: "Easy", question: "Which movie is considered the highest-grossing film in the history of cinema?", translation: "Welcher Film gilt als der umsatzstärkste Film in der Geschichte des Kinos?", answer: "Avatar (2009)", used: false },
            { level: "Medium", question: "Which movie won the Oscar for Best Picture in 2024?", translation: "Welcher Film gewann den Oscar für den besten Film im Jahr 2024?",  answer: "Oppenheimer", used: false },
            { level: "Hard", question: "What movie has the highest rating on IMDb in history as of 2024?", translation: "Welcher Film hat bis 2024 die höchste Bewertung auf IMDb in der Geschichte?", answer: "The Shawshank Redemption (1994)", used: false }
        ]
    },
    { 
        name: "Christmas",
        levels: [
            { level: "Easy", question: "What German dessert popular during the Christmas season is shaped like bread with raisins, nuts, and candied fruit?", translation: "Welches deutsche Dessert, das in der Weihnachtszeit beliebt ist, hat die Form eines Brotes mit Rosinen, Nüssen und kandierten Früchten?", answer: "Stollen", used: false },
            { level: "Medium", question: "What city does the legend of St. Nicholas come from?", translation: "Aus welcher Stadt stammt die Legende von St. Nikolaus?", answer: "Myra, Lycia (modern Turkey)", used: false },
            { level: "Hard", question: "In which country do people traditionally eat KFC fried chicken for Christmas?", translation: "In welchem Land isst man an Weihnachten traditionell Brathähnchen von KFC?", answer: "Japan", used: false }
        ]
    },
    { 
        name: "Deutschland",
        levels: [
            { level: "Easy", question: "Which modern German car company is the world's largest car manufacturer by sales?", translation: "Welches moderne deutsche Automobilunternehmen ist der größte Automobilhersteller der Welt, gemessen am Umsatz?", answer: "Volkswagen Group", used: false },
            { level: "Medium", question: "Which architectural school founded in 1919 in Germany had a huge impact on modern design?", translation: "Welche 1919 in Deutschland gegründete Architekturschule hatte einen großen Einfluss auf das moderne Design?", answer: "Bauhaus", used: false },
            { level: "Hard", question: "Which city in Germany is the oldest?", translation: "Welche Stadt in Deutschland ist die älteste?", answer: "Trier", used: false }
        ]
    },
    { 
        name: "Celebrities",
        levels: [
            { level: "Easy", question: "Who is the most popular person on Instagram by number of followers?", translation: "Wer ist die beliebteste Person auf Instagram nach Anzahl der Follower?", answer: "Cristiano Ronaldo", used: false },
            { level: "Medium", question: "Which actress became famous for her role as Hermione Granger?", translation: "Welche Schauspielerin wurde durch ihre Rolle als Hermine Granger berühmt?", answer: "Emma Watson", used: false },
            { level: "Hard", question: "Who is the world's youngest billionaire who achieved this status through her own business?", translation: "Wer ist die jüngste Milliardärin der Welt, die diesen Status durch ihr eigenes Unternehmen erreicht hat?", answer: "Kylie Jenner (21 years old)", used: false }
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

    // Додаємо переклад
    const translation = level.translation || "No translation available"; // Перевіряємо наявність перекладу
    document.getElementById('question-translation').innerText = translation;

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








