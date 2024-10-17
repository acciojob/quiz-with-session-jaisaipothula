const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: 1
    },
    {
        question: "What is the currency of Japan?",
        options: ["Yen", "Dollar", "Euro", "Won"],
        answer: 0
    },
];

// Function to load questions
function loadQuestions() {
    const questionsContainer = document.getElementById("questions-container");
    questions.forEach((q, index) => {
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `<p>${q.question}</p>`;
        
        q.options.forEach((option, i) => {
            questionElement.innerHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${i}" ${getSavedAnswer(index) === i ? 'checked' : ''}>
                    ${option}
                </label>
            `;
        });

        questionsContainer.appendChild(questionElement);
    });
}

// Function to get saved answer from session storage
function getSavedAnswer(index) {
    const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
    return progress[`question${index}`];
}

// Function to save progress to session storage
function saveProgress() {
    const progress = {};
    questions.forEach((_, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            progress[`question${index}`] = Number(selectedOption.value);
        }
    });
    sessionStorage.setItem("progress", JSON.stringify(progress));
}

// Function to calculate score
function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedAnswer = getSavedAnswer(index);
        if (selectedAnswer === q.answer) {
            score++;
        }
    });
    return score;
}

// Event listener for form submission
document.getElementById("quiz-form").addEventListener("submit", function(e) {
    e.preventDefault();
    saveProgress();
    const score = calculateScore();
    document.getElementById("result").innerText = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem("score", score);
});

// Load questions and previous answers
loadQuestions();

