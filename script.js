const question = Document.querySelector('#question');
const Answers = Array from (Document.querySelectorAll('.Answer-text');
const progressText = Document.querySelector('#progressText');
const scoreText = Document.querySelector('#scoreText');
const progressBarFull = Document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true 
let score = 0
let questionCounter = 0
let availableQuestion = []

let question = [
    {
        question: 'What is the correct syntax for referring to an external script called "script.js"?'
        choice1:'<script name="script.js">'
        choice2:'<script src="script.js">'
        choice3:'<script href="script.js">'
        choice4:'All of the above'
        answer: 2,
    },
    {
        question: 'How to write an IF statement in JavaScript?'
        choice1:'if i = 5'     
        choice2:'if i == 5 then'  
        choice3:'if i = 5 then'
        choice4:'if (i == 5)'
        answer: 4,
    },
]
