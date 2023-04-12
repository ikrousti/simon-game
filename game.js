//                    Arrays and Variables

let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let hasGameStarted = false;
let level = 0
let currentStep = 0
//                  Functions
// 1. A function that generates random buttons for the next levels
function nextSequence() {
    level++;
    $('h1').text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animation(randomChosenColour);
    animatePress(randomChosenColour);
    userClickedPattern = []
    currentStep = 0
}


// Sound and animation functions
function playSound(name) {
    var sound = new Audio('sounds/' + name + '.mp3');
    sound.play();
}

function animation(name) {
    $('#' + name).fadeOut(100).fadeIn(100);
}

function animatePress(currentColour) {
    $('.' + currentColour).addClass("pressed");
    setTimeout(function () {
        $('.' + currentColour).removeClass("pressed");
    }, 100);
}


//A function that checks the answer of the user
function checkAnswer() {
    if (gamePattern[currentStep] === userClickedPattern[currentStep]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000);
    }
    } else {
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200);
        var sound = new Audio('sounds/wrong.mp3');
        sound.play();
        $('h1').text('Game Over, Press Any Key to Restart')
        startOver()
    };
    ;

}

//A function that starts over the game 
function startOver() {
    level = 0;
    gamePattern = [];
    hasGameStarted = false;
}

//                                  Events

//                  Button pressed event
document.addEventListener("keydown", function () {
    if (hasGameStarted == false) {
        hasGameStarted = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

//                     Click event
$('.btn').click(function (key) {
    var userChosenColour = key.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(key.target.id)
    animation(key.target.id)
    animatePress(key.target.id)
    checkAnswer(userClickedPattern.length - 1);
    currentStep++
})