"use strict";

var inquirer = require("inquirer");

var Word = require("./word.js");
var newWord = {};

var randomNum = "";
var selectedWord = "";
var remaining = 10;
var regEx = /^[a-zA-Z]{1}$/;
var selectedArray = [];

var wordsArray = ["Abandon Hope", "Clear Conscience", "Corporate Downsizing", "Close Quarters", "Read Between the Lines", "Merry Go Round", "Opportunity Knocks", "Time is Money", "From Bad to Worse", "Desperate Measures", "Double or Nothing", "Turning up the Heat", "Shrinking Economy", "Dark Room", "Eye of the Needle", "Open for Business", "Change Our Minds", "Down to Earth", "Bite the Bullet", "The Coast is Clear"];

function prepGame() {
    console.log("\n\n\n---------- Welcome to the Constructor Word Guess game! ----------");
    console.log("\n\nSolve the entire Word or Phrase before you exhaust your 10 allowed misses to win the game.");
    console.log("\n\nThe only accepted input is a single letter (upper case or lower case... it doesn't matter, as it's case insensitive).");
    console.log("\n\nNow let's get started!\n\n");
    newWord = new Word();
    remaining = 10;
    selectedArray = [];
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
        console.log("\nYou solved the puzzle and won the game!");
    }
    console.log("\n------------------------------")
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
                if (!regEx.test(letterGuess)) {
                    return false || "Input must be a single letter!";
                }
                if (selectedArray.includes(letterGuess)) {
                    return false || "'" + letterGuess + "' has already been guessed.";
                }
                return true;
            }
        }
    ]).then(function (answer) {
        console.log("\nYou guessed: " + answer.letterGuess);
        selectedArray.push(answer.letterGuess);
        if (newWord.callLetterTest(answer.letterGuess)) {
            console.log("\nCorrect!");
        } else {
            remaining--;
            console.log("\nIncorrect! Guesses remaining: " + remaining);
        }
        newWord.wordString();
        if (newWord.testWon()) {
            return endGame("Won");
        }
        console.log("\nAlready selected letters: [" + selectedArray.sort().join(", ") + "]");
        if (remaining > 0) {
            console.log("\n---------- Next Round ----------");
            playGame();
        } else {
            endGame("Lost");
        }
    });
}

playGame();