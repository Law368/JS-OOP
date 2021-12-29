const prompt = require('prompt');

// create Initial class
const initial = {
  tries: 5,
  generatedNumber: '',
  createRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 10);
    this.generatedNumber = randomNumber;
    console.log(`Random number is ${randomNumber}`);
    return randomNumber;
  },
  resetTries() {
    this.tries = 5;
    console.log(this.tries);
  },
};
// create PlayerGuess
const playerGuess = {
  promptQuestion: 'Please enter a random number from 0 to 10',
  userAnswer: '',
  userPrompt() {
    prompt.start();

    prompt.get(this.promptQuestion, (err, result) => {
      this.userAnswer = result[this.promptQuestion];
      console.log(`The user input is ${this.userAnswer}`);
    });
  },
  executeComparison(answer) {
    if (answer === this.generatedNumber) {
      console.log('You Won');
    } else {
      console.log('You lost');
    }
  },
  endPrompt() {
    console.log('Do you want to end the game or restart?');
  },
};
// create PlayerGuessedWrong
const playerGuessedWrong = {
  numIsSmaller() {
    console.log('Your number is too low!');
  },
  numIsBigger() {
    console.log('Your number is too big!');
  },
  decrementTries() {
    this.tries -= 1;
  },
  checkAmountOfTriesLeft() {
    if (this.tries === 0) {
      this.playerLost();
      this.endPrompt();
    }
  },
  playerLost() {
    console.log('The game is Over. You lost!');
    this.endPrompt();
  },
};

// create playerGuessedRight
const playerGuessedRight = {
  playerWon() {
    console.log('You have won! Congratulations!');
    this.endPrompt();
  },
};

Object.setPrototypeOf(playerGuess, initial);
Object.setPrototypeOf(playerGuessedWrong, playerGuess);
Object.setPrototypeOf(playerGuessedRight, playerGuess);
initial.createRandomNumber();
playerGuess.userPrompt();
playerGuess.executeComparison(this.userAnswer);

// Prompt, Comparison, Wor or Lost, Conclusion
