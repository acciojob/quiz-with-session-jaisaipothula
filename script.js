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

document.addEventListener('DOMContentLoaded', () => {
    const questionsContainer = document.getElementById('questions');
    
    // Load saved progress from session storage
    const savedProgress = JSON.parse(sessionStorage.getItem('progress')) || {};

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<h3>${q.question}</h3>`;
        
        q.choices.forEach((choice, i) => {
            const checked = savedProgress[index] === i ? 'checked' : '';
            questionDiv.innerHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${i}" ${checked}>
                    ${choice}
                </label>
            `;
        });

        questionsContainer.appendChild(questionDiv);
    });

    // Save progress on change
    questionsContainer.addEventListener('change', () => {
        const selectedOptions = {};
        
        questions.forEach((_, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption) {
                selectedOptions[index] = parseInt(selectedOption.value);
            }
        });

        sessionStorage.setItem('progress', JSON.stringify(selectedOptions));
    });

    // Handle submit button click
    document.getElementById('submitBtn').addEventListener('click', () => {
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
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `Your score is ${score} out of ${questions.length}.`;
        resultDiv.style.display = 'block';
        
        // Clear session storage after submission
        sessionStorage.removeItem('progress');
        
        // Optionally clear the form or reset it
        questionsContainer.innerHTML = ''; // Clear quiz after submission if desired
    });
});
