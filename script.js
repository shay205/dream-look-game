/* =========================================
   SHEILA'S DEV QUEST
   GAME LOGIC
========================================= */


/* =========================================
   QUESTIONS
========================================= */

const questions = [

    {
        category: "Python",
        question: "Which keyword is used to define a function in Python?",
        answers: [
            "function",
            "define",
            "def",
            "func"
        ],
        correct: 2,
        explanation: "Python uses the 'def' keyword to define a function."
    },

    {
        category: "JavaScript",
        question: "Which symbol is commonly used to declare a constant in JavaScript?",
        answers: [
            "const",
            "constant",
            "letconst",
            "fixed"
        ],
        correct: 0,
        explanation: "The 'const' keyword creates a variable that cannot be reassigned."
    },

    {
        category: "HTML",
        question: "Which HTML element is used to create a hyperlink?",
        answers: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        correct: 1,
        explanation: "The <a> element creates hyperlinks in HTML."
    },

    {
        category: "CSS",
        question: "Which CSS property changes the text color?",
        answers: [
            "font-color",
            "text-color",
            "color",
            "foreground"
        ],
        correct: 2,
        explanation: "The CSS 'color' property changes the color of text."
    },

    {
        category: "SQL",
        question: "Which SQL command is used to retrieve data from a database?",
        answers: [
            "GET",
            "SELECT",
            "FETCH",
            "OPEN"
        ],
        correct: 1,
        explanation: "SELECT is used to retrieve records from a database."
    },

    {
        category: "Git",
        question: "Which command is used to upload local commits to a remote Git repository?",
        answers: [
            "git upload",
            "git send",
            "git push",
            "git publish"
        ],
        correct: 2,
        explanation: "git push sends your local commits to a remote repository."
    },

    {
        category: "Cybersecurity",
        question: "What does HTTPS provide for a website connection?",
        answers: [
            "A faster processor",
            "Encrypted communication",
            "More storage",
            "A larger database"
        ],
        correct: 1,
        explanation: "HTTPS uses encryption to help protect data exchanged between the browser and server."
    },

    {
        category: "Python",
        question: "Which data type stores multiple items in an ordered collection?",
        answers: [
            "list",
            "integer",
            "boolean",
            "float"
        ],
        correct: 0,
        explanation: "A Python list stores multiple items in an ordered collection."
    },

    {
        category: "JavaScript",
        question: "Which method adds an item to the end of a JavaScript array?",
        answers: [
            "add()",
            "append()",
            "push()",
            "insert()"
        ],
        correct: 2,
        explanation: "The push() method adds one or more elements to the end of an array."
    },

    {
        category: "Web Development",
        question: "What does CSS primarily control?",
        answers: [
            "Database records",
            "Page styling and layout",
            "Server hardware",
            "User passwords"
        ],
        correct: 1,
        explanation: "CSS controls the appearance, styling and layout of web pages."
    }

];


/* =========================================
   GAME STATE
========================================= */

let currentQuestion = 0;

let score = 0;

let xp = 0;

let correctAnswers = 0;

let answered = false;

const xpPerQuestion = 20;

const xpPerLevel = 100;


/* =========================================
   ELEMENTS
========================================= */

const welcomeScreen =
    document.getElementById("welcomeScreen");

const gameScreen =
    document.getElementById("gameScreen");

const resultScreen =
    document.getElementById("resultScreen");

const startGame =
    document.getElementById("startGame");

const restartGame =
    document.getElementById("restartGame");

const question =
    document.getElementById("question");

const answers =
    document.getElementById("answers");

const feedback =
    document.getElementById("feedback");

const nextQuestion =
    document.getElementById("nextQuestion");

const scoreElement =
    document.getElementById("score");

const levelElement =
    document.getElementById("level");

const xpText =
    document.getElementById("xpText");

const xpProgress =
    document.getElementById("xpProgress");

