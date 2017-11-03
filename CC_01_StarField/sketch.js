// Ricardo Sáenz

// Starfield
// Video Inspired: https://youtu.be/17WoOqgXsRM

let height = 600;
let width = 600;

var stars = [];
let starNum = 800;

var ship; 
var speed;

function setup() {
   createCanvas(height, width);

   for(var i = 0; i < starNum; i++){
      stars.push(new Star());
   }

   ship = loadImage("assets/xwing.png");
}

function draw() {
   background(0);
   translate(height/2, width/2);
   noCursor();

   speed = map(mouseY, 0, height, 20, 0);

   for(var i = 0; i < starNum; i++){
      stars[i].upadte();
      stars[i].show();
   }

   var shipX = map(mouseX, 0, width, -(width/2)-50 , (width/2)-50);
   var shipY = map(mouseY, 0, height, -(height/2)-50, (height/2)-50);

   image(ship, shipX, shipY, 100, 100);

}