//@ts-check
let hex = ["0", "1", "2", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
/** @type { HTMLCanvasElement } */
//@ts-ignore This is an HTML Canvas
const CANVAS = document.getElementById("screen");

/** @type { CanvasRenderingContext2D } */
//@ts-ignore is not null
const CTX = CANVAS.getContext("2d");
CTX.globalAlpha = 0.1;

//const HEIGHT = 600;
//const WIDTH = 800;
const Width = 50;
const Height = 100
CANVAS.height = window.innerHeight;
CANVAS.width = window.innerWidth;

class Box {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;

		this.speed = 10;
		this.width = Width;
		this.height = Height;
        this.d = "1";

		this.xDirection = 1;
		this.yDirection = 1;

        this.alpha = 1;
	}

	draw() {


        CTX.globalAlpha = this.alpha
		CTX.fillStyle = this.color;
		CTX.fillRect(this.x, this.y, this.width, this.height);

	}

	update() {
		let top = this.y;
		let bottom = this.y + this.height;
		let left = this.x;
		let right = this.x + this.width;
        /*
        if (Math.random()<0.005 && this.d == "y"){
            this.yDirection *= -1
        }
        if (Math.random()<0.005 && this.d == "x"){
            this.xDirection *= -1
        }
        */
        if (Math.random()<0.05){
            this.yDirection *= -1
        }
        if (Math.random()<0.05){
            this.xDirection *= -1
        }
		if (top < 0) {
			// colliding with top
			this.yDirection = 1;
		} else if (bottom > CANVAS.height) {
			// colliding with bottom
			this.yDirection = -1;
		}
		if (left < 0) {
			// colliding with left
			this.xDirection = 1;
		} else if (right > CANVAS.width) {
			// colliding with right
			this.xDirection = -1;
		}
		this.x += this.xDirection * this.speed;
		this.y += this.yDirection * this.speed;
	}
}
class Shape {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {string} color 
     */
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;

		this.speed = 10;
        this.d = "1";
		this.xDirection = 1;
		this.yDirection = 1;

        this.alpha = 1;
        this.rand = Math.ceil(Math.random() * 8)+2;
        this.shape = [];
        for (let i = 0; i < this.rand; i++){
            let rand2 = Math.random() * (Math.PI*2/this.rand) + (2*i*Math.PI/this.rand);
            let rand3 = (Math.random() * 1.5) * Width;
            let rand4 = (Math.random() * 1.5) * Height;
            this.shape.push([Math.sin(rand2+(Math.PI*2/this.rand))*rand3, Math.cos(rand2+(Math.PI/this.rand))*rand4])
        }
        this.leftX = 0
        this.topY = 0
        this.rightX = 0
        this.bottomY = 0
        for (let i = 0; i<this.shape.length; i++){
            if(this.shape[i][0]>= this.leftX){
                this.leftX = this.shape[i][0]
            }
            if(this.shape[i][0]>= this.rightX){
                this.rightX = this.shape[i][0]
            }
            if(this.shape[i][1]>= this.bottomY){
                this.bottomY = this.shape[i][1]
            }
            if(this.shape[i][1]>= this.topY){
                this.topY = this.shape[i][1]
            }
        }
	}

	draw() {
        CTX.globalAlpha = this.alpha
		CTX.fillStyle = this.color;
        CTX.moveTo(this.shape[0][0], this.shape[0][1])
        CTX.beginPath()
        for(let i = 1; i<this.shape.length; i++){
            CTX.lineTo(this.shape[i][0] + this.x, this.shape[i][1] + this.y)
        }
        CTX.closePath()
        CTX.fillStyle = this.color
        CTX.globalAlpha = this.alpha
        CTX.fill()
	}

	update() {
		let top = this.y - this.topY;
		let bottom = this.y + this.bottomY;
		let left = this.x - this.leftX;
		let right = this.x + this.rightX;
        /*
        if (Math.random()<0.005 && this.d == "y"){
            this.yDirection *= -1
        }
        if (Math.random()<0.005 && this.d == "x"){
            this.xDirection *= -1
        }
        */
        if (Math.random()<0.01){
            this.yDirection *= -1
        }
        if (Math.random()<0.01){
            this.xDirection *= -1
        }
        if (top < 0) {
			// colliding with top
			this.yDirection = 1;
		} else if (bottom > CANVAS.height) {
			// colliding with bottom
			this.yDirection = -1;
		}
		if (left < 0) {
			// colliding with left
			this.xDirection = 1;
		} else if (right > CANVAS.width) {
			// colliding with right
			this.xDirection = -1;
		}
		this.x += this.xDirection * this.speed;
		this.y += this.yDirection * this.speed;
	}
}
let boxes = [];

for (let i=0; i<1000; i++){
    let box = new Shape(CANVAS.width/2 - Width/2, CANVAS.height/2 - Height/2, `#${hex[Math.floor(Math.random()*15)]}${hex[Math.floor(Math.random()*15)]}${hex[Math.floor(Math.random()*15)]}${hex[Math.floor(Math.random()*15)]}${hex[Math.floor(Math.random()*15)]}${hex[Math.floor(Math.random()*15)]}`)
    box.speed = 600
    if(i < 500){
        box.d = "y"
    }else{
        box.d = "x"
    }
    box.speed = Math.random() * 10 + 20
    if(Math.random() <= 0.5){
        box.xDirection = 1
    }else{
        box.xDirection = -1
    }
    if(Math.random() <= 0.5){
        box.yDirection = 1
    }else{
        box.yDirection = -1
    }
    boxes.push(box)
}
let currentTimestamp = 0;
//@ts-ignore
let fps;

/**
 * @param {number} timestamp
 */
function drawLoop(timestamp) {
    fps = 1000/(timestamp - currentTimestamp)
	CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    boxes.forEach((b) => {
        b.update();
        b.draw();
    });
    currentTimestamp = timestamp
	// console.log(elapsedTime);
	requestAnimationFrame(drawLoop);
}

requestAnimationFrame(drawLoop);

function onResize(){
    CANVAS.height = window.innerHeight;
    CANVAS.width = window.innerWidth;
}

window.addEventListener("resize", onResize)