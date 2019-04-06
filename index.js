"use strict";

var inquirer = require("inquirer");

var Word = require("./word.js");
var newWord = {};

var randomNum = "";
var selectedWord = "";
var remaining = 10;
var regEx = /^[a-zA-Z]{1}$/;

var wordsArray = ["Abandon Hope", "Clear Conscience", "Corporate Downsizing", "Close Quarters", "Read Between the Lines", "Merry Go Round", "Opportunity Knocks", "Time is Money", "From Bad to Worse", "Desperate Measures", "Double or Nothing", "Turning up the Heat", "Shrinking Economy", "Dark Room", "Eye of the Needle", "Open for Business", "Change Our Minds", "Down to Earth", "Bite the Bullet", "The Coast is Clear"];

function prepGame() {
    newWord = new Word();
    remaining = 10;
    randomNum = Math.floor(Math.random() * 20);
    selectedWord = wordsArray[randomNum];
    newWord.fillLetterArray(selectedWord);
    newWord.wordString();
}

prepGame();

function endGame(note) {
    if (note === "Lost") {
        console.log("\nYou ran out of guesses. The game is over.\n");
        console.log("The answer is:");
        var correctWord = "";
        for (let i = 0; i < selectedWord.length; i++) {
            correctWord += selectedWord[i] + " ";
        }
        console.log(correctWord);
    } else {
        console.log("You solved the puzzle and won the game!");
    }
    inquirer.prompt([
        {
            message: "\n\nWould you like to play again?\n",
            name: "playAgain",
            type: "list",
            choices: ["Yes", "No"]
        }
    ]).then(function (answer) {
        if (answer.playAgain === "Yes") {
            prepGame();
            playGame();
        } else {
            return;
        }
    });
}

function playGame() {
    inquirer.prompt([
        {
            message: "\n\nGuess a letter: ",
            name: "letterGuess",
            validate: function validateLetter(letterGuess) {
                var isValid = regEx.test(letterGuess);
                return isValid || "Input must be a single letter!";
            }
        }
    ]).then(function (answer) {
        console.log("\nYou guessed: " + answer.letterGuess);
        if (newWord.callLetterTest(answer.letterGuess)) {
            console.log("\nCorrect!");
            if (newWord.testWon()) {
                return endGame("Won");
            }
        } else {
            console.log("\nIncorrect!");
            remaining--;
            console.log("\nGuesses remaining: " + remaining);
        }
        newWord.wordString();
        if (remaining > 0) {
            console.log("----- Next Round -----");
            playGame();
        } else {
            endGame("Lost");
        }
    });
}

playGame();