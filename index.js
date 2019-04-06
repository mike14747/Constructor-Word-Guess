"use strict";

var inquirer = require("inquirer");

var Word = require("./word.js");
var newWord = new Word();

var remaining = 10;
var regEx = "^[a-zA-Z]{1}$";

var wordsArray = ["Abandon Hope", "Clear Conscience", "Corporate Downsizing", "Close Quarters", "Read Between the Lines", "Merry Go Round", "Opportunity Knocks", "Time is Money", "From Bad to Worse", "Desperate Measures", "Double or Nothing", "Turning up the Heat", "Shrinking Economy", "Dark Room", "Eye of the Needle", "Open for Business", "Change Our Minds", "Down to Earth", "Bite the Bullet", "The Coast is Clear"];
var randomNum = Math.floor(Math.random() * 20);
var selectedWord = wordsArray[randomNum];
newWord.fillLetterArray(selectedWord);
console.log(selectedWord);
newWord.wordString();

function endGame(note) {
    if (note === "Lost") {
        console.log("You ran out of guesses. The game is over.");
    } else {
        console.log("You solved the puzzle and won the game!");
    }
}

function playGame() {
    inquirer.prompt([
        {
            message: "\n\n\nGuess a letter",
            name: "letterGuess",
            validate: function validateLetter(name) {
                return true;
                // return name.match(regEx);
            }
        }
    ]).then(function (answer) {
        console.log("\nYou guessed: " + answer.letterGuess + "\n");
        newWord.callLetterTest(answer.letterGuess);
        newWord.wordString();
        if (regEx) {
            console.log("\nCorrect!\n");
        } else {
            console.log("\nIncorrect!\n");
            remaining--;
            console.log("Guesses remaining: " + remaining + "\n");
        }
        if (remaining > 0) {
            playGame();
        } else {
            endGame("Lost");
        }
    });
}

playGame();