/* Divs to be Targeted */
var startDiv = document.getElementById("start-div");
var quizDiv = document.getElementById("questions-div");
var resultsDiv = document.getElementById("results-div");
var gameOverDiv = document.getElementById("game-over-form");
var hiscoreDiv = document.getElementById("hiscore-div");

/* Nav Elements to be targeted */
var viewHiscores = document.getElementById("hiscore");
var timer = document.getElementById("timer");

/* Global Variables */
var secondsLeft = 100;
var questionIndex = 0;
var endScore;
var initials;
var answerindex;
var hiscoreArr = [];
var timerInterval;

/* 10 JavaScript based questions */
var questionsAndAnswers = [
    {
        question: "What is 1 + 22 + '33'?",
        answers: ["1. '56' ", "2. 23 + '33'", "3. '2333'", "4. NaN"],
        correctAnswer: "3. '2333'",
    },
    {
        question:
            "Which of the following is proper syntax to link to a JavaScript file from a HTML file?",
        answers: [
            "1. <script src=xxx.js>",
            "2. <script path=xxx.js>",
            "3. <script link=xxx.js>",
            "4. <script href=xxx.js>",
        ],
        correctAnswer: "1. <script src=xxx.js>",
    },
    {
        question: "How we can declare a (function) in JavaScript?",
        answers: [
            "1. declare function myFunction(...)",
            "2. myFunction function(...)",
            "3. var function myFunction(...)",
            "4. function myFunction(...)",
        ],
        correctAnswer: "4. function myFunction(...)",
    },
    {
        question:
            "Commonly used data types DO NOT include which of the following:",
        answers: ["1. Booleans", "2. Numbers", "3. Alerts", "4. Strings"],
        correctAnswer: "3. Alerts",
    },
    {
        question:
            "Which of the following is correct syntax to write an If statement in JavaScript?",
        answers: [
            "1. (if ...){...}",
            "2. if(...){...}",
            "3. if=(...) {...}",
            "4. if{...}(...)",
        ],
        correctAnswer: "2. if(...){...}",
    },
    {
        question:
            "How to find out the highest value of x and y?",
        answers: [
            "1. Math.ceil(x, y)",
            "2. Math.pow(x, y)",
            "3. Math.max(x, y)",
            "4. Math.floor(x, y)",
        ],
        correctAnswer: "3. Math.max(x, y)",
    },
    {
        question:
            "How can we declare an object with Javascript?",
        answers: [
            "1. var variable = {}",
            "2. var variable = new Object()",
            "3. var variable = Object()",
            "4. var variable = new myFunction()",
        ],
        correctAnswer: "1. var variable = {}",
    },
    {
        question:
            "How do we open a new window with JavaScript?",
        answers: [
            "1. window.new(...)",
            "2. window.open(...)",
            "3. open(new window()",
            "4. window.open_new(...)",
        ],
        correctAnswer: "1. window.new(...)",
    },
    {
        question:
            "Arrays in JavaScript can be used to store ____.",
        answers: [
            "1. Numbers & Strings",
            "2. Booleans",
            "3. Other Arrays",
            "4. All of the above",
        ],
        correctAnswer: "4. All of the above",
    },
    {
        question:
            "String values must be enclosed within ____ when being assigned to variables.",
        answers: [
            "1. Commas",
            "2. Quotes",
            "3. Curly Brackets",
            "4. Parentheses",
        ],
        correctAnswer: "2. Quotes",
    },
];

/* Default function for start page, sets main header, game description, and start button */
startPage();
function startPage() {
    timer.textContent = "Timer: 0";

    /* Header Element */
    var startHeader = document.createElement("h1");
    startHeader.textContent = "JavaScript Knowledge Check ✔️";
    startDiv.appendChild(startHeader);

    /* Paragraph Element */
    var gameIntro = document.createElement("p");
    gameIntro.textContent =
        "You have 100 seconds total to answer the 10 questions. Wrong answers will deduct 10 seconds off the timer.";
    startDiv.appendChild(gameIntro);

    /* Start Button */
    var startButton = document.createElement("button");
    startButton.setAttribute("class", "btn");
    startButton.textContent = "Start Quiz";
    startDiv.appendChild(startButton);

    /* Start Button Event Listener */
    startButton.addEventListener("click", function () {
        startTimer();
        renderQuestions();
    });

    /* Hiscores Button Event Listener */
    viewHiscores.addEventListener("click", function () {
        gotoHiscores();
    });
}

