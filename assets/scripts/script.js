const questions = [
    {
        question: "What is the element used – and hidden – in code that explains things and makes the content more readable?",
        answer: [
            {text: "Notes", correct: false},
            {text: "Comments", correct: true},
            {text: "Comparisons", correct: false},
            {text: "Questions", correct: false},     
        ]
    },
    {    question: "What are the identifiers called that cannot be used as variables or function names?",
        answer: [
            {text: "Constants", correct: false},
            {text: "Reserved Words", correct: true},
            {text: "Favorites", correct: false},
            {text: "Concrete Terms", correct: false},     
        ]
    },
    {   question: "In JavaScript, what element is used to store multiple values in a single variable?",
        answer: [
            {text: "Arrays", correct: true},
            {text: "Functions", correct: false},
            {text: "Strings", correct: false},
            {text: "Variables", correct: false},     
        ]
    },
    {   question: "JavaScript does NOT have this function built-in, which is commonly used to print or display data in other languages.",
        answer: [
            {text: "Show", correct: false},
            {text: "Display", correct: false},
            {text: "Speak", correct: false},
            {text: "Output", correct: true},     
        ]
    },
    {   question: "In JavaScript, what is used in conjunction with HTML to “react” to certain elements?",
        answer: [
            {text: "Events", correct: true},
            {text: "Condition", correct: false},
            {text: "Boolean", correct: false},
            {text: "RegExp", correct: false},     
    ]
    },
    {   question: "This is what you call the guide that defines coding conventions for all projects",
        answer: [
            {text: "Coding Dictionary", correct: false},
            {text: "Main Textbook", correct: false},
            {text: "Style Guide", correct: true},
            {text: "Developer's Reference", correct: false},     
    ]
    },
    {   question: "What kind of statement is used to execute actions based on a trigger or condition?",
        answer: [
            {text: "Boolean Values", correct: false},
            {text: "Fired Events", correct: false},
            {text: "Regular Expression", correct: false},
            {text: "Conditional Statement", correct: true},     
    ]
    },    
    {   question: "In JavaScript, what element is used to store and manipulate text usually in multiples?",
        answer: [
            {text: "Strings", correct: true},
            {text: "Arrays", correct: false},
            {text: "Variables", correct: false},
            {text: "Function", correct: false},     
    ]
    },    
    {   question: "What is the language or list of instructions that are executed by the computer (how JavaScript is built)?",
        answer: [
            {text: "Scope", correct: false},
            {text: "Output", correct: false},
            {text: "JSON", correct: false},
            {text: "Syntax", correct: true},     
    ]
    },    
    {   question: "What elements are used to test for TRUE or False values stored in variables?",
        answer: [
            {text: "Comparison and Logical Operators", correct: true},
            {text: "Conditional Statements", correct: false},
            {text: "Regular Expression", correct: false},
            {text: "Trigger Events", correct: false},     
    ]
    },    
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn")

var timer = document.getElementById('clock');
var stopTime = false;
var highScore = localStorage.getItem("highScore");
var scoreDisplay = document.getElementById("scoreTable");
let currentQuestionIndex = 0;
let score = 0;

function countdown() {
        var timeLeft = 60;

        var timeInterval = setInterval(function () {
            if (timeLeft > 1) {
                timer.textContent = timeLeft + ' Seconds Remaining';
                timeLeft--;                
            }
            else if (timeLeft === 1) {
                timer.textContent = timeLeft + ' Second Remaining';
                timeLeft --;
            }
            else {
                timer.textContent = '';
                clearInterval(timeInterval);
                showScore();
            }
            if (stopTime === true){
                timer.textContent = '';
                clearInterval(timeInterval);
            }
           
        }, 1000);
    }

function startQuiz(){
    stopTime = false;
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    countdown();
    startButton.style.display="none";
    scoreDisplay.textContent = highScore;
   
}

function showQuestion(){
    resetState();
    question.style.display = "block";
    answerButton.style.display = "block";
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
            
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
        
    }
}

function selectAnswer(event) {
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    } 
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");            
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";  
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();    
    } else{
        startQuiz();      
    }
})

startButton.addEventListener("click", ()=>{
    startQuiz();

});

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    scoreDisplay.textContent = highScore;
    if (score > highScore) {
        alert("Congratulations you beat your high score!!!")
        localStorage.setItem("highScore", score);
        scoreDisplay.textContent = highScore;
    }
    else{
        alert("Sorry, you didn't beat your high score try again!!")
        scoreDisplay.textContent = highScore;
    };

}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
        
    } else {
        showScore();
        stopTime = true;
    }
}

