// const prompt = require('prompt');
const readlineSync = require('readline-sync');

// create Initial class
const initial = {
  tries: 2,
  generatedNumber: '',
  createRandomNumber() {
    const randomNumber = String(Math.floor(Math.random() * 10));
    this.generatedNumber = randomNumber;
    console.log(`1. Random number is ${randomNumber}`);
    return randomNumber;
  },
  resetTries() {
    this.tries = 2;
    console.log(this.tries);
  },
};
// create PlayerGuess
const playerGuess = {
  // promptQuestion: 'Please enter a random number from 0 to 10:',
  userAnswer: '',
  comparisonResult: '',
  // userPrompt() {
  //   prompt.start();

  //   prompt.get(this.promptQuestion, (err, result) => {
  //     this.userAnswer = result[this.promptQuestion];
  //     console.log(`The user input is ${this.userAnswer}`);
  //     this.executeComparison(this.userAnswer);
  //     this.comparisonResult;
  //   });
  // },
  userPrompt() {
    const input = readlineSync.question(
      'Please enter a random number from 0 to 10: '
    );
    this.userAnswer = input;
    console.log(`2. User input was ${this.userAnswer}`);
    this.executeComparison(this.userAnswer);
    // this.executeComparison(this.userAnswer);
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
  advance() {
    console.log(
      `6. the type of comparison result: ${typeof this.comparisonResult}`
    );
    console.log(`7. Comparison results : ${this.comparisonResult}`);
    if (this.comparisonResult === true) {
      this.playerWon();
    }
  },
  endPrompt() {
    console.log('Do you want to end the game or restart?');
  },
};
// create PlayerGuessedWrong
const playerGuessedWrong = {
  isNumBiggerOrSmaller() {
    if (this.userAnswer > this.generatedNumber) {
      this.numIsBigger();
    }
    if (this.userAnswer < this.generatedNumber) {
      this.numIsSmaller();
    }
    if (this.tries > 0) {
      this.decrementTries();
    }
  },
  numIsSmaller() {
    console.log('Your number is too small!');
  },
  numIsBigger() {
    console.log('Your number is too big!');
  },
  decrementTries() {
    this.tries -= 1;
    console.log(`There are ${this.tries} tries  left!`);
    this.checkAmountOfTriesLeft();
  },
  checkAmountOfTriesLeft() {
    while (this.tries > 0) {
      this.userPrompt();
      console.log(`TRIES IN CHECK AMOUNT: ${this.tries}`);
      this.isNumBiggerOrSmaller();
    }
    if (this.tries === 0) {
      console.log('8. The amount of tries has reached 0');
      this.playerLost();
      this.endPrompt();
    }
  },
  playerLost() {
    console.log(`=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=
    The game is Over. You lost!
    =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=`);
    this.endPrompt();
    // this.isNumBiggerOrSmaller();
  },
};

// create playerGuessedRight
const playerGuessedRight = {
  playerWon() {
    console.log(
      `=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=
      You have won! Congratulations!
=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=`
    );
    this.endPrompt();
  },
};

Object.setPrototypeOf(playerGuess, initial);
Object.setPrototypeOf(playerGuessedWrong, playerGuess);
Object.setPrototypeOf(playerGuessedRight, playerGuess);
initial.createRandomNumber();
playerGuess.userPrompt();
playerGuessedRight.advance();
playerGuessedWrong.isNumBiggerOrSmaller();
// playerGuessedWrong.advance();
// playerGuessedWrong.executeComparison(this.userAnswer);
// Prompt, Comparison, More or Less, Won or Lost, Conclusion