/* Timer Function */
function startTimer() {
    var timerInterval = setInterval(function () {
        timer.textContent = "Timer: " + secondsLeft;
        secondsLeft--;

        /* Stopping the timer if it reaches zero or if the last question has been answered */
        if (secondsLeft < 0 || questionIndex === questionsAndAnswers.length) {
            clearInterval(timerInterval);
            setTimeout(gameOver, 1000);
        }
    }, 1000);
}

/* Question Function */
function renderQuestions() {
    /* Clear out starting Div contents */
    startDiv.innerHTML = "";

    /* Clears the Results Div contents */
    resultsDiv.innerHTML = "";

    // stop at the end of the q&a array
    if (questionIndex === questionsAndAnswers.length) {
        return;
    }

    /* Creat Header and Add Questions */
    var questionHeader = document.createElement("h2");
    questionHeader.textContent = questionsAndAnswers[questionIndex].question;
    quizDiv.appendChild(questionHeader);

    /* Create List */
    var optionList = document.createElement("ul");
    optionList.setAttribute("class", "col-lg-12");

    /* Loop through the potential answers and make a list for each of them */
    for (
        var answerindex = 0;
        answerindex < questionsAndAnswers[questionIndex].answers.length;
        answerindex++
    ) {
        var answerListEl = document.createElement("li");
        var answerButton = document.createElement("button");
        answerButton.setAttribute("class", "btn");
        answerButton.textContent =
            questionsAndAnswers[questionIndex].answers[answerindex];
        answerListEl.appendChild(answerButton);
        optionList.appendChild(answerListEl);
    }
    quizDiv.appendChild(optionList);

    /* Event Listener for Click */
    quizDiv.addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        if (event.target.matches("button")) {

            /* If the answer is correct */
            if (
                event.target.textContent ==
                questionsAndAnswers[questionIndex].correctAnswer
            ) {
                quizDiv.innerHTML = "";
                var results = document.createElement("img");
                results.setAttribute("src", "./greenthumbup.png");
                results.setAttribute("alt", "Green Thumb Up");
                resultsDiv.appendChild(results);
                questionIndex++;

                /* Show image for 1 second before the next question */
                setTimeout(renderQuestions, 1000);
            }

            /* If the answer is incorrect */
            else {
                secondsLeft = secondsLeft - 10;
                quizDiv.innerHTML = "";
                var results = document.createElement("img");
                results.setAttribute("src", "./redthumbdown.png");
                results.setAttribute("alt", "Red Thumb Down");
                resultsDiv.appendChild(results);
                questionIndex++;

                /* Show image for 1 second before the next question */
                setTimeout(renderQuestions, 1000);
            }
        }
    });
}

/* Game Over Function */
function gameOver() {
    quizDiv.innerHTML = "";

    /* Clear the results Div */
    resultsDiv.innerHTML = "";

    /* Creating Header */
    var endGameHeader = document.createElement("h2");
    endGameHeader.textContent = "All done!";
    gameOverDiv.appendChild(endGameHeader);

    /* Creating Paragraph */
    var endScore = secondsLeft + 1;
    var endScoreEl = document.createElement("p");
    endScoreEl.setAttribute("class", "col-lg-12");
    endScoreEl.textContent = "Your final score is " + endScore + "!";
    gameOverDiv.appendChild(endScoreEl);

    /* Creating Hiscore Form */
    var hiscoreForm = document.createElement("form");

    /* Creating for form Label */
    var formLabel = document.createElement("label");
    formLabel.setAttribute("class", "form-group mb-2");
    formLabel.textContent = "Enter Initials";
    hiscoreForm.appendChild(formLabel);

    /* Creating for form input */
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control mr-2 ml-2 mb-2");
    hiscoreForm.appendChild(input);

    /* Creating form for Submit Button */
    var submitButton = document.createElement("button");
    submitButton.setAttribute("class", "btn");
    submitButton.textContent = "Submit";
    hiscoreForm.appendChild(submitButton);
    gameOverDiv.appendChild(hiscoreForm);

    /* Submit Button Event Listener */
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        /* Creating variables for Initials Input */
        var initialsEntered = input.value;

        /* If Local storage is empty then just push the Object to the array and set the array to Local storage */
        if (JSON.parse(localStorage.getItem("hiscores")) == null) {
            hiscoreArr.push({ initials: initialsEntered, score: endScore });
            localStorage.setItem("hiscores", JSON.stringify(hiscoreArr));
        }

        /* If the Hiscore array is not empty then just push the Object to the array and set the array to local storage */
        else if (hiscoreArr.length > 0) {
            hiscoreArr.push({ initials: initialsEntered, score: endScore });
            localStorage.setItem("hiscores", JSON.stringify(hiscoreArr));
        }

        /* If there is something in Local storage but not the array then push the Local storage to your array then add new Objects and se the array to Local storage */
        else {
            var hiscoreStorage = JSON.parse(localStorage.getItem("hiscores"));
            for (var i = 0; i < hiscoreStorage.length; i++) {
                hiscoreArr.push(hiscoreStorage[i]);
            }
            hiscoreArr.push({ initials: initialsEntered, score: endScore });
            localStorage.setItem("hiscores", JSON.stringify(hiscoreArr));
        }
        gotoHiscores();
    });
}

