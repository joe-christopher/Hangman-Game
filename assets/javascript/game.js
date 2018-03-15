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
var guessesLeft = 11;
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
    {name: "darumacho", picture: "assets/images/darumacho.jpg" },
    {name: "hidabat", picture: "assets/images/hidabat.jpg" },
    {name: "kyubi", picture: "assets/images/kyubi.jpg" },
    {name: "venoct", picture: "assets/images/venoct.jpg" },
    {name: "manjimutt", picture: "assets/images/manjimutt.jpg" },
    {name: "tengu", picture: "assets/images/tengu.jpg" },
    {name: "skranny", picture: "assets/images/skranny.jpg" },
    {name: "lodo", picture: "assets/images/lodo.jpg" },
    {name: "espy", picture: "assets/images/espy.jpg" },
    {name: "fumazaru", picture: "assets/images/fumazaru.jpg" },
    {name: "signibble", picture: "assets/images/signibble.jpg" },
    {name: "tattlecast", picture: "assets/images/tattlecast.jpg" },
    {name: "wazzat", picture: "assets/images/wazzat.jpg" },
    {name: "duchoo", picture: "assets/images/duchoo.jpg" },
    {name: "snotsolong", picture: "assets/images/snotsolong.jpg" },
    {name: "beetall", picture: "assets/images/beetall.jpg" },
    {name: "kapunki", picture: "assets/images/kapunki.jpg" },
    {name: "quaken", picture: "assets/images/quaken.jpg" },
    {name: "corptain", picture: "assets/images/corptain.jpg" },
    {name: "zerberker", picture: "assets/images/zerberker.jpg" },
    {name: "tanbo", picture: "assets/images/tanbo.jpg" },
    {name: "jibakoma", picture: "assets/images/jibakoma.jpg" },

];



function printBlanks() {
    challenge = getRandomItem(yokai);




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
        new Audio("assets/sounds/win.mp3").play();
        wins++;
        newGame = true;
        guessesLeft = 11;
        guessedLetters = [];
        progressWord = "";
        spaces = [];
        document.querySelector("#Winningimage").innerHTML = "<img class = 'img-responsive center-block change rounded' src =" + challenge.picture + ">";
        printBlanks();
        
    }

    if(guessesLeft <=0) {
    	newGame = true;
    	firstGame = true;
        guessesLeft = 11;
        new Audio("assets/sounds/lose.mp3").play();
        losses++;
    	guessedLetters = [];
    	progressWord = "";
    	spaces = [];
    	document.querySelector("#Winningimage").innerHTML = "<img class = 'img-responsive center-block change rounded' src = 'assets/images/hm.gif'>"
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
            document.querySelector("#Winningimage").innerHTML = "<img class = 'img-responsive center-block change rounded' src = 'assets/images/hm.gif'>"
            win();
            document.querySelector("#lettersToGuess").innerHTML = progressWord;
            document.querySelector("#wrongLetters").innerHTML = guessedLetters.join(", ");
            document.querySelector("#remainingGuesses").innerHTML = guessesLeft;
            document.querySelector("#numWins").innerHTML = "Wins: " + wins;
            document.querySelector("#numLosses").innerHTML = "Losses: " + losses;
        }

    }
}