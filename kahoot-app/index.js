let currentQuestion = 1;
let timer;

function displayQuestion() {
    const questions = [
        "Question 1: What is your favorite color?",
        "Question 2: What is your favorite food?",
        "Question 3: What is your favorite animal?"
    ];

    document.getElementById('question').innerText = questions[currentQuestion - 1];
    document.getElementById('answer').value = '';
}

function startCountdown(seconds) {
    let timeLeft = seconds;
    timer = setInterval(function() {
        document.getElementById('countdown').innerText = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            if (currentQuestion > 3) {
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
    const answer = document.getElementById('answer').value.toLowerCase();
    // Add your logic to check the answer here
    // For simplicity, we'll just log the answer to the console
    console.log(`Answer to question ${currentQuestion}: ${answer}`);
    
    clearInterval(timer); // Stop the countdown
    currentQuestion++;
    if (currentQuestion > 3) {
        document.getElementById('question-container').innerHTML = '<h1>Thank you for answering!</h1>';
    } else {
        displayQuestion();
        startCountdown(10); // Change the countdown time for each question
    }
}

// Start the countdown when the page loads
window.onload = function() {
    displayQuestion();
    startCountdown(10); // Change the countdown time for each question
};
