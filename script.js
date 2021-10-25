const question = document.querySelector('#question');
const Answers = Array.from(document.querySelectorAll('.Answer-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true; 
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [
    {
        question: 'How does a WHILE loop start?',
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
        answer: 4,
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
        question: 'How to write an IF statement in JavaScript?',
        choice1:"if i = 5",
        choice2:"if i == 5 then", 
        choice3:"if i = 5 then",
        choice4:"if (i == 5)",
        answer: 4,
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        choice1:"if i = 5",
        choice2:"if i == 5 then", 
        choice3:"if i = 5 then",
        choice4:"if (i == 5)",
        answer: 4,
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        choice1:"if i = 5",
        choice2:"if i == 5 then", 
        choice3:"if i = 5 then",
        choice4:"if (i == 5)",
        answer: 4,
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        choice1:"if i = 5",
        choice2:"if i == 5 then", 
        choice3:"if i = 5 then",
        choice4:"if (i == 5)",
        answer: 4,
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        choice1:"if i = 5",
        choice2:"if i == 5 then", 
        choice3:"if i = 5 then",
        choice4:"if (i == 5)",
        answer: 4,
    },
]

const Score_Board = 100
const Max_questions = 8

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestion = [...questions] 
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > Max_questions) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${Max_questions}`    
    progressBarFull.style.width = `${(questionCounter/Max_questions) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestion.length)
    currentQuestion = availableQuestion[questionsIndex]
    questions.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestion.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choices =>{
    choices.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if (classToApply === 'correct') {
            incrementScore(Score_Board)
        }

        setTimeout(() => {
           selectedChoice.parentElement.classList.remove(classToApply)
           getNewQuestion
        }, 1000) 
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()