/* Hiscores list function */
function gotoHiscores() {

    /* Clearing the start div to view Hiscores */
    startDiv.innerHTML = "";

    // clear the game over div
    /* Clearing the Game Over div */
    gameOverDiv.innerHTML = "";

    /* Clearing the Hiscore div just to ensure there is no duplicates */
    hiscoreDiv.innerHTML = "";

    /* Creating a Header */
    var hiscoreHeader = document.createElement("h2");
    hiscoreHeader.setAttribute("class", "col-lg-12");
    hiscoreHeader.textContent = "Hiscores!";
    hiscoreDiv.appendChild(hiscoreHeader);

    /* Creating a Hiscore Table */
    var hiscoreTable = document.createElement("table");
    hiscoreTable.setAttribute("class", "table col-lg-12");

    /* Creating Table headers */
    var tableHeaderRow = document.createElement("tr");
    var tableInitialsHeader = document.createElement("th");
    var tableScoreHeader = document.createElement("th");
    tableInitialsHeader.textContent = "Initials";
    tableScoreHeader.textContent = "Score";
    tableHeaderRow.appendChild(tableInitialsHeader);
    tableHeaderRow.appendChild(tableScoreHeader);
    hiscoreTable.appendChild(tableHeaderRow);

    /* For loop to iterate through local storage and to display Hiscores */
    for (
        var hiscoreIndex = 0;
        hiscoreIndex < hiscoreArr.length;
        hiscoreIndex++
    ) {

        /* Creating table rows and elements for initials and scores */
        var hiscoreRow = document.createElement("tr");
        var tableInitials = document.createElement("td");
        var tableScores = document.createElement("td");
        var storageScores = JSON.parse(localStorage.getItem("hiscores"));
        tableInitials.textContent = storageScores[hiscoreIndex].initials;
        tableScores.textContent = storageScores[hiscoreIndex].score;
        hiscoreRow.appendChild(tableInitials);
        hiscoreRow.appendChild(tableScores);
        hiscoreTable.appendChild(hiscoreRow);
    }

    /*Append Hiscore Table to Main Div*/
    hiscoreDiv.appendChild(hiscoreTable);

    /* Creat Back Button */
    var buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class", "col-lg-12");
    var backBtn = document.createElement("button");
    backBtn.setAttribute("class", "mr-2 btn");
    backBtn.textContent = "Go Back";
    buttonDiv.appendChild(backBtn);

    /* Clear Button */
    var clearBtn = document.createElement("button");
    clearBtn.setAttribute("class", "btn");
    clearBtn.textContent = "Clear Hiscores";
    buttonDiv.appendChild(clearBtn);
    hiscoreDiv.appendChild(buttonDiv);

    /* Back Button Event Listener */
    backBtn.addEventListener("click", function (event) {
        event.stopImmediatePropagation();

        /* Clear Hiscores and go back to the start page */
        hiscoreDiv.innerHTML = "";
        questionIndex = 0;
        secondsLeft = 100;
        startPage();
    });

    /* Clean Button Event Listener */
    clearBtn.addEventListener("click", function (event) {
        event.stopImmediatePropagation();

        /* Clears Hiscores array and local storage and reloads Hiscores */
        hiscoreArr = [];
        localStorage.clear();
        hiscoreDiv.innerHTML = "";
        return gotoHiscores();
    });
}