(function () {

var playersGuess;
var winningNumber = generateRandomNumber();
var remainingGuesses = 5;
var guessesList = [];


/* **** Guessing Game Functions **** */

// Generate the Winning Number
function generateRandomNumber(){
  return Math.floor((Math.random() * 100) + 1);
}

// Fetch the Players Guess
function playersGuessSubmission(){
    playersGuess = parseInt($('#playersNumber').val());
    // clear input 
    $('#playersNumber').val("");
    // after retrieving the guess, check to see if the player's guess = the winning number
    checkGuess();
}

// Determine if the next guess should be a lower or higher number
// Tell Player if their guess is within 10 numbers of winning number
function lowerOrHigher(){
  var feedback;
  var howClose;

  if (playersGuess < winningNumber) {
    feedback = "Guess higher than " + playersGuess + "!";
  } else {
    feedback = "Guess lower than " + playersGuess + "!";
  }
  $('#advice').text(feedback);

  howClose = checkDifference();
  if (howClose <= 10) {
    $('#message').text("Getting hot! You are within 10 numbers of the winning number!");
  }
}

// check how close the player is to the winning number
function checkDifference(){
  var difference;
  if (winningNumber > playersGuess) {
    difference = winningNumber - playersGuess;
  }
  else {
    difference = playersGuess - winningNumber;
  }
  return difference;
}

// Check if the Player's Guess is the winning number
function checkGuess(){
  // clear message board before each guess
  $('#message').text("");
  // Notify player if s/he won
  if (playersGuess === winningNumber) {
    youWin();
  } 
  else {
    // Only accept guess if the player hasn't guessed the same number already
    if (guessesList.indexOf(playersGuess) === -1) {
      guessesList.push(playersGuess);
      // Lose a remaining guess, notify player of remaining guesses
      remainingGuesses -= 1;
      $('#guessesLeft').text(remainingGuesses + " guesses remaining");

      if (remainingGuesses === 0) {
        youLose();
      }
      // if the Player still has guesses remaining, give them advice
      else {
        lowerOrHigher();
      }
    }
    // notify user if s/he guessed a number already
    else {
      $('#message').text("You guessed that already! ");
    }
  }
}


// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){
  //only let the user get a hint if s/he only has one guess left
  if (remainingGuesses > 1) {
    $('#message').text("You can only get a hint when you have one guess left!");
  } else {
    var possibleNumbers = [];
    var first = winningNumber;
    var second = generateRandomNumber();
    var third = generateRandomNumber();
    possibleNumbers.push(first, second, third);
    var hints = shuffleNumbers(possibleNumbers);
  }
}

// Show possible numbers to the player;
// Shuffle the possible numbers so that the winning number doesn't always appear in the same place
function shuffleNumbers(numArray){
  var currentIndex = numArray.length
  var temporaryValue;
  var randomIndex;
  var hints;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = numArray[currentIndex];
    numArray[currentIndex] = numArray[randomIndex];
    numArray[randomIndex] = temporaryValue;
  }
  hints = (numArray.join(" "));
  $('#message').text("The answer is one of these three numbers: " + hints);
}

// Tell Player they won the game
function youWin(){
  $('#advice').text("Congratulations! You guessed it. The number was "+ winningNumber +"!");
  $('#message').text("Click below to play again!")
  $('body').css('background-image','url(https://i.ytimg.com/vi/WVu9YEkL-Tg/maxresdefault.jpg)');
}

// Tell Player they lost the game
function youLose(){
  $('#advice').text("You lost! The number was "+ winningNumber +"!");
  $('#message').text("Click below to play again!")
  $('body').css('background-image','url(http://i1379.photobucket.com/albums/ah127/merkathc/sad_zpsxekhbuqn.png)');
}

// Allow the "Player" to Play Again
function playAgain(){
  location.reload();
}

/* **** Event Listeners/Handlers ****  */
function enterListener() {
  $("#playersNumber").keydown(function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      $("#playersInput").click();
    }
  });
}
$(document).ready(function() {
  enterListener();
});

window.myNamespace = {
  "generateRandomNumber": generateRandomNumber,
  "playersGuessSubmission": playersGuessSubmission,
  "lowerOrHigher": lowerOrHigher,
  "checkDifference": checkDifference,
  "checkGuess": checkGuess,
  "provideHint": provideHint,
  "shuffleNumbers": shuffleNumbers,
  "youWin": youWin,
  "youLose": youLose,
  "playAgain": playAgain
}

// Close wrapper function

})();
