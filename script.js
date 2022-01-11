const readlineSync = require('readline-sync');

const initial = {
  tries: 3,
  generatedNumber: '',
  createRandomNumber() {
    const randomNumber = String(Math.floor(Math.random() * 10));
    this.generatedNumber = randomNumber;
    console.log(`1. Random number is ${randomNumber}`);
    return randomNumber;
  },
  resetTries() {
    this.tries = 3;
  },
  log(message) {
    console.log(message);
  },
  messages: {
    numTooBig: 'Your number is too big!',
    numTooSmall: 'Your number is too small!',
    resetQuestion: 'Do you want to restart the game?',
  },
};
const playerGuess = {
  userAnswer: '',
  comparisonResult: '',
  userPrompt() {
    const input = readlineSync.question(
      'Please enter a random number from 0 to 10: '
    );
    this.userAnswer = input;
    console.log(`2. User input was ${this.userAnswer}`);
    this.userAnswer = Math.floor(this.userAnswer);
    console.log(`ROUNDED UP USER ANSWER IS ${this.userAnswer}`);
    this.userAnswer = String(this.userAnswer);
    this.executeComparison(this.userAnswer);
  },
  executeComparison(answer) {
    console.log(`3. the type of GenNum is : ${typeof this.generatedNumber}`);
    console.log(`4. the type of answer is : ${typeof answer}`);
    console.log(
      `5. if Answer is equal to GenNum: ${answer === this.generatedNumber}`
    );
    if (answer === this.generatedNumber) {
      this.comparisonResult = true;
    } else {
      this.comparisonResult = false;
    }
  },
  checkAnswer() {
    console.log(
      `6. the type of comparison result: ${typeof this.comparisonResult}`
    );
    console.log(`7. Comparison results : ${this.comparisonResult}`);
    if (this.comparisonResult === true) {
      this.playerWon();
    }
  },
  endPrompt() {
    if (readlineSync.keyInYN(this.messages.resetQuestion)) {
      this.resetTries();
      this.createRandomNumber();
      this.userPrompt();
      if (this.checkIfNumber() === true) {
        this.checkAnswer();
        this.isNumBiggerOrSmaller();
      }
    } else {
      this.tries = 0;
    }
  },
};
const gameState = {
  regex: /\d/,
  checkIfNumber() {
    if (this.regex.test(this.userAnswer)) {
      return true;
    }
    this.log('Must input only numbers!');
    return false;
  },
  isNumBiggerOrSmaller() {
    if (this.userAnswer > this.generatedNumber) {
      this.log(this.messages.numTooBig);
    } else if (this.userAnswer === this.generatedNumber) {
      return;
    } else if (this.userAnswer < this.generatedNumber) {
      this.log(this.messages.numTooSmall);
    }
    if (this.checkIfNumber() === true && this.tries > 0) {
      this.decrementTries();
    }
  },
  decrementTries() {
    this.tries -= 1;
    console.log(`There are ${this.tries} tries  left!`);
    this.checkAmountOfTriesLeft();
  },
  checkAmountOfTriesLeft() {
    if (this.tries > 0) {
      this.userPrompt();
      if (this.checkIfNumber() === true) {
        this.checkAnswer();
        console.log(`TRIES IN CHECK AMOUNT: ${this.tries}`);
        this.isNumBiggerOrSmaller();
      }
    } else {
      console.log('8. The amount of tries has reached 0');
      this.playerLost();
    }
  },
  playerLost() {
    this.log(
      '=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=\nThe game is Over. You lost!\n=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/='
    );
    this.endPrompt();
  },
  playerWon() {
    this.log(
      '=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=\nYou have won! Congratulations!\n=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/='
    );
    this.endPrompt();
  },
};

Object.setPrototypeOf(playerGuess, initial);
Object.setPrototypeOf(gameState, playerGuess);
initial.createRandomNumber();
playerGuess.userPrompt();
if (gameState.checkIfNumber() === true) {
  gameState.checkAnswer();
  gameState.isNumBiggerOrSmaller();
}

// class playerGuess {

//   constructor(tries, resetTries, generatedNumber, createRandomNumber, log) {
//     this.tries = tries;
//     this.resetTries = resetTries;
//     this.generatedNumber = generatedNumber;
//     this.createRandomNumber =  createRandomNumber;
//     this.log = log;
//   }

// }
