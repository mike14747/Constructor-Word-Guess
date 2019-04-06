"use strict";

var Letter = require("./letter.js");
var newLetter = {};
var stringWord = "";

var Word = function () {
    this.letterArray = [];
    this.wordString = function () {
        stringWord = "";
        this.letterArray.forEach(function (element) {
            stringWord += element.guessTest(element.char);
        });
        console.log("\n" + stringWord + "\n");
    };
    this.callLetterTest = function (letter) {
        var success = false;
        this.letterArray.forEach(function (element) {
            if (element.letterTest(letter)) {
                success = true;
            }
        });
        if (success) {
            return true;
        } else {
            return false;
        }
    };
    this.fillLetterArray = function (word) {
        for (let i = 0; i < word.length; i++) {
            newLetter = new Letter(word[i]);
            this.letterArray.push(newLetter);
        }
    };
    this.testWon = function () {
        var won = true;
        this.letterArray.forEach(function (element) {
            if (element.char != " " && element.guessed === false) {
                won = false;
                return;
            }
        });
        if (won) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Word;