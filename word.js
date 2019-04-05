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
        console.log(stringWord + "\n");
    };
    this.callLetterTest = function (letter) {
        this.letterArray.forEach(function (element) {
            element.letterTest(letter);
        });
    };
    this.fillLetterArray = function (word) {
        for (let i = 0; i < word.length; i++) {
            newLetter = new Letter(word[i]);
            this.letterArray.push(newLetter);
        }
    };
}

module.exports = Word;