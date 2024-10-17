const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        answer: "2"
    }
];

function loadQuiz() {
    const savedProgress = JSON.parse(sessionStorage.getItem('progress')) || {};
    const questionsContainer = document.getElementById('questions');

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h3>${q.question}</h3>
            ${q.options.map((option, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${option}" 
                    ${savedProgress[`question${index}`] === option ? 'checked' : ''}>
                    ${option}
                </label>
            `).join('')}
        `;
        questionsContainer.appendChild(questionDiv);
    });
}

function saveProgress() {
    const savedProgress = {};
    questions.forEach((_, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        savedProgress[`question${index}`] = selectedOption ? selectedOption.value : null;
    });
    sessionStorage.setItem('progress', JSON.stringify(savedProgress));
}

function calculateScore() {
    let score = 0;
    const savedProgress = JSON.parse(sessionStorage.getItem('progress'));
    
    questions.forEach((q, index) => {
        if (savedProgress[`question${index}`] === q.answer) {
            score++;
        }
    });
    
    return score;
}

document.getElementById('submitBtn').addEventListener('click', () => {
    saveProgress();
    const score = calculateScore();
    document.getElementById('score').innerText = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem('score', score);
    document.getElementById('score').classList.remove('hidden');
});

// Load the quiz when the page is loaded
window.onload = loadQuiz;

