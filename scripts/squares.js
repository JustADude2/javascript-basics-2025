//@ts-check
let CANVAS = document.getElementById("screen")
CANVAS.height = window.innerHeight
CANVAS.width = window.innerWidth
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
    }
}
for (let i = 0; i<100; i++){
    let square = new Square(CANVAS.width/2, CANVAS.height/2, 50, 0.5)
    squares.push(square)
}
function draw(timestamp) {
    if(oldX != window.screenX){
        squares.forEach((s) => {
            s.x -= window.screenX-oldX
            if(s.x > CANVAS.width - s.size){
                if (s.speedX * -1 <= (oldX-window.screenX)*fps){
                    s.speedX = (oldX-window.screenX)*fps
                }
                s.x = CANVAS.width - s.size
            }else if(s.x < 0){
                if (s.speedX * -1 <= (oldX-window.screenX)*fps){
                    s.speedX = (oldX-window.screenX)*fps
                }
                s.x = 0
            }
        })
    }
    if(oldY != window.screenY){
        squares.forEach((s) => {
            s.y -= oldY-window.screenY
            if(s.y >= CANVAS.height - s.size){
                if (s.speedY)
                s.speedY = oldY-window.screenY*fps
                s.y = CANVAS.height - s.size
            }else if(s.y < 0){
                s.y = 0
            }
        })
    }
    squares.forEach((s) => {
        s.update()
    })
    fps = 1000/(oldtime-timestamp)
    oldtime = timestamp;
    requestAnimationFrame(draw)
}
requestAnimationFrame(draw)