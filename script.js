const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2, // Index of the correct option
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1,
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
    answer: 0,
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 2,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
    answer: 1,
  },
];

// Load the questions and render them on the page
function renderQuestions() {
  const questionContainer = document.getElementById("questions");
  questionContainer.innerHTML = ""; // Clear any existing content

  questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.innerText = question.question;
    questionDiv.appendChild(questionText);

    question.options.forEach((option, optionIndex) => {
      const optionLabel = document.createElement("label");
      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = `question${index}`;
      optionInput.value = optionIndex;

      // If there is a stored selection, check it
      if (sessionStorage.getItem("progress")) {
        const progress = JSON.parse(sessionStorage.getItem("progress"));
        if (progress[index] === optionIndex) {
          optionInput.checked = true;
        }
      }

      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(document.createTextNode(option));
      questionDiv.appendChild(optionLabel);
    });

    questionContainer.appendChild(questionDiv);
  });
}

// Save progress to sessionStorage
function saveProgress() {
  const progress = [];
  questions.forEach((_, index) => {
    const selectedOption = document.querySelector(`input[name='question${index}']:checked`);
    progress.push(selectedOption ? parseInt(selectedOption.value) : null);
  });

  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// Calculate score
function calculateScore() {
  const progress = JSON.parse(sessionStorage.getItem("progress"));
  let score = 0;

  questions.forEach((question, index) => {
    if (progress[index] === question.answer) {
      score++;
    }
  });

  return score;
}

// Display score and store it in localStorage
function displayScore() {
  const score = calculateScore();
  const scoreDiv = document.getElementById("score");
  scoreDiv.innerText = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

// Event listener for submit button
document.getElementById("submit").addEventListener("click", () => {
  saveProgress(); // Save the progress before submission
  displayScore(); // Calculate and display the score
});

// Load progress and render questions when the page is loaded or refreshed
window.addEventListener("load", () => {
  renderQuestions();
  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    document.getElementById("score").innerText = `Your score is ${storedScore} out of ${questions.length}.`;
  }
});

