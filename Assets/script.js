// Create a repo, clone it down, set up basic file structure
// root-level: assets, ReadMe.md, index.html

// TODO: Create a basic html page which has a start page that includes a button to start our quiz, have a View Highscore button, and has a timer.

// TODO: in our JS, we want to create questions and answers that we can iterate through to display them to the user array of object.

// TODO: set up some global variables, counter, timer, score, highscores

// counter will dictate where we are in our questions array. counter++;
// timer will use set interval so that we have a functional timer that counts down, that we can decrement if the user gets an incorrect answer.
// score save this becuase the user and their score should be saved in local storage.

// when the start button is clicked, start screen to hide => timer to start => questions to show up.

// use JS to change our css to tell the page based on whether we have started what shows on the screen.
// set up the timer so that it runs on the start of the game.
// click handler on the start button.
// start the timer => make sure that the quiz ends at 0 seconds.
// change the css on all of the required html elements so that we get what we want on the page.
// display the first object in the array on the page.
// set up click handlers on the answer buttons so that when a user selects and answer, we can check a few things.
// check if the answer is right or wrong => increment to the next question => on the page if we are at the end of our array we want to end the quiz => incorrect answer decrement time, increment counter
// show the user if they got the question correct or incorrect underneath the answers => use set timeout to change classes to show the user right or wrong
// at the end of the quiz hide the questions and how the user their score (created this var earlier), use the score and the user initials to save that information in local storage
// [user: name, score: 10] each time we pull the information from local storage we set our highscores to either the info their || [];
// hide the user input screen and show the high scores to the user then if they wnat to take the quiz again.

var timeDisplay = document.querySelector("#timer");
var startBtn = document.querySelector("#start-quiz-btn")
var mainPage = document.querySelector("#main-page");
var quizPage = document.querySelector("#quiz-page");
var resultStatus = document.querySelector("#result-status");
var resultStatusMessage = document.querySelector("result-message");
var resultPage = document.querySelector("#result-page");
var userScore = document.querySelector("#user-score");
var userInitial = document.querySelector("#user-initial");
var submitBtn = document.querySelector("#submit-button");

// initial state (visible/hidden) of the main, quiz, result page, and result message.
var mainPageState = mainPage.getAttribute("data-state");
var quizPageState = quizPage.getAttribute("data-state");
var resultPageState = resultPage.getAttribute("data-state");
var resultStatusState = resultStatus.getAttribute("data-state");

var questionsArrIndex = 0; //tracks the index of an object inside the array.
var counter = 0;
var score = 0;
var timeLeft = 75;
var resultMessageTime = 1;
var penalty = 15;
var endOfQuiz = false;

var questionsArr = [
    {
        question: "Commonly used data types DO NOT inlcudes:",
        answer: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },
    {
        question: "Condition in an IF/ELSE statement is enclosed within ____?",
        answer: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswer: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store",
        answer: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variable.",
        answer: ["commas", "curly brackets", "quotes", "parentheses"],
        correctAnswer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "console.log"
    },
]


// Pseudo Coding
// TODO: clicking the "start-quiz" starts the game and shows the first page.



// TODO: As soon as the "Start Quiz" button is clicked, the timer starts with "75" seconds.

// timer function



function startQuiz() {  
    mainPage.hidden = true;
    timer();
    // shows the first question when "start quiz" button is clicked.
    questionShow(0);
}

function timer() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timeDisplay.textContent = "Time: " + timeLeft;

        if (timeLeft === 0 || endOfQuiz === true) {
            clearInterval(timerInterval);
        }
    },1000);
}


function questionShow (questionNum) {
    quizPage.innerHTML = "";

    // pulls out questions from array and show.
    var h2Tags = document.createElement("h2");
    quizPage.appendChild(h2Tags);
    h2Tags.textContent = questionsArr[questionNum].question;

    // creates unordered list with no style.
    var listEl = document.createElement("ul");
    listEl.setAttribute("style", "list-style-type: none; text-align: left;")
    quizPage.appendChild(listEl);

    // creates an individual list under unordered list, pulling choices option from array.
    for (let i = 0; i < questionsArr[questionNum].answer.length; i++) {
        var choiceList = document.createElement("li");
        listEl.appendChild(choiceList);

        var choiceListBtn = document.createElement("button");
        choiceList.appendChild(choiceListBtn);
        choiceListBtn.textContent = questionsArr[questionNum].answer[i];
        choiceListBtn.setAttribute("style", "background-color: springgreen; border-radius: 10px;color: brown;padding: 3px; font-weight: bold; text-align: center; text-decoration: none;font-size: 16px; cursor: pointer;")
    }
}

// Check Answer

function answerVerification (choice) {
    if (choice === questionsArr[questionsArrIndex].correctAnswer) {
        var correct = true;      
        resultMessage(correct);
    } else {
        var correct = false;
        timeLeft =- penalty;
        resultMessage(correct);
    }
}

// Move to next question



// Result Message

function resultMessage (correct) {
    resultStatus.style.visibility = "visible"

    if (correct = true) {
        resultStatusMessage.textContent = "Your choice is a correct answer!"
    } else {
        resultStatusMessage.textContent = "Your choice is an incorrect answer..."
    }

    // timer for the result message
    var resultMessageInterval = setInterval(function () {
        resultMessageTime--;
        if (resultMessageTime === 0) {
            clearInterval(resultMessageInterval);
            resultStatus.style.visibility = "hidden"
            resultStatusMessage.textContent = "";
            }
    }, 1000);

    resultMessageTime = 1;

};



// End Quiz

function quizDone () {
    quizPage.style.visibility = "hidden";
    resultPage.style.visibility = "visible";
    userScore.textContent = timeLeft;
}

startBtn.addEventListener("click", startQuiz);
quizPage.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches("button")) {
        var choice = element.textContent;
        
        if (choice === questionsArr[questionsArrIndex].answer) {
            score++;

        }
        
    }
});

resultPage.hidden = true;
resultStatus.hidden = true;
