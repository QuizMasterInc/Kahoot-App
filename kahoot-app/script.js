let currentQuestion = 0;
let timer;
let score = 0; // Initialize the score variable
const questions = [
    {
        question: "What is my favorite color?",
        options: ["Red", "Purple", "Green", "Yellow"],
        correctAnswer: 1
    },
    {
        question: "What is my favorite food?",
        options: ["Pizza", "Sushi", "Burger", "Salad"],
        correctAnswer: 2
    },
    {
        question: "What is my favorite animal?",
        options: ["Dog", "Cat", "Horse", "Chinchila"],
        correctAnswer: 0
    }
];

function displayQuestion() {
    const currentQuestionObj = questions[currentQuestion];
    document.getElementById('question').innerText = currentQuestionObj.question;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // Clear previous options

    currentQuestionObj.options.forEach((option, index) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer'; // Ensure all radio inputs for answers have the same name
        input.value = index;
        label.appendChild(input);
        label.appendChild(document.createTextNode(` ${option}`));
        optionsDiv.appendChild(label);
    });
    
    
}

function startCountdown(seconds) {
    let timeLeft = seconds;
    timer = setInterval(function() {
        document.getElementById('countdown-text').innerText = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            if (currentQuestion >= questions.length) {
                endQuiz();
            } else {
                displayQuestion();
                startCountdown(10); // Change the countdown time for each question
            }
        }

        timeLeft--;
    }, 1000);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);
        const currentQuestionObj = questions[currentQuestion];

        if (answerIndex === currentQuestionObj.correctAnswer) {
            console.log('Correct answer!');
            score++; // Increase the score if the answer is correct
        } else {
            console.log('Incorrect answer!');
        }

        clearInterval(timer); // Stop the countdown
        currentQuestion++;
        if (currentQuestion >= questions.length) {
            endQuiz();
        } else {
            displayQuestion();
            startCountdown(10); // Change the countdown time for each question
        }
    } else {
        alert('Please select an option!');
    }
}

function endQuiz() {
    let incorrectQuestions = [];

    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="answer${index}"]:checked`);

        if (selectedOption) {
            const answerIndex = parseInt(selectedOption.value);
            if (answerIndex !== question.correctAnswer) {
                incorrectQuestions.push({ question: question.question, correctAnswer: question.options[question.correctAnswer], selectedAnswer: question.options[answerIndex] });
            }
        } else {
            incorrectQuestions.push({ question: question.question, correctAnswer: question.options[question.correctAnswer], selectedAnswer: 'Not answered' });
        }
    });

    let resultHTML = `<h1>Quiz Results</h1>`;
    resultHTML += `<p>Your score: ${score}/${questions.length}</p>`;

    if (incorrectQuestions.length > 0) {
       

        resultHTML += `<button onclick="showCorrectAnswers()">Show Correct Answers</button>`;
    } else {
        resultHTML += `<p>Congratulations! You got all the answers correct!</p>`;
    }

    document.getElementById('quiz-container').innerHTML = resultHTML;
}

function showCorrectAnswers() {
    let correctAnswersHTML = `<h2>Correct Answers:</h2>`;
    questions.forEach((question, index) => {
        correctAnswersHTML += `<p><strong>${index + 1}. ${question.question}</strong></p>`;
        correctAnswersHTML += `<p><strong>Correct Answer:</strong> ${question.options[question.correctAnswer]}</p>`;
    });

    document.getElementById('quiz-container').innerHTML += correctAnswersHTML;
}

// Start the countdown when the page loads
window.onload = function() {
    displayQuestion();
    startCountdown(10); // Change the countdown time for each question
};
