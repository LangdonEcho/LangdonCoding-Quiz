//target ids in Score Html
var username =document.querySelector('#username')
var saveScoreBtn = document.querySelector('#saveScoreBtn')
var finalScore = document.querySelector('#finalScore')
var mostRecentScore = localStorage.getItem('mostRecentScore')
//storing score in highscore page
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
//saving  the 5
const MAX_High_SCORES = 5

finalScore.innerText = mostRecentScore

//Enabling save after character is typed
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

//prevent refresh allow you to click the save
saveHighScore = e => {
    e.preventDefault()
    const score = {
        score: mostRecentScore,
        name:username.value
    }

    //sorting high scores by highest deleting lower when submitted
    highScores.push(score)
    highScores.sort((a,b) => {
        return b.score - a.score
        })

        highScores.splice(5)
        localStorage.setItem('highScores', JSON.stringify(highScores))
        window.location.assign('/')

}