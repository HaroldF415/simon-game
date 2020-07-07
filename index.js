//jshint esversion:6

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickPattern = [];

var gameStart = false;

var gameLevel = 0;

// Using jQuery to detect when a keyboard key has been pressed, when that key is pressed for the first time, call nextSequence()
$(document).keydown(function() {

  if (!gameStart) {
    $("#level-title").text("Level " + gameLevel); // When
    nextSequence();
    gameStart = true;
  }

}); // ends $(document).keypress()


// Detecting which buttons are clicked
$(".btn").click(function() {

  var colorID = $(this).attr("id");
  userClickPattern.push(colorID);

  playSound(colorID);
  animatePress(colorID);
  checkAnswer(userClickPattern.length - 1);

}); // ends $(".btn").click()


function checkAnswer(gameLevel) {

  if(gamePattern[gameLevel] === userClickPattern[gameLevel]){

    if(userClickPattern.length === gamePattern.length ){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }else{
    playSound("wrong");

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key To Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }

} // ends checkAnswer()

function nextSequence() {

  userClickPattern = [];
  gameLevel++;

  $("#level-title").text("Level " + gameLevel);

  var randomNum = Math.floor(Math.random() * 4);
  var randomColor = buttonColours[randomNum];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeOut(1000).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);

} // ends nextSequence()

function playSound(colorID) {
  var colorAudio = new Audio("sounds/" + colorID + ".mp3");
  colorAudio.play();
} // ends playSound();

function animatePress(colorID) {

  $("#" + colorID).addClass("pressed");

  setTimeout(function() {
    $("#" + colorID).removeClass("pressed");
  }, 100);

} // ends animatePress();


function startOver(){

  gameStart = false;
  gameLevel = 0;
  gamePattern = [];

} // ends startOver()
