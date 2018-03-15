var validLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", 
                    "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var challenge;
var spaces = [];
var newGame = true;
var progressWord;
var counter = 0;
var guessedLetters = [];
var wins = 0;
var losses =0;
var guessesLeft = 6;
var firstGame = true;
var yokai = [
    {name: "whisper", picture: "assets/images/whisper.jpg" },
    {name: "jibanyan", picture: "assets/images/jibanyan.jpg" },
    {name: "komasan", picture: "assets/images/komasan.jpg" },
    {name: "gokai", picture: "assets/images/gokai.jpg" },
    {name: "komajiro", picture: "assets/images/komajiro.jpg" },
    {name: "robonyan", picture: "assets/images/robonyan.jpg" },
    {name: "blazion", picture: "assets/images/blazion.jpg" },
    {name: "roughraff", picture: "assets/images/roughraff.jpg" },
    {name: "blizzaria", picture: "assets/images/blizzaria.jpg" },
    {name: "shogunyan", picture: "assets/images/shogunyan.jpg" },
    {name: "darumacho", picture: "assets/images/daramucho.jpg" },
    {name: "hidabat", picture: "assets/images/hidabat.jpg" },
    {name: "kyubi", picture: "assets/images/kyubi.jpg" },
    {name: "venoct", picture: "assets/images/venoct.jpg" },
    {name: "manjimutt", picture: "assets/images/manjimutt.jpg" },
    {name: "tengu", picture: "assets/images/tengu.jpg" },
    {name: "skranny", picture: "assets/images/skranny.jpg" }
];


function printBlanks() {
    challenge = getRandomItem(yokai);

    // document.querySelector("#Winningimage").innerHTML = "<img class = 'img-responsive center-block change rounded' src = 'assets/images/yokaigroup.jpg'>"


    for (var i = 0; i < challenge.name.length; i++) {
        spaces.push("_");

    }


    progressWord = spaces.join(" ")
    document.querySelector("#lettersToGuess").innerHTML = progressWord;
    newGame = false;
}

function getRandomItem(list) {
    return list[Math.floor(Math.random() * list.length)];

}

function validInput(guess) {
    if (validLetters.indexOf(guess) != -1) {
        return true;
    }
}



function compare(letter) {
    counter = 0;


    for (var i = 0; i < challenge.name.length; i++) {
        if (letter === challenge.name.charAt(i)) {
            spaces[i] = challenge.name.charAt(i);
            counter++;
        }
    }


    progressWord = spaces.join(" ")
    if (counter === 0 && guessedLetters.indexOf(letter) === -1) {

        guessedLetters.push(letter);
        guessesLeft--;

    }
}


function win() {
    if (spaces.indexOf("_") === -1) {
        wins++;
        newGame = true;
        guessesLeft = 6;
        guessedLetters = [];
        progressWord = "";
        spaces = [];
        document.querySelector("#Winningimage").innerHTML = "<img class = 'img-responsive center-block change rounded' src =" + challenge.picture + ">";
        printBlanks();
        
    }

    if(guessesLeft <=0) {
    	newGame = true;
    	firstGame = true;
    	guessesLeft = 6;
        losses++;
    	guessedLetters = [];
    	progressWord = "";
    	spaces = [];
    	document.querySelector("#Winningimage").innerHTML = "<img class = 'img-responsive center-block change rounded' src = 'assets/images/yokaigroup.jpg'>"
    }
}


document.onkeyup = function(event) {
    var userGuess = event.key;


    if (newGame&&firstGame) {
        printBlanks();
        firstGame = false;
    } else {


        if (validInput(userGuess)) {
            compare(userGuess);
            win();
            document.querySelector("#lettersToGuess").innerHTML = progressWord;
            document.querySelector("#wrongLetters").innerHTML = guessedLetters.join(", ");
            document.querySelector("#remainingGuesses").innerHTML = guessesLeft;
            document.querySelector("#numWins").innerHTML = "Wins: " + wins;
            document.querySelector("#numLosses").innerHTML = "Losses: " + losses;
        }

    }
}