const questionNumber =
    document.getElementById("questionNumber");

const category =
    document.getElementById("category");

const finalScore =
    document.getElementById("finalScore");

const finalXP =
    document.getElementById("finalXP");

const finalAccuracy =
    document.getElementById("finalAccuracy");

const themeToggle =
    document.getElementById("themeToggle");


/* =========================================
   SCREEN SWITCHING
========================================= */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(function (item) {

            item.classList.remove("active");

        });

    screen.classList.add("active");
}


/* =========================================
   START GAME
========================================= */

function startTheGame() {

    currentQuestion = 0;

    score = 0;

    xp = 0;

    correctAnswers = 0;

    updateStats();

    showScreen(gameScreen);

    loadQuestion();
}


/* =========================================
   LOAD QUESTION
========================================= */

function loadQuestion() {

    answered = false;

    feedback.textContent = "";

    feedback.className = "feedback";

    nextQuestion.style.display = "none";

    const current =
        questions[currentQuestion];

    questionNumber.textContent =
        `Challenge ${currentQuestion + 1} of ${questions.length}`;

    category.textContent =
        current.category;

    question.textContent =
        current.question;

    answers.innerHTML = "";


    current.answers.forEach(function (answer, index) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "answer-button";

        button.textContent =
            answer;

        button.addEventListener(
            "click",
            function () {

                checkAnswer(index, button);

            }
        );

        answers.appendChild(button);

    });

}


/* =========================================
   CHECK ANSWER
========================================= */

function checkAnswer(selectedIndex, selectedButton) {

    if (answered) {
        return;
    }

    answered = true;

    const current =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer-button");


    buttons.forEach(function (button) {

        button.disabled = true;

    });


    if (selectedIndex === current.correct) {

        selectedButton.classList.add("correct");

        feedback.classList.add("correct");

        feedback.textContent =
            `✓ Correct! ${current.explanation}`;

        score += 100;

        xp += xpPerQuestion;

        correctAnswers++;

    } else {

        selectedButton.classList.add("incorrect");

        buttons[current.correct]
            .classList.add("correct");

        feedback.classList.add("incorrect");

        feedback.textContent =
            `✕ Not quite. ${current.explanation}`;

    }


    updateStats();

    nextQuestion.style.display =
        "inline-block";
}


/* =========================================
   NEXT QUESTION
========================================= */

function goToNextQuestion() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        finishGame();

        return;
    }

    loadQuestion();
}


/* =========================================
   UPDATE STATS
========================================= */

function updateStats() {

    scoreElement.textContent =
        score;

    const level =
        Math.floor(xp / xpPerLevel) + 1;

    levelElement.textContent =
        level;

    const currentLevelXP =
        xp % xpPerLevel;

    xpText.textContent =
        `${currentLevelXP} / ${xpPerLevel} XP`;

    xpProgress.style.width =
        `${currentLevelXP}%`;
}


/* =========================================
   FINISH GAME
========================================= */

function finishGame() {

    const accuracy =
        Math.round(
            (correctAnswers / questions.length) * 100
        );

    finalScore.textContent =
        score;

    finalXP.textContent =
        xp;

    finalAccuracy.textContent =
        `${accuracy}%`;

    showScreen(resultScreen);
}


/* =========================================
   RESTART
========================================= */

function restartTheGame() {

    startTheGame();
}


/* =========================================
   DARK / LIGHT MODE
========================================= */

function toggleTheme() {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    themeToggle.textContent =
        isDark ? "☀️" : "🌙";
}


/* =========================================
   EVENT LISTENERS
========================================= */

startGame.addEventListener(
    "click",
    startTheGame
);

restartGame.addEventListener(
    "click",
    restartTheGame
);

nextQuestion.addEventListener(
    "click",
    goToNextQuestion
);

themeToggle.addEventListener(
    "click",
    toggleTheme
);


/* =========================================
   INITIAL STATE
========================================= */

updateStats();