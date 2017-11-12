// Ricardo Sáenz
// Drop

class Drop{

	constructor() {
		this.crateCord();
		this.len = random(10, 20);
	}

	crateCord(){
		this.x = random(0, width);
		this.y = random(-200, -100);
		this.speed = random(5, 10);
	}

	fall(){
		this.y += this.speed;

		if(this.y > height) this.crateCord();


		if(this.y < mouseY + 50 && this.y > mouseY - 50){

			if(this.x < mouseX + 50 && this.x > mouseX - 50){

				if(this.x < mouseX + 50 && this.x < mouseX){
					this.x -= 5;
				}else if (this.x > mouseX - 50 && this.x > mouseX){
					this.x += 5;
				}
			}
		}

	}

	show() {
		stroke(138, 43, 226);
		line(this.x, this.y, this.x, this.y + this.len);
	}
}