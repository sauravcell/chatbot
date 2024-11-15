<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz with Buttons</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    .question {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .options {
      display: flex;
      flex-direction: column;
    }
    .option-button {
      padding: 10px;
      margin: 5px;
      border: 1px solid #ccc;
      cursor: pointer;
      background-color: #f0f0f0;
      border-radius: 5px;
    }
    .option-button:hover {
      background-color: #e0e0e0;
    }
    .correct {
      background-color: green;
      color: white;
    }
    .wrong {
      background-color: red;
      color: white;
    }
    input {
      padding: 8px;
      margin: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>

  <!-- Input Fields -->
  <div>
    <input type="text" id="input1" placeholder="Enter something">
    <input type="text" id="input2" placeholder="Enter something else">
  </div>

  <div id="quiz-container"></div>

  <script>
    // Array of questions with correct answers
    const questions = [
      { question: "What is the capital of France?", correct: "Paris" },
      { question: "What is 2 + 2?", correct: "4" },
      { question: "What is the largest mammal?", correct: "Blue Whale" },
      { question: "Who wrote 'Hamlet'?", correct: "William Shakespeare" },
      { question: "What is the boiling point of water?", correct: "100°C" },
      { question: "What is the smallest prime number?", correct: "2" },
      { question: "What is the chemical symbol for gold?", correct: "Au" },
      { question: "Who painted the Mona Lisa?", correct: "Leonardo da Vinci" },
      { question: "What planet is known as the Red Planet?", correct: "Mars" },
      { question: "Who developed the theory of relativity?", correct: "Albert Einstein" }
    ];

    // Function to generate wrong answers
    function generateOptions(questions) {
      return questions.map(q => {
        // Get all possible wrong answers
        const otherAnswers = questions
          .filter(item => item.correct !== q.correct) // Exclude correct answer for this question
          .map(item => item.correct);

        // Shuffle the answers and pick the first three
        const shuffled = otherAnswers.sort(() => Math.random() - 0.5);
        const wrongAnswers = shuffled.slice(0, 3);

        // Return the question with correct and wrong options
        return {
          question: q.question,
          options: [q.correct, ...wrongAnswers].sort(() => Math.random() - 0.5) // Shuffle correct + wrong answers
        };
      });
    }

    // Generate questions with answer options
    const quizQuestions = generateOptions(questions);

    let currentQuestionIndex = 0;

    // Function to handle answer selection
    function handleAnswer(selectedOption, correctOption, button) {
      if (selectedOption === correctOption) {
        button.classList.add("correct");
      } else {
        button.classList.add("wrong");
      }
      disableButtons(button);
      setTimeout(() => {
        // Shuffle to the next question after 1 second
        currentQuestionIndex = (currentQuestionIndex + 1) % quizQuestions.length;
        displayQuestion();
      }, 1000);
    }

    // Function to disable all buttons after an answer is selected
    function disableButtons(selectedButton) {
      const buttons = selectedButton.parentNode.querySelectorAll(".option-button");
      buttons.forEach(button => button.disabled = true);
    }

    // Function to display the current question
    function displayQuestion() {
      const quizContainer = document.getElementById("quiz-container");
      quizContainer.innerHTML = ''; // Clear previous question

      const currentQuestion = quizQuestions[currentQuestionIndex];

      const questionElement = document.createElement("div");
      questionElement.classList.add("question");
      questionElement.textContent = `Question: ${currentQuestion.question}`;

      const optionsElement = document.createElement("div");
      optionsElement.classList.add("options");

      currentQuestion.options.forEach(option => {
        const optionButton = document.createElement("button");
        optionButton.classList.add("option-button");
        optionButton.textContent = option;
        optionButton.onclick = function() {
          handleAnswer(option, currentQuestion.correct, optionButton);
        };
        optionsElement.appendChild(optionButton);
      });

      quizContainer.appendChild(questionElement);
      quizContainer.appendChild(optionsElement);
    }

    // Initial display of the first question
    displayQuestion();
  </script>

</body>
</html>
