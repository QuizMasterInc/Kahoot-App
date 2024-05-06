// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where  } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGqWTZtmxOMfylYYkiN7FXjJqjTnY6FaQ",
    authDomain: "quizmaster-c66a2.firebaseapp.com",
    projectId: "quizmaster-c66a2",
    storageBucket: "quizmaster-c66a2.appspot.com",
    messagingSenderId: "991033062979",
    appId: "1:991033062979:web:80ab0233c4553f0d8d86f6"
  };

let currentQuestion = 0;
let timer;
let score = 0;
let chosenCategory;
let questions = []

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
var db = getFirestore(app);

// Reference to your collection
const collectionRef = collection(db, 'default-questions');

function debugShowAllQuestionsBeforeFormat(bool) {
    if (bool) {
// Retrieve documents from the collection
getDocs(collectionRef).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is the data of each document
        console.log(doc.id, " => ", doc.data());
    });
}).catch((error) => {
    console.log("Error getting documents: ", error);
});
    }
}

debugShowAllQuestionsBeforeFormat(false)


 export async function fetchQuestions(chosenCategory) {
     // filters the entire question bank from the database selected (default-questions)
     // the filter being put on this is the category chosen by user at runtime
    const q = query(collection(db, 'default-questions'), where('category', '==', chosenCategory)); 

    const querySnapshot = await getDocs(q);

    // this will pull all documents (aka questions), 
    // and then put them into an array that is organized like the previous format
    querySnapshot.forEach((doc) => {
        const data = doc.data();

        questions.push(
            {
                category: data.category,
                question: data.question,
                options: [
                    data.a, data.b, data.c, data.d
                ],
                correctAnswer: [data.a, data.b, data.c, data.d].indexOf(data.correct)
            }
        )
        
    }
    
);

startQuizAfter();
}




export function displayQuestion() {
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
        document.getElementById('countdown-text').innerText = `Time Left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            if (currentQuestion >= questions.length) {
                endQuiz();
            } else {
                displayQuestion();
                startCountdown(10);
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
            score++;
        } else {
            console.log('Incorrect answer!');
        }

        clearInterval(timer);
        currentQuestion++;
        if (currentQuestion >= questions.length) {
            endQuiz();
        } else {
            displayQuestion();
            startCountdown(10);
        }
    } else {
        alert('Please select an option!');
    }
}

function endQuiz() {
    let resultHTML = `<h1>Quiz Results</h1>`;
    resultHTML += `<p>Your score: ${score}/${questions.length}</p>`;
    resultHTML += `<button class="show-answers-button" id="show-answers-button">Show Correct Answers</button>`;
    document.getElementById('quiz-container').innerHTML = resultHTML;

    // allows showCorrectAnswers to run on click (after innerHTML is populated by resultHTML)
    document.getElementById('show-answers-button').addEventListener("click", showCorrectAnswers);
}

function showCorrectAnswers() {
    let correctAnswersHTML = `<h2>Correct Answers:</h2>`;
    questions.forEach((question, index) => {
        correctAnswersHTML += `<p><strong>${index + 1}. ${question.question}</strong></p>`;
        correctAnswersHTML += `<p><strong>Correct Answer:</strong> ${question.options[question.correctAnswer]}</p>`;
    });

    document.getElementById('quiz-container').innerHTML += correctAnswersHTML;
}



    export function startQuiz() {
    const categorySelect = document.getElementById('category-select');

    //automatically makes our categories fit what's being pulled from Firebase
    chosenCategory = categorySelect.value.toLowerCase(); 

    function debugChosenCategoryFromIndexJS (bool) {
        console.log(chosenCategory)
    }

    debugChosenCategoryFromIndexJS(false)
    
    // starts a roundtrip that goes to fetchQuestions, then ends at startsQuizAfter
    fetchQuestions(chosenCategory)

}

function startQuizAfter() {
    const filteredQuestions = questions; // already filtered out by fetchQuestions

    function debugRemoveElementsFromArray (bool, num) {
        if (bool) 
            if (filteredQuestions.length > num) {
                filteredQuestions.length = num
            }
    }

    debugRemoveElementsFromArray(true, 10) // will only allow 10 questions to be displayed (currently hardcoded).
                                            // if connected to UI, this can allow for the user to pick 
                                            // just how many questions they'd like to answer.



    if (filteredQuestions.length > 0) {
        currentQuestion = 0;
        questions.splice(0, questions.length, ...filteredQuestions);

        document.getElementById('category-selection').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';

        displayQuestion();
        startCountdown(10);
    } else {
        alert('No questions found for the selected category.');
    }
}

// /* adding event listeners in JavaScript is generally better than using the onClick in HTML
// as it keeps your code cleaner and avoids issues related to the scope of functions. 
// It also adheres to modern web development practices by separating the structure (HTML) 
// from the behavior (JavaScript), reducing bugs related to global scope pollution.
// */
document.addEventListener('DOMContentLoaded', () => {

        
    const checkAnswerButton = document.querySelector('.submit-button');
    if (checkAnswerButton)
        checkAnswerButton.addEventListener('click', checkAnswer);

});
