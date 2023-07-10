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
  var questionContainer = document.getElementById("question-container");
  var questionElement = document.getElementById("question");
  var choicesElement = document.getElementById("choices");
  var resultContainer = document.getElementById("result-container");
  var resultElement = document.getElementById("result");
  var scoreContainer = document.getElementById("score-container");
  var scoreElement = document.getElementById("score");
  var initialsForm = document.getElementById("initials-form");
  var initialsInput = document.getElementById("initials");