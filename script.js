const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2 // Index of correct answer
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3
    },
    {
        question: "Who wrote 'Hamlet'?",
        choices: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"],
        answer: 2
    },
    {
        question: "What is the smallest prime number?",
        choices: ["0", "1", "2", "3"],
        answer: 2
    }
];

// Load saved progress from session storage
function loadProgress() {
    const savedProgress = JSON.parse(sessionStorage.getItem('progress')) || {};
    
    questions.forEach((q, index) => {
        const selectedAnswer = savedProgress[index];
        if (selectedAnswer !== undefined) {
            document.querySelector(`input[name="question${index}"][value="${selectedAnswer}"]`).checked = true;
        }
    });
}

// Save progress to session storage
function saveProgress() {
    const progress = {};
    
    questions.forEach((_, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            progress[index] = selectedOption.value; // Store selected value
        }
    });

    sessionStorage.setItem('progress', JSON.stringify(progress));
}

// Render questions in the quiz container
function renderQuestions() {
    const quizContainer = document.getElementById('quiz-container');
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<h3>${q.question}</h3>`;
        
        q.choices.forEach((choice, i) => {
            questionDiv.innerHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${i}">
                    ${choice}
                </label>
            `;
        });

        quizContainer.appendChild(questionDiv);
    });
}

// Calculate score and display it
function calculateScore() {
    let score = 0;

    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        
        if (selectedOption && parseInt(selectedOption.value) === q.answer) {
            score++;
        }
    });

    // Store score in local storage
    localStorage.setItem('score', score);
    
    // Display result
    const scoreDiv = document.getElementById('score');
    scoreDiv.innerHTML = `Your score is ${score} out of ${questions.length}.`;
    scoreDiv.style.display = 'block';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderQuestions();
    
    // Load saved progress from session storage on page load
    loadProgress();

    // Save progress on change of selection
    document.getElementById('quiz-container').addEventListener('change', saveProgress);

    // Handle submit button click
    document.getElementById('submit-btn').addEventListener('click', calculateScore);
});

