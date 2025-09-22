//@ts-check
const ctx = document.getElementById("screen")
const c = ctx.getContext("2d")
let rgb = "#ffffff"
let rgb2 = "#000000"
let fl = true
let st = false
const fill = function(r, g, b) {
    fl = true
    rgb = "#" + r.toString(16) + g.toString(16) + b.toString(16)
}
const stroke = function(r, g, b) {
    st = true
    rgb2 = r + g + b
}
const noFill = function() {
    fl = false
}
const noStroke = function() {
    st = false
}
const rect = function(x, y, x2, y2) {
    if(fl){
        c.fillStyle = rgb
    }
    if(st){
        c.strokeStyle = rgb2
    }
    c.moveTo(x, y)
    c.lineTo(x+x2, y)
    c.lineTo(x+x2, y+y2)
    c.lineTo(x, y+y2)
    c.lineTo(x, y)
    c.closePath()
    if (fl){
        c.fill()
    }
    if(st){
        c.stroke()
    }
}




//behind here is code to turn this into processing java




setTimeout(() => {draw()}, 100);
let up, down, left, right = false;
let x, y = 1;
document.addEventListener("keydown", (event) => {
    console.log(event.key);
    if (event.key == "ArrowUp" || event.code == "KeyW") {
        console.log("up");
        up = true;
    }
    if (event.key == "ArrowLeft" || event.code == "KeyA") {
        console.log("left");
        left = true;
    }
    if (event.key == "ArrowRight" || event.code == "KeyD") {
        console.log("right");
        right = true;
    }
    if (event.key == "ArrowDown" || event.code == "KeyS") {
        console.log("down");
        down = true;
    }
})
document.addEventListener("keyup", (event) => {
    console.log(event.key);
    if (event.key == "ArrowUp" || event.code == "KeyW") {
        console.log("up");
        up = false;
    }
    if (event.key == "ArrowLeft" || event.code == "KeyA") {
        console.log("left");
        left = false;
    }
    if (event.key == "ArrowRight" || event.code == "KeyD") {
        console.log("right");
        right = false;
    }
    if (event.key == "ArrowDown" || event.code == "KeyS") {
        console.log("down");
        down = false;
    }
})
const draw = function() {
    setTimeout(() => {draw();}, 100)
    if (up && !down && !((left || right) && !(left && right))){
        y--
    }
    if (up && !down && ((left || right) && !(left && right))){
        y-= Math.sqrt(0.5)
    }
    if (down && !up && !((left || right) && !(left && right))){
        y++
    }
    if (down && !up && ((left || right) && !(left && right))){
        y+= Math.sqrt(0.5)
    }
    if (left && !right && !((up || down) && !(up && down))){
        x--
    }
    if (left && !right && ((up || down) && !(up && down))){
        x-= Math.sqrt(0.5)
    }
    if (right && !right && !((up || down) && !(up && down))){
        x++
    }
    if (right && !left && ((up || down) && !(up && down))){
        x+= Math.sqrt(0.5)
    }
    fill("ff", "00", "00")

    rect(x, y, 100, 100)
}