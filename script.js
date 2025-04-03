const questions = [
  { id: 1, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
  { id: 2, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { id: 3, question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
  { id: 4, question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Austen", "Twain"], answer: "Shakespeare" },
  { id: 5, question: "What is the speed of light?", options: ["300 km/s", "300,000 km/s", "150,000 km/s", "500 km/s"], answer: "300,000 km/s" }
];

// Render quiz questions
function renderQuestions() {
  const questionsContainer = document.getElementById("questions");
  questionsContainer.innerHTML = ""; // Clear previous content

  questions.forEach((q) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${q.question}</p>`;
    
    q.options.forEach((option) => {
      const optionId = `question-${q.id}-option-${option}`;
      questionDiv.innerHTML += `
        <label>
          <input type="radio" name="question-${q.id}" value="${option}" id="${optionId}">
          ${option}
        </label><br>`;
    });

    questionsContainer.appendChild(questionDiv);
  });

  loadProgress(); // Load saved answers from session storage
}

// Save progress to session storage
function saveProgress(questionId, selectedOption) {
  let progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  progress[questionId] = selectedOption;
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// Load progress from session storage
function loadProgress() {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

  for (const [questionId, selectedOption] of Object.entries(progress)) {
    const optionInput = document.querySelector(`input[name="question-${questionId}"][value="${selectedOption}"]`);
    if (optionInput) {
      optionInput.checked = true;
    }
  }
}

// Calculate score and store it in local storage
function calculateScore() {
  let score = 0;
  
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

  questions.forEach((q) => {
    if (progress[q.id] === q.answer) {
      score++;
    }
  });

  localStorage.setItem("score", score);
  
  displayScore(score);
}

// Display the score
function displayScore(score) {
  const scoreContainer = document.getElementById("score");
  
  scoreContainer.textContent = `Your score is ${score} out of ${questions.length}.`;
}

// Event listener for saving progress
document.getElementById("questions").addEventListener("change", (event) => {
  const targetInput = event.target;
  
  if (targetInput.type === "radio") {
    const questionId = targetInput.name.split("-")[1];
    saveProgress(questionId, targetInput.value);
  }
});

// Event listener for submitting the quiz
document.getElementById("submit").addEventListener("click", () => {
  calculateScore();
});

// Initialize the quiz on page load
document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();

  // Display last submitted score from local storage (if available)
  const lastScore = localStorage.getItem("score");
  
  if (lastScore !== null) {
    displayScore(lastScore);
  }
});


