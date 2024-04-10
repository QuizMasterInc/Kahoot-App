let currentQuestion = 0; // Changed to start from 0
let timer;
const questions = [
    {
        question: "Question 1: What is your favorite color?",
        options: ["Red", "Blue", "Green", "Yellow"],
        correctAnswer: "a"
    },
    {
        question: "Question 2: What is your favorite food?",
        options: ["Pizza", "Sushi", "Burger", "Salad"],
        correctAnswer: "b"
    },
    {
        question: "Question 3: What is your favorite animal?",
        options: ["Dog", "Cat", "Bird", "Fish"],
        correctAnswer: "c"
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
        input.value = String.fromCharCode(97 + index); // Convert index to corresponding letter (a, b, c, d)
        label.appendChild(input);
        label.appendChild(document.createTextNode(` ${option}`));
        optionsDiv.appendChild(label);
        optionsDiv.appendChild(document.createElement('br'));
    });
}

function startCountdown(seconds) {
    let timeLeft = seconds;
    timer = setInterval(function() {
        document.getElementById('countdown').innerText = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            if (currentQuestion >= questions.length) { // Changed condition to handle end of questions
                document.getElementById('question-container').innerHTML = '<h1>Thank you for answering!</h1>';
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
        const answer = selectedOption.value;
        const currentQuestionObj = questions[currentQuestion];
        
        if (answer === currentQuestionObj.correctAnswer) {
            console.log('Correct answer!');
        } else {
            console.log('Incorrect answer!');
        }

        clearInterval(timer); // Stop the countdown
        currentQuestion++;
        if (currentQuestion >= questions.length) { // Changed condition to handle end of questions
            document.getElementById('question-container').innerHTML = '<h1>Thank you for answering!</h1>';
        } else {
            displayQuestion();
            startCountdown(10); // Change the countdown time for each question
        }
    } else {
        alert('Please select an option!');
    }
}

// Start the countdown when the page loads
window.onload = function() {
    displayQuestion();
    startCountdown(10); // Change the countdown time for each question
};

