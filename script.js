const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.Answer-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true; 
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
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
        question: "How to write an IF statement in JavaScript?",
        choice1:"if i = 5",
        choice2:"if i == 5 then", 
        choice3:"if i = 5 then",
        choice4:"if (i == 5)",
        answer: 4,
    },

]

const SCORE_POINT = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions] 
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`    
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    questions.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}
    choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINT)
        }

        setTimeout(() => {
           selectedChoice.parentElement.classList.remove(classToApply)
           getNewQuestion()
        }, 1000) 
    })
 })
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()