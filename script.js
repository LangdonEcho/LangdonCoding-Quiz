//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;


// creating questions array
var questions = [
    {
        questions:"How does a WHILE loop start?",
        choices:
        ["while (i <= 10; i++)",
        "while i = 1 to 10",
        "while (i <= 10)",
        "All of the above"],
        answer: 3,
    },
    {
        questions:"What is the correct way to write a JavaScript array?",
        choices:
        [" var colors = [red, green, blue]", " var colors = red, green, blue",
        " var colors = (1:red, 2:green, 3:blue)",
        " var colors = 1 = (red), 2 = (green), 3 = (blues)"],
        answer: 1,
    },
    {
        questions:"How to write an IF statement in JavaScript?",
        choices:
        [" if i = 5",
        " if i == 5 then", 
        " if i = 5 then",
        " if (i == 5)"],
        answer: 4,
    },
    {
        questions: "Which built-in method combines the text of two strings and returns a new string?",
        choices:
        [" append()",
        " concat()", 
        " attach()",
        " None of the above"],
        answer: 2,
    },
    {
        questions: "Which of the following will write the message “Hello world!” in an alert box?",
        choices:
        [" alertBox(Hello World!)",
        " alert(“Hello World!”)", 
        " msgAlert(“Hello world!”);",
        " None of the Above"],
        answer: 2,
    },
    {
        questions: "Which of the following is an event listener in JavaScript?",
        choices:
        [" onclick",
        " blur", 
        " click",
        " click()"],
        answer: 3,
    },
    {
        questions: "What is the syntax of a “for” statement in JavaScript?",
        choices:[" for(increment; condition; initialization)",
        " for(initialization, condition, increment)", 
        " for(condition; initialization; increment)",
        " for(initialization; condition; increment)"],
        answer: 4,
    },
    {
        questions: "Determine the result – String(“Hello”) === “Hello”;",
        choices:[" true",
        " false", 
        " SyntaxError",
        "ReferenceError"],
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

    next();
}

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

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

//reset the game 
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

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
    timeLeft -= 15; 
    next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
    score += 20;
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