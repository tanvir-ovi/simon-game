const buttonColours = ["red", "blue", "green", "yellow" ];
let gamePattern = [];
let userClickedPattern = [];
let started = false;

let level = 0;

$(".btn").click( function(evt) {
	var userChosenColour = $(this).attr("id");
  	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer( userClickedPattern.length-1)
})

function nextSequence() {
	level++;

	$("#level-title").text("Level " + level);
	userClickedPattern = [];
	let randomNumber = Math.floor(Math.random()*4);
	let randomChosenColours = buttonColours[randomNumber];
	gamePattern.push(randomChosenColours);
	$(`#${randomChosenColours}`).fadeOut(100).fadeIn(100);

	playSound(randomChosenColours)
}

function playSound(name) {
	let audio = new Audio("sounds/"+ name +".mp3");
	audio.play();
}

function animatePress(currentColor) {
	$('#' + currentColor).addClass('pressed');

	setTimeout(function() {
		$('#' + currentColor).removeClass('pressed');
	} , 100);
}

$(document).keypress( function() {
	if(!started) {
		nextSequence();
		started = true;
	}
})

function checkAnswer( currentLevel ) {
	if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");
		if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
	} else {
		console.log("wrong");
		let audio = new Audio("sounds/wrong.mp3");
		audio.play();

		$("body").addClass("game-over")
		setTimeout(function() {
			$("body").removeClass("game-over")
		}, 200);

		$("#level-title").text("Game Over, Press Any Key to Restart");

		startOver();
	}

}

function startOver() {
gamePattern = [];
started = false;
level = 0;

	$(document).keypress( function() {
		if(!started) {
			
			nextSequence();
			started = true;
			
		}
	})

}

