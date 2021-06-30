// Global Variables.
var timeDisplay = document.querySelector("#timer");
var startBtn = document.querySelector("#start-quiz-btn")
var mainPage = document.querySelector("#main-page");
var quizPage = document.querySelector("#quiz-page");
var resultStatus = document.querySelector("#result-status");
var resultStatusMessage = document.querySelector("#result-message");
var resultPage = document.querySelector("#result-page");
var userScore = document.querySelector("#user-score");
var userInitial = document.querySelector("#user-initial");
var submitBtn = document.querySelector("#submit-button");

// Tracks the index of an object inside the array.
var questionsArrIndex = 0; 
// Initial time decleration.
var timeLeft = 100;
// Duration for result message to display.
var resultMessageTime = 2;
// When user gets incorrect answer, there is 15 seconds penalty.
var penalty = 15;
// This is declared so that during the quiz, endOfQuiz is false but when the criteria is fulfilled to end the quiz, this changes to true.
var endOfQuiz = false;

// Array of objects for questions and answers.
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

// This function activates when user clicks the 'start quiz' button and hide the main page. Then the timer starts and show the first question. 
function startQuiz() {  
    mainPage.hidden = "true";
    timer();
    // shows the first question when "start quiz" button is clicked.
    questionShow(0);
}

// Timer function.
function timer() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timeDisplay.textContent = "Time: " + timeLeft;

        if (timeLeft === 0 || endOfQuiz === true) {
            clearInterval(timerInterval);
            quizDone();
        }
    },1000);
}

// This function allows to create a question and answer choices (buttons) based on which problem the user is currently at.
function questionShow (questionNum) {
    quizPage.innerHTML = "";

    // Pulls out questions from array and show.
    var h2Tags = document.createElement("h2");
    quizPage.appendChild(h2Tags);
    h2Tags.textContent = questionsArr[questionNum].question;

    // Creates unordered list with no style.
    var listEl = document.createElement("ul");
    listEl.setAttribute("style", "list-style-type: none; text-align: ceter;")
    quizPage.appendChild(listEl);

    // Creates an individual list under unordered list, pulling choices option from array.
    for (let i = 0; i < questionsArr[questionNum].answer.length; i++) {
        var choiceList = document.createElement("li");
        listEl.appendChild(choiceList);

        var choiceListBtn = document.createElement("button");
        choiceList.appendChild(choiceListBtn);
        choiceListBtn.textContent = questionsArr[questionNum].answer[i];
        // Assining the button style attribute.
        choiceListBtn.setAttribute("style", "background-color: springgreen; border-radius: 10px;color: brown; padding: 3px; margin: 3px 0 0 3px; font-weight: bold; text-align: center; text-decoration: none;font-size: 16px; cursor: pointer;")
    }
};

// This function takes user's choice and go through the iteration to check if the answer is correct or incorrect. Based on user's choice, the result message displays in the page. If user gets incorrect answer, there is 15 seconds of penalty in time.
function answerVerification (choice) {
    if (choice === questionsArr[questionsArrIndex].correctAnswer) {
        var correct = true;      
        resultMessage(correct);
    } else {
        var correct = false;
        timeLeft = timeLeft - penalty;
        resultMessage(correct);
    };
};

// Display the result message when user picks the choice in each questions.
function resultMessage (correct) {
    
    if (correct) {
        resultStatus.removeAttribute("hidden");
        resultStatusMessage.textContent = "Your choice is a correct answer!";
        resultStatusMessage.setAttribute("style", "font-weight: bolder; color: navy;")
    } else {
        resultStatus.removeAttribute("hidden");
        resultStatusMessage.textContent = "Your choice is an incorrect answer...";
        resultStatusMessage.setAttribute("style", "font-weight: bolder; color: navy;")
    }
    // timer for the result message
    var resultMessageInterval = setInterval(function () {
        resultMessageTime--;
        if (resultMessageTime === 0) {
            clearInterval(resultMessageInterval);
            resultStatus.hidden = "true";
            resultStatusMessage.innerHTML = "";
            }
    }, 1000);
    resultMessageTime = 2;
};

// If the user's choice matches with the answer, it goes through iteration to proceed to the next questions. Before proceeding to next questions, it checks if the question is the last quesion or not. 
function nextQuestion(event) {
    if (event.target.matches("button")) {
        var choice = event.target.textContent;
        
        if (questionsArrIndex === questionsArr.length -1) {
            answerVerification(choice);
            endOfQuiz = true;
        } else {
            answerVerification(choice);
            questionsArrIndex++;
            questionShow(questionsArrIndex);
        }
    }
}

// This function allows the quiz to end WHEN the time runs out or the user completes answering all questions. Then, shows the result page with the score.
function quizDone() {
    quizPage.hidden = "true";
    resultPage.removeAttribute("hidden");
    userScore.textContent = timeLeft;
}

// This should have stored data in local storage but this lines of code are not working properly. 
    function saveUserScores(event) {
        event.preventDefault();
        var initials = userInitial.value;
        if (initials === null) {
            alert("Please type valid initial.");
        } else {
            var finalScore = new Object();
            finalScore.initials = initials;
            finalScore.score = timeLeft;
            var scoreDatas = localStorage.getItem("scoreDatas");
            if (scoreDatas === null) {
                scoreDatas = [];
            } else {
                scoreDatas = JSON.parse(scoreDatas);
            }
            scoreDatas.push(finalScore);
            var newData = JSON.stringify(scoreDatas);
            localStorage.setItem("scoreDatas", newData);
            window.location.replace("scoreboard.html");
        }
    }

// This allows to start the quiz by clicking the 'start quiz' button.
startBtn.addEventListener("click", startQuiz);
// This allows to proceed to the next question when user clicks their choice.
quizPage.addEventListener("click", nextQuestion);
// This allows to save the user's data into the local storage.
submitBtn.addEventListener("submit", saveUserScores);

