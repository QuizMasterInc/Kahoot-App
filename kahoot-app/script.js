let currentQuestion = 0;
let timer;
const questions = [
    {
        question: "What is your favorite color?",
        options: ["Red", "Blue", "Green", "Yellow"],
        correctAnswer: 0
    },
    {
        question: "What is your favorite food?",
        options: ["Pizza", "Sushi", "Burger", "Salad"],
        correctAnswer: 1
    },
    {
        question: "What is your favorite animal?",
        options: ["Dog", "Cat", "Bird", "Fish"],
        correctAnswer: 2
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
        input.name = 'answer';
        input.value = index;
        label.appendChild(input);
        label.appendChild(document.createTextNode(` ${option}`));
        optionsDiv.appendChild(label);
    });
}

function startCountdown(seconds) {
    let timeLeft = seconds;
    timer = setInterval(function() {
        document.getElementById('countdown').innerText = `Time left: ${timeLeft} seconds`;

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
    document.getElementById('quiz-container').innerHTML = '<h1>Thank you for answering!</h1>';
}

// Start the countdown when the page loads
window.onload = function() {
    displayQuestion();
    startCountdown(10); // Change the countdown time for each question
};
