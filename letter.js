"use strict";

var Letter = function (char) {
    this.char = char;
    this.guessed = false;
    this.guessTest = function () {
        if (this.char === " ") {
            return this.char + " ";
        } else {
            if (this.guessed === true) {
                return this.char + " ";
            } else {
                return "_ ";
            }
        }
    };
    this.letterTest = function (test) {
        if (test.toLowerCase() === this.char || test.toUpperCase() === this.char) {
            this.guessed = true;
            return true;
        } else {
            return false;
        }
    };
}

module.exports = Letter;