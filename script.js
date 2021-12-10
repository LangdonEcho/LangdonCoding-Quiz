//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;


// creating questions array
var question = [
    {
        question:"How does a WHILE loop start?",
        choices:
        ["while (i <= 10; i++)",
        "while i = 1 to 10",
        "while (i <= 10)",
        "All of the above"],
        answer: 3,
    },
    {
        question:"What is the correct way to write a JavaScript array?",
        choices:
        ["1. var colors = [red, green, blue]", "2. var colors = red, green, blue",
        "3. var colors = (1:red, 2:green, 3:blue)",
        "4. var colors = 1 = (red), 2 = (green), 3 = (blues)"],
        answer: 1,
    },
    {
        question:"How to write an IF statement in JavaScript?",
        choices:
        ["1. if i = 5",
        "2. if i == 5 then", 
        "3. if i = 5 then",
        "4. if (i == 5)"],
        answer: 4,
    },
    {
        question: "Which built-in method combines the text of two strings and returns a new string?",
        choices:
        ["1. append()",
        "2. concat()", 
        "3. attach()",
        "4. None of the above"],
        answer: 2,
    },
    {
        question: "Which of the following will write the message “Hello world!” in an alert box?",
        choices:
        ["1. alertBox(Hello World!)",
        "2. alert(“Hello World!”)", 
        "3. msgAlert(“Hello world!”);",
        "4. None of the Above"],
        answer: 2,
    },
    {
        question: "Which of the following is an event listener in JavaScript?",
        choices:
        ["1. onclick",
        "2. blur", 
        "3. click",
        "4. click()"],
        answer: 3,
    },
    {
        question: "What is the syntax of a “for” statement in JavaScript?",
        choices:["1. for(increment; condition; initialization)",
        "2. for(initialization, condition, increment)", 
        "3. for(condition; initialization; increment)",
        "4. for(initialization; condition; increment)"],
        answer: 4,
    },
    {
        question: "Determine the result – String(“Hello”) === “Hello”;",
        choices:["1. true",
        "2. false", 
        "3. SyntaxError",
        "4. ReferenceError"],
        answer: 1,
    },
]
//starts the countdown timer once user clicks the 'start' button
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    //stop the timer to end the game 
    function endGame() {
        clearInterval(timer);
    
        var quizContent = `
        <h2>Game over!</h2>
        <h3>You got a ` + score +  ` /100!</h3>
        <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
        <input type="text" id="name" placeholder="First name"> 
        <button onclick="setScore()">Set score!</button>`;
    
        document.getElementById("quizBody").innerHTML = quizContent;
    };
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}
function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    `;
     document.getElementById("quizBody").innerHTML = quizContent;
}

//clear the scorers names in the local storage
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

//reset the game and return to the main screen if selected 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//correct answers add 100 points
function correct() {
    score += 100;
    next();
}

//loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }
    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}