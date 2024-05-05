document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');

    let debugStartButton = false;

    if (startButton) {
        startButton.addEventListener('click', async function() {

            
            const module = await import('./index.js');
            module.startQuiz();
            
        });

    } 
    
    if(debugStartButton) {
        if(startButton) {
            console.log('Start button was found and pressed');
        }
        else {
            console.log('Start button not found');
        }
    }

});


