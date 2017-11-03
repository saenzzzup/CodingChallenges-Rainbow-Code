// Ricardo Sáenz
// Star

class Star{

	constructor() {
		this.possStar();
	}

	upadte() {
		this.z -= speed;
		if (this.z < 0) this.possStar()
	}

	possStar(){
		this.x = random(-width, width);
		this.y = random(-height, height);
		this.z = random(width);
	}

	show() {

		fill(255);
		noStroke();

		var sx = map(this.x / this.z, 0, 1, 0, width);
		var sy = map(this.y / this.z, 0, 1, 0, height);
		var r = map(this.z, 0, width, 10, 0);
		
		ellipse(sx, sy, r);
	}
}