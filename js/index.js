// var et const
var level = 0;
var buttonColors = ["red", "green", "yellow", "blue"];
const colorMap = {
  0: "red",
  1: "green",
  2: "yellow",
  3: "blue",
  red: "red",
  green: "green",
  yellow: "yellow",
  blue: "blue",
};

// state

var gamePattern = [];
var userClickedPattern = [];
var started = false;

// func generals

function btnFlashAnimation(number) {
  $("#" + colorMap[number])
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}
function btnPressAnimation(color) {
  const btnPressed = $("#" + color);

  btnPressed.addClass("pressed");
  setTimeout(() => {
    btnPressed.removeClass("pressed");
  }, 120);
}

function switchSound(number) {
  new Audio(`./sounds/${colorMap[number]}.mp3`).play();
}

function gameoverSound() {
  new Audio("./sounds/wrong.mp3").play();
}

function gameoverBackground() {
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
}

function gameoverTitles() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
}

function titleLevel() {
  $("#level-title").text("Level :" + level);
}
// Game function

function starteOver() {
  gamePattern =[];
  level = 0;
  started = false;
}

function userClick() {
  $(".btn").click((e) => {
    var userChosenColor = $(e.target).attr("id");
    userClickedPattern.push(userChosenColor);

    switchSound(userChosenColor);
    btnPressAnimation(userChosenColor);
    checkAnswers(userClickedPattern.length - 1);
  });
}

function checkAnswers(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // verifie  si les deux array son identique a l'index curentlevel (qui commence a 0)
    console.log("success");
    // montre que nous somme bien dans une sequence

    if (userClickedPattern.length === gamePattern.length) {
      // verifie si les deux array son identique et si c'est le cas veux dire fin de la séquence donc doit commencer une nouvelle séquence
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    gameoverSound();
    gameoverBackground();
    gameoverTitles();
    starteOver();
    gameStart();
  }
}

function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);

  userClickedPattern = [];
  gamePattern.push(colorMap[randomNumber]);
  level++;

  titleLevel();
  btnFlashAnimation(randomNumber);
  switchSound(randomNumber);
}

function gameStart() {
  $(document).one("keypress", () => {
    if (!started) {
      titleLevel();
      nextSequence();
      started = true;
    }
  });
}

function gameInit() {
  // event listener
  userClick();

  // game

  gameStart();
}

// game initialization

gameInit();
