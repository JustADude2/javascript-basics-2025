//@ts-check
let CANVAS = document.getElementById("screen")
CANVAS.height = window.innerHeight
CANVAS.width = window.innerWidth
const CTX = CANVAS.getContext("2d")
let HEIGHT = window.innerHeight
let WIDTH = window.innerWidth
let oldX = window.screenX
let oldY = window.screenY
let oldtime = 0;
let fps = 60
window.addEventListener("resize", () => {
    CANVAS.height = window.innerHeight
    CANVAS.width = window.innerWidth
})
let squares = []
class Square {
    constructor(x, y, size, elasticity){
        this.size = size
        this.elasticity = elasticity
        this.x = x
        this.y = y
        this.speedX = 0
        this.speedY = 100
    }
    update(){
        this.speedY += 600/fps
        this.y += this.speedY/fps
        this.x += this.speedX/fps
        if(this.y > CANVAS.height - this.size){
            this.y = CANVAS.height - this.size
            this.speedY *= -1 * this.elasticity
        }
        if(this.y < 0){
            this.y = 0
            this.speedY *= -1 * this.elasticity
        }
        if (this.x > CANVAS.width - this.size){
            this.x = CANVAS.width - this.size
            this.speedX *= -1 * this.elasticity
        }
        if (this.x < 0){
            this.x = 0
            this.speedX *= -1 * this.elasticity
        }
    }
    draw(){
        CTX.fillStyle = "blue"
        CTX.beginPath()
        CTX.moveTo(this.x+(this.size/2), this.y+(this.size/2))
        CTX.arc(this.x+(this.size/2), this.y+(this.size/2), this.size/2, 0, Math.PI*2, false)
        CTX.closePath()
        CTX.fill()
    }
}
for (let i = 0; i<1000; i++){
    let square = new Square(CANVAS.width*Math.random(), CANVAS.height/2, 10,  (Math.random()+0.5)/2)
    squares.push(square)
}
function draw(timestamp) {
    fps = 1000/(timestamp-oldtime)
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
    if(oldX != window.screenX){
        squares.forEach((s) => {
            s.x -= window.screenX-oldX
            if(s.x > CANVAS.width - s.size){
                if (s.speedX * -1 * s.elasticity <= (oldX-window.screenX)*fps){
                    s.speedX = (oldX-window.screenX)*fps * s.elasticity
                }
                s.x = CANVAS.width - s.size
            }else if(s.x < 0){
                if (s.speedX * -1 * s.elasticity <= (oldX-window.screenX)*fps){
                    s.speedX = (oldX-window.screenX)*fps * s.elasticity
                }
                s.x = 0 
            }
        })
    }
    if(oldY != window.screenY){
        squares.forEach((s) => {
            s.y -= window.screenY-oldY
            if(s.y > CANVAS.height - s.size){
                if (s.speedY * -1 <= (oldY - window.screenY)*fps){
                s.speedY = (oldY-window.screenY)*fps * s.elasticity
                }
                s.y = CANVAS.height - s.size
            }else if(s.y < 0){
                if (s.speedY * -1 <= (oldY - window.screenY)*fps){
                s.speedY = (oldY-window.screenY)*fps * s.elasticity
                }
                s.y = 0
            }
        })
    }
    squares.forEach((s) => {
        s.update()
        s.draw()
    })
    oldY = window.screenY
    oldX = window.screenX
    oldtime = timestamp;
    requestAnimationFrame(draw)
}
requestAnimationFrame(draw)