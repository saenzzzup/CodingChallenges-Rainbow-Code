var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 5;

var ScorePlayer1 = 0;
var ScorePlayer2 = 0;
const WINNING_SCORE = 5;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_WEIGHT = 10;
const PADDLE_HEIGHT = 100;

function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX, 
		y:mouseY
	};
}

function handleMouseClick(evt){
	if(showingWinScreen){
		ScorePlayer1 = 0;
		ScorePlayer2 = 0;
		showingWinScreen = false;
	}
}

window.onload = function () {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	var framesPerSecond = 30;
	setInterval(function(){
		moveEvertthing();
		drawEverything();
	}, 1000/framesPerSecond);

	canvas.addEventListener('mousemove', 
		function(evt){
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
			//paddle2Y = mousePos.y - (PADDLE_HEIGHT/2);
	});
	canvas.addEventListener('mousedown', handleMouseClick);
}

function ballreset(){
	if(ScorePlayer1 >= WINNING_SCORE || ScorePlayer2 >= WINNING_SCORE){
		showingWinScreen = true;
	}

	ballX = canvas.width/2;
	ballY = canvas.height/2;
	ballSpeedX *= -1;
}

function computerMovement(){
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2)
	if(paddle2YCenter < ballY-35){
		paddle2Y +=  6;
	}else if(paddle2YCenter > ballY+35){
		paddle2Y -= 6;
	}
}

function moveEvertthing(){

	if(showingWinScreen) return;

	ballX += ballSpeedX;
	ballY += ballSpeedY;

	computerMovement();

	if(ballX < 0){
		if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
			ballSpeedX *= -1;

			var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		}else{
			ScorePlayer2++;
			ballreset();
		}
	}
	if(ballX > canvas.width){
		if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
			ballSpeedX *= -1;

			var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		}else{
			ScorePlayer1++;
			ballreset();
		}
	}
	if(ballY > canvas.height || ballY < 0){
		ballSpeedY *= -1;
	}
}

function drawNet(){
	for( var i = 0; i < canvas.height; i += 40){
		colorRect(canvas.width/2-1, i, 2, 20, 'white');
	}
}

function drawEverything(){
	//Screen
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	canvasContext.fillStyle = "white";

	if(showingWinScreen) {
		if(ScorePlayer1 >= WINNING_SCORE){
			canvasContext.fillText("Left Player Won!", 350, 200);
		}else if(ScorePlayer2 >= WINNING_SCORE){
			canvasContext.fillText("Right Player Won!", 350, 200);
		}

		canvasContext.fillText("Click To continue", 350, 500);
		return;
	}
	//Net
	drawNet();
	//Paddle
	colorRect(0, paddle1Y, PADDLE_WEIGHT, 100, 'white');
	//PaddleComputer
	colorRect(canvas.width-PADDLE_WEIGHT, paddle2Y, PADDLE_WEIGHT, 100, 'white');
	//Ball
	colorCircle(ballX, ballY, 5, 'white');

	canvasContext.fillText(ScorePlayer1, 100, 100);
	canvasContext.fillText(ScorePlayer2, canvas.width-100, 100);
}

function colorCircle(centerX, centerY, radius, drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,  centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}
