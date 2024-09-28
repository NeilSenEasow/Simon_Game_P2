var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Detecting a keypress to start the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Detecting button clicks and handling user inputs
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check the user's answer after each click
  checkAnswer(userClickedPattern.length - 1);
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
  // Check if the user's input matches the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // If the user has completed the current sequence, move to the next level
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    // If the user input is wrong, trigger game over
    console.log("wrong");
    playSound("wrong");

    // Add a "game-over" class for visual feedback and remove it after 200ms
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Update the title to indicate the game is over and prompt to restart
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Call startOver to reset the game
    startOver();
  }
}

// Function to generate the next sequence
function nextSequence() {
  userClickedPattern = []; // Reset the user pattern for the new level

  level++; // Increase level
  $("#level-title").text("Level " + level); // Update level title

  // Generate a random number between 0-3 and choose a random color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); // Add the new color to the game pattern

  // Flash the button and play the corresponding sound
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Function to play sound based on the color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to animate button presses
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to reset the game when it's over
function startOver() {
  level = 0; // Reset the level
  gamePattern = []; // Clear the game pattern
  started = false; // Mark the game as not started
}
