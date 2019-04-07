# Constructor-Word-Guess

* This game using the npm inquirer package to prompt for and validate user inputs.

* There are three files associated with this game:

* index.js
  * this is where all the logic for the game is located
  * it requires the npm 'inquirer' package
  * it also requires word.js and utilizes its constructor function
  * the sequence of events in index.js is as follows:
    * the prepGame() function is self invoked
    * prepGame() resets all variables and arrays to their default states, then generates a new random number... which it uses to pick a new word or phrase from the array of possible selections
    * the playGame() function is then self invoked
    * playGame() includes all the user input and game logic
    * it initially displays the random word or phrase as all underscores or spaces, then waits for user input
    * when the user enters a character or characters, inquirer validates it in 2 ways
      * first (via a regular expression match), it determines whether a single letter has been submitted. If not, it prompts the user to enter a single letter
      * if the first test passes, it determines whether the letter has already been guessed (whether successfully or not) by checking to see if it's already in the 'selectedArray' array
    * if both of the above tests pass, the letter guessed is added to the 'selectedArray' array and the 'callLetterTest' method is called using the user input passed as an argument to determine if the letter guessed is correct or not
    * a Correct or Incorrect message is displayed. If the guess is incorrect, the guesses remaining counter is decremented and that number is displayed to the user.
    * the updated word is re-displayed with correctly guessed letters revealed as they are guessed
    * after each valid letter guess, the testWon() method is called to see if the word is completely solved
    * if the remaining counter is still greater than 0, the playGame() function is recursively called
    * all the above steps are repeated successively until either testWon() determines the puzzle is totally solved or the guesses remaining counter hits 0. In both cases the endGame() function is called... with an argument of either "Won" or "Lost"
    * 


* word.js
  * contains a Word constructor function (which is used to create an object representation of the current word) with the following elements and methods:
    * 'this.letterArray' - is an array that holds all the letters (and spaces) of the current word. Each are stored as objects that wer created from the Letter constructor.
    * 'this.wordString' - is a function that returns a string respresentation of the word held in 'this.letterArray'
    * 'this.callLetterTest' - is a function that determines whether of not the user's current guess is correct or not
    * 'this.fillLetterArray' - is a function that populations 'this.letterArray' at the beginning of the game when a new random word has been selected
    * 'this.testWon' - is a function that determines whether the word has been solved. It steps through each letter in
    * 'this.letterArray'. If it finds all the non-space elements have 'this.guessed' equal to true, it calls the endGame() function with an argument of "Won".
  * word.js requires letter.js since it uses the Letter constructor
  * it exports its constructor function for index.js to utilize

* letter.js
  * contains a Letter constructor function (which holds all the information about this particular letter) with the following elements and methods:
    * 'this.char' - stores the character for the letter
    * 'this.guessed' - is a boolean that equates to whether this letter has been successfully guessed
    * 'this.guessTest' - is a function that evaluated whether this letter has been successfully guessed. It returns the letter itself if true and an underscore if false. If this letter is a space, a space is always displayed.
    * 'this.letterTest' - is a function that sets 'this.guessed' to true if the just guessed letter matches this letter. It's checked against a lower case and upper case version of the guessed letter since this game is case insensitive.
  * letter.js requires no files, but it does export its constructor function for word.js to use