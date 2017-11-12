// Ricardo Sáenz

// PurpleRain
// Video Inspired: https://youtu.be/KkyIDI6rQJI

let height = 360;
let width = 640;

var drops = [];
let dropsNum = 400;

var speed = 10;

function setup() {
   createCanvas(width, height);

   for(var i = 0; i < dropsNum; i++){

      drops.push( 
         new Drop()
         );
   }

}

function draw() {
   background(230, 230, 250);

   for(var i = 0; i < dropsNum; i++){
      drops[i].show();
      drops[i].fall();
   }

}