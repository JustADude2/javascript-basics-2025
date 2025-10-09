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
let up = false
let down = false
let left = false
let right = false
window.addEventListener("resize", () => {
    CANVAS.height = window.innerHeight
    CANVAS.width = window.innerWidth
})
document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp" || event.code == "KeyW") {
        up = true;
    }
    if (event.key == "ArrowLeft" || event.code == "KeyA") {
        left = true;
    }
    if (event.key == "ArrowRight" || event.code == "KeyD") {
        right = true;
    }
    if (event.key == "ArrowDown" || event.code == "KeyS") {
        down = true;
    }
})
document.addEventListener("keyup", (event) => {
    if (event.key == "ArrowUp" || event.code == "KeyW") {
        up = false;
    }
    if (event.key == "ArrowLeft" || event.code == "KeyA") {
        left = false;
    }
    if (event.key == "ArrowRight" || event.code == "KeyD") {
        right = false;
    }
    if (event.key == "ArrowDown" || event.code == "KeyS") {
        down = false;
    }
})
class Player{
    constructor(x, y){
        this.x = x
        this.y = y
    }
    update(){
        let tX
        let tY
        if(up && !down){}
    }
}
let map = [
    "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b",
    "b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "b", "b",
    "b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "b", "b",
    "b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "h", "f",
    "b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "b", "b", "b",
    "b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "b", " ", " ",
    "b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "b", " ", " ",
    "b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "b", " ", " ",
    "b", " ", " ", " ", " ", " ", " ", "e", " ", " ", " ", "b", "b", " ", " ", " ",
    "b", " ", " ", " ", " ", " ", "b", "b", "b", "b", " ", " ", " ", " ", " ", " ",
    "b", "s", " ", " ", " ", " ", "h", "c", "b", " ", " ", " ", " ", " ", " ", " ",
    "b", "b", " ", "b", "b", "b", "b", "b", " ", " ", " ", " ", " ", " ", " ", " ",
    " ", "b", "k", "b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",
    " ", "b", "b", "b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "
]
function draw(timestamp) {
    fps = 1000/(timestamp-oldtime)
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
    if(oldX != window.screenX){
        
    }
    if(oldY != window.screenY){
        
    }
    for(let i = 0; i<map.length; i++){
        if(map[i] == "b"){
            CTX.fillStyle = "#000000"
            CTX.fillRect(CANVAS.width * ((i%16)/16), CANVAS.height * (Math.floor(i/16)/16), CANVAS.width/16 + 1, CANVAS.height/16 + 1)
        }
        if(map[i] == "h"){
            CTX.fillStyle = "#000000"
            CTX.fillRect(CANVAS.width * ((i%16)/16), CANVAS.height * (Math.floor(i/16)/16), CANVAS.width/16 + 1, CANVAS.height/64)
            CTX.fillRect(CANVAS.width * ((i%16)/16), CANVAS.height * (Math.floor(i/16)/16) + CANVAS.height/64 *3, CANVAS.width/16 + 1, CANVAS.height/64 + 1)
        }
        if(map[i] == "f"){
            CTX.fillStyle = "#000000"
            CTX.fillRect(CANVAS.width * ((i%16)/16) + CANVAS.width/64, CANVAS.height * (Math.floor(i/16)/16) + CANVAS.height/64, CANVAS.width/128 + 1, CANVAS.height/64 * 3 + 1)
            CTX.beginPath()
            CTX.moveTo(CANVAS.width * ((i%16)/16) + CANVAS.width/128 * 3, CANVAS.height * (Math.floor(i/16)/16) + CANVAS.height/64)
            CTX.lineTo(CANVAS.width * ((i%16)/16) + CANVAS.width/64 * 3, CANVAS.height * (Math.floor(i/16)/16) + CANVAS.height/32)
            CTX.lineTo(CANVAS.width * ((i%16)/16) + CANVAS.width/128 * 3, CANVAS.height * (Math.floor(i/16)/16) + CANVAS.height/64 * 3)
            CTX.lineTo(CANVAS.width * ((i%16)/16) + CANVAS.width/128 * 3, CANVAS.height * (Math.floor(i/16)/16) + CANVAS.height/64)
            CTX.closePath()
            CTX.fillStyle = "#008000"
            CTX.fill()
        }
    }
    
    oldY = window.screenY
    oldX = window.screenX
    oldtime = timestamp;
    requestAnimationFrame(draw)
}
requestAnimationFrame(draw)