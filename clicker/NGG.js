// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(randomNumber); // For testing purposes

const guessInput = document.getElementById('guess');
const checkButton = document.getElementById('check-button');
const messageDisplay = document.getElementById('message');

checkButton.addEventListener('click', function() {
    const userGuess = parseInt(guessInput.value);
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage('Please enter a valid number between 1 and 100.', 'red');
      return;
    }
  
    // Create a new image element
    const img = document.createElement('img');
    // Set the source of the image
    img.src = 'cat.webp'; // replace with your image path
    // Add the image to the body of the document
    document.body.appendChild(img);
  
    if (userGuess === randomNumber) {
      setMessage(`Congratulations! You guessed the correct number (${randomNumber}).`, 'green');
    } else if (userGuess < randomNumber) {
      setMessage('Try a higher number.', 'blue');
    } else {
      setMessage('Try a lower number.', 'blue');
    }
  
    // Clear input field
    guessInput.value = '';
  });
function setMessage(msg, color) {
  messageDisplay.style.color = color;
  messageDisplay.textContent = msg;
}
