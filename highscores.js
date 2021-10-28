// target id and declaring variables
var highScoreList = document.querySelector('#highScoresList')

var highScores = JSON.parse(localStorage.getItem("highScores")) || []
//creating new array 
highScoresList.innerHTML = highScores.map(score => {
//showing name and score joined 
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")