const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"],
        answer: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        answer: 2
    }
];

const questionsContainer = document.getElementById('questions');
const submitButton = document.getElementById('submit-btn');
const scoreDisplay = document.getElementById('score-display');

function loadProgress() {
    const savedAnswers = JSON.parse(sessionStorage.getItem('progress')) || {};
    
    questions.forEach((question, index) => {
        const selectedOption = savedAnswers[index] || null;
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        
        questionDiv.innerHTML = `<p>${index + 1}. ${question.question}</p>`;
        
        question.options.forEach((option, optionIndex) => {
            const checked = selectedOption === optionIndex ? 'checked' : '';
            questionDiv.innerHTML += `
                <label class="option">
                    <input type="radio" name="question${index}" value="${optionIndex}" ${checked}>
                    ${option}
                </label>
            `;
        });
        
        questionsContainer.appendChild(questionDiv);
    });
}
function saveProgress() {
    const answers = {};
    
    questions.forEach((_, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        
        if (selectedOption) {
            answers[index] = parseInt(selectedOption.value);
        }
    });
    
    sessionStorage.setItem('progress', JSON.stringify(answers));
}
function calculateScore() {
    let score = 0;
    
    questions.forEach((question, index) => {
        const selectedOption = JSON.parse(sessionStorage.getItem('progress'))[index];
        
        if (selectedOption === question.answer) {
            score++;
        }
    });
    
    localStorage.setItem('score', score);
    
    return score;
}
submitButton.addEventListener('click', () => {
    saveProgress(); 
    const score = calculateScore();
    
    scoreDisplay.innerHTML = `Your score is ${score} out of ${questions.length}.`;
});
loadProgress();

