//declaring variables and targeting id and classes
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');
var choices = Array.from(document.querySelectorAll('.Answer-text'));
var question = document.querySelector('#question');

//adding variables
var currentQuestion = {};
var acceptingAnswers = true; 
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

// creating questions array
var questions = [
    {
        question:"How does a WHILE loop start?",
        choice1:"while (i <= 10; i++)",
        choice2:"while i = 1 to 10",
        choice3:"while (i <= 10)",
        choice4:"All of the above",
        answer: 3,
    },
    {
        question:"What is the correct way to write a JavaScript array?",
        choice1:"var colors = [red, green, blue]",
        choice2:"var colors = red, green, blue",
        choice3:"var colors = (1:red, 2:green, 3:blue)",
        choice4:"var colors = 1 = (red), 2 = (green), 3 = (blues)",
        answer: 1,
    },
    {
        question:"How to write an IF statement in JavaScript?",
        choice1:"if i = 5",
        choice2:"if i == 5 then", 
        choice3:"if i = 5 then",
        choice4:"if (i == 5)",
        answer: 4,
    },
    {
        question: "Which built-in method combines the text of two strings and returns a new string?",
        choice1:"append()",
        choice2:"concat()", 
        choice3:"attach()",
        choice4:"None of the above",
        answer: 2,
    },
    {
        question: "Which of the following will write the message “Hello world!” in an alert box?",
        choice1:"alertBox(Hello World!)",
        choice2:"alert(“Hello World!”)", 
        choice3:" msgAlert(“Hello world!”);",
        choice4:"None of the Above",
        answer: 2,
    },
    {
        question: "Which of the following is an event listener in JavaScript?",
        choice1:"onclick",
        choice2:"blur", 
        choice3:"click",
        choice4:"click()",
        answer: 3,
    },
    {
        question: "What is the syntax of a “for” statement in JavaScript?",
        choice1:" for(increment; condition; initialization)",
        choice2:" for(initialization, condition, increment)", 
        choice3:" for(condition; initialization; increment)",
        choice4:" for(initialization; condition; increment)",
        answer: 4,
    },
    {
        question: "Determine the result – String(“Hello”) === “Hello”;",
        choice1:"true",
        choice2:"false", 
        choice3:"SyntaxError",
        choice4:"ReferenceError",
        answer: 1,
    },
]
//fixed amounts
const SCORE_POINT = 100
const MAX_QUESTIONS = 8

//start function
   startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions] 
    getNewQuestion()
}

// Start working code 
// Declared variables
var currentTime = document.querySelector("#time");
// Seconds left is 15 seconds per question:
var secondsLeft = 76;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 10;

// Timer
var sec = 75;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML = sec + "sec left";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time out!! :(");
    }
}
   

 

//creating getNewQuestions functions
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./submit.html')
    }

    //ProgressBar and question number update
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`    
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    //randomizing Questions selection and keeping track of asked Questions
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    //keeping track of choice selections
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}
   
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
//adding the color to incorrect and correct answers
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
// adding points when correct answer is selected 
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINT)
        } 
        selectedChoice.parentElement.classList.add(classToApply)
// adding time between questions to see if answer was correct or not 
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})
// score stacks each time answer is correct  
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()