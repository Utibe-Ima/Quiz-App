const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progress-text');
const scoretext = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0 
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What color mixture gives white",
        choice1: "red, green and blue",
        choice2: "gray, orange and black",
        choice3: "sea-green, yellow and blue",
        choice4: "blue, yellow and red", 
        answer: 1,
    },


    {
        question: "2X + 2 = 10, Find X",
        choice1: "10",
        choice2: "6",
        choice3: "1",
        choice4: "15",
        answer: 2,
    },


    {
        question: "3x + 2y =5z, 4x + 5y +6z, 2x - 3y + 4z. Find x, y, z",
        choice1: "x(3 3 2) y(6 4 1) z(3 1 6)",
        choice2: "x(2 2 5) y(3 1 6) z(0 2 4)",
        choice3: "x(1 3 5) y(1 2 8) z(1 4 7)",
        choice4: "x(1 4 2) y(1 1 3) z(1 6 3)",
        answer: 1,
    },


    {
        question: "Who is the Father of Abraham?",
        choice1: "Stephen",
        choice2: "Terah",
        choice3: "Noah",
        choice4: "David",
        answer: 2,
    },

    {
        question: "What's the curent price of fuel?",
        choice1: "120",
        choice2: "2400",
        choice3: "160",
        choice4: "161",
        answer: 3
    }
]


const SCORE_POINTS = 100 
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}


getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })


    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true 
} 


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return 

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
      
    })
})


incrementScore = num => {
    score += num
    scoretext.innerText = score 


}

startGame()