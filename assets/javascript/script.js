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
    //Can add more questions here
  ];

  var currentQuestionIndex = 0;
  var score = 0;
  var timeLeft = 60; // Total time for the quiz in seconds
  var timerInterval;

  var quizContainer = document.getElementById("quiz-container");
  var questionElement = document.getElementById("question");
  var choicesElement = document.getElementById("choices");
  var resultContainer = document.getElementById("result-container");
  var resultElement = document.getElementById("result");
  var scoreContainer = document.getElementById("score-container");
  var scoreElement = document.getElementById("score");
  var initialsForm = document.getElementById("initials-form");
  var initialsInput = document.getElementById("initials");

  function startQuiz() {
    quizContainer.style.display = "block";
    startTimer();
    showQuestion();
  }

  function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
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
        choice.addEventListener("click", handleAnswer);
        choicesElement.appendChild(choice);
    }
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
    scoreElement.textContent = score;

    initialsForm.addEventListener("submit", function(event) {
        event.preventDefault();
        var initials = initialsInput.value;
        
        alert ("Initials and score saved!");
    });
  }

  var startButton = document.createElement("button");
  startButton.textContent = "Start Quiz";
  startButton.addEventListener("click", startQuiz);
  document.body.appendChild(startButton);