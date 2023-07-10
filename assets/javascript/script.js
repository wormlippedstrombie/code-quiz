// Defines quiz questions and answers
var questions = [
  {
    question: "What is the correct way to declare a JavaScript variable?",
    choices: ["var myVariable;", "let myVariable;", "const myVariable;", "All of the above"],
    correctAnswer: "All of the above"
  },
  {
    question: "Which method is used to add an element at the end of an array in JavaScript?",
    choices: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "push()"
  },
  {
    question: "What does CSS stand for?",
    choices: ["Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
    correctAnswer: "Cascading Style Sheets"
  },
  // Can add more questions here
];

var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60; // Total time for the quiz in seconds
var timerInterval;

var startButton = document.createElement("button");
startButton.textContent = "Start Quiz";
startButton.className = "button button-primary";
startButton.addEventListener("click", startQuiz);
document.getElementById("quiz-container").appendChild(startButton);

var quizContainer = document.getElementById("quiz-container");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var resultContainer = document.getElementById("result-container");
var resultElement = document.getElementById("result");
var scoreContainer = document.getElementById("score-container");
var scoreElement = document.getElementById("score");
var initialsFormContainer = document.getElementById("initials-form-container");
var initialsForm = document.getElementById("initials-form");
var initialsInput = document.getElementById("initials-input");
var highScoresTableBody = document.getElementById("high-scores-table-body");
var playAgainButton = document.getElementById("play-again-button");
var highScoresContainer = document.getElementById("high-scores-container");

playAgainButton.addEventListener("click", function () {
  showQuizScreen();
});

var restartButton = document.createElement("button");
restartButton.textContent = "Restart Quiz";
restartButton.className = "button button-primary";
restartButton.addEventListener("click", function () {
  startQuiz();
});

var clearHighScoresButton = document.createElement("button");
clearHighScoresButton.textContent = "Clear High Scores";
clearHighScoresButton.className = "button button-secondary";
clearHighScoresButton.addEventListener("click", function () {
  clearHighScores();
});

function startQuiz() {
  startButton.style.display = "none"; // Hide the "Start Quiz" button
  quizContainer.style.display = "block";
  scoreContainer.style.display = "none"; // Hide the score display initially
  initialsFormContainer.style.display = "none"; // Hide the initials form initially
  highScoresContainer.style.display = "none"; // Hide the high scores container initially
  highScoresTableBody.innerHTML = ""; // Clear the high scores table body
  score = 0;
  timeLeft = 60;
  currentQuestionIndex = 0;
  startTimer();
  showQuestion();
}

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function showQuestion() {
  var question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;
  choicesElement.innerHTML = "";

  for (var i = 0; i < question.choices.length; i++) {
    var choice = document.createElement("button");
    choice.textContent = question.choices[i];
    choice.className = "choice-button";
    choice.addEventListener("click", handleAnswer);
    choicesElement.appendChild(choice);
  }

  document.getElementById("timer").textContent = timeLeft; // Update the timer display
}

function handleAnswer(event) {
  var selectedChoice = event.target;
  var question = questions[currentQuestionIndex];

  if (selectedChoice.textContent === question.correctAnswer) {
    resultElement.textContent = "Correct!";
    score += 10;
  } else {
    resultElement.textContent = "Wrong!";
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }

  resultContainer.style.display = "block";

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setTimeout(showQuestion, 1000);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.style.display = "none";
  resultContainer.style.display = "none";
  scoreContainer.style.display = "block";
  showInitialsForm();
  playAgainButton.style.display = "block";
  highScoresContainer.style.display = "block";
  showHighScoresScreen();
}

function showInitialsForm() {
  initialsFormContainer.style.display = "block";
}

initialsForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var initials = initialsInput.value;
  var highScores = getHighScores();
  highScores.push({ initials: initials, score: score });
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
  localStorage.setItem("highScores", JSON.stringify(highScores));
  alert("Initials and score saved!");

  showHighScoresScreen();
});

function showHighScoresScreen() {
  scoreContainer.style.display = "none";
  highScoresContainer.style.display = "block";

  var highScores = getHighScores();
  highScoresTableBody.innerHTML = ""; // Clear the high scores table body

  if (highScores.length > 0) {
    for (var i = 0; i < highScores.length; i++) {
      var scoreRow = document.createElement("tr");
      var initialsData = document.createElement("td");
      initialsData.textContent = highScores[i].initials;
      var scoreData = document.createElement("td");
      scoreData.textContent = highScores[i].score;
      scoreRow.appendChild(initialsData);
      scoreRow.appendChild(scoreData);
      highScoresTableBody.appendChild(scoreRow);
    }
  } else {
    highScoresTableBody.innerHTML = "<tr><td colspan='2'>No high scores found.</td></tr>";
  }

  var restartButton = document.querySelector("#high-scores-container button.button-primary");
  if (!restartButton) {
    restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.className = "button button-primary";
    restartButton.addEventListener("click", function () {
      startQuiz();
    });
    highScoresContainer.appendChild(restartButton);
  }

  // Show restart and clear high scores buttons only if the quiz is completed
  if (currentQuestionIndex === questions.length) {
    highScoresContainer.appendChild(clearHighScoresButton);
  }
}

function clearHighScores() {
  localStorage.removeItem("highScores");
  highScoresTableBody.innerHTML = "<tr><td colspan='2'>No high scores found.</td></tr>";
}

function showQuizScreen() {
  scoreContainer.style.display = "none";
  initialsFormContainer.style.display = "none";
  highScoresContainer.style.display = "none";
  startQuiz();
}

function getHighScores() {
  var highScores = localStorage.getItem("highScores");
  return highScores ? JSON.parse(highScores) : [];
}

// Initial check for high scores and display high scores screen if high scores exist
var highScores = getHighScores();
if (highScores.length > 0) {
  showHighScoresScreen();
}