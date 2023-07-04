const questions = [
    {
        question: "Which one is the first search engine ?",
        answers: [
            { text: "Google", correct: false },
            { text: "Archie", correct: true },
            { text: "Altavista", correct: false },
            { text: "WAIS", correct: false },
        ]
    },
    {
        question: "Number of bit used by the IPv6 address ?",
        answers: [
            { text: "32 bit", correct: false },
            { text: "64 bit", correct: false },
            { text: "128 bit", correct: true },
            { text: "256 bit", correct: false },
        ]
    },
    {
        question: "Which one programming language is exclusively used for artificial intelligence?",
        answers: [
            { text: "C", correct: false },
            { text: "Java", correct: false },
            { text: "J2EE", correct: false },
            { text: "Prolog", correct: true },
        ]
    },
    {
        question: "Which one is the first web browser invented in 1990 ?",
        answers: [
            { text: "Internet Explorer", correct: false },
            { text: "Mosaic", correct: false },
            { text: "Mozilla", correct: false },
            { text: "Nexus", correct: true },
        ]
    },
    {
        question: "First computer virus is known as ?",
        answers: [
            { text: "Rabbit", correct: false },
            { text: "Creeper virus", correct: true },
            { text: "Elk Cloner", correct: false },
            { text: "SCA Virus", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const ansBtn = document.getElementById("answers-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansBtn.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}
function resetState() {
    nextBtn.style.display = "none";
    while (ansBtn.firstChild) {
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}
nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})
startQuiz();