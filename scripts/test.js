//@ts-check
const ctx = document.getElementById("screen")
//@ts-ignore
const c = ctx.getContext("2d")
let x2 = 0, y2 = 0, type = "", num = 0;
let fps = 60
const width = 1280
const height = 640
//I know this array is a sloppy form of objects, but I'm used to doing this
let attacks = [640, 320, "laser", Math.PI * 1.75, 1240, 40, "projectile", Math.PI * 1.625]
let rgb = "#ffffff"
let rgb2 = "#000000"
let fl = true
let st = false
let up, down, left, right = false;
let x = 1, y = 1;
let fpsCalc = 1000/60
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
const draw = function(timestamp) {
    fps = 1000/(timestamp-fpsCalc)
    if (up && !down && !((left || right) && !(left && right))){
        y-= 320/fps
    }
    if (up && !down && ((left || right) && !(left && right))){
        y-= Math.sqrt((320*320)/2)/fps
    }
    if (down && !up && !((left || right) && !(left && right))){
        y+= 320/fps
    }
    if (down && !up && ((left || right) && !(left && right))){
        y+= Math.sqrt((320*320)/2)/fps
    }
    if (left && !right && !((up || down) && !(up && down))){
        x-= 320/fps
    }
    if (left && !right && ((up || down) && !(up && down))){
        x-= Math.sqrt((320*320)/2)/fps
    }
    if (right && !left && !((up || down) && !(up && down))){
        x+= 320/fps
    }
    if (right && !left && ((up || down) && !(up && down))){
        x+= Math.sqrt((320*320)/2)/fps
    }
    function projectile(x2, y2, num, i) {
        if (x2 <= 20 || x2 >= width - 20) {
            num = num * -1
            if (x2 >= width - 20){
                x2 = width - 20
            }else{
                x2 = 20
            }
        }
        if (y2 <= 20 || y2 >= height - 20) {
            num = Math.PI - num
            if (y2 >= height - 20){
                y2 = height - 20
            }else{
                y2 = 20
            }
        }
        x2 += (100 * Math.sin(num))/fps; 
        y2 += (100 * Math.cos(num))/fps; 
        c.fillStyle = "#ff0000"; 
        c.fillRect(x2-20, y2-20, 40, 40); 
        attacks[i - 3] = x2
        attacks[i - 2] = y2
        attacks[i] = num
    }
    function laser(x2, y2, num, i) {
        let num2 = num + Math.PI
        c.beginPath(); 
        c.moveTo(x2 + (Math.sin(num) * 10), y2 - (Math.cos(num) * 10));
        c.lineTo(x2 + (Math.sin(num) * 10) + (Math.cos(num)*1000), y2 - (Math.cos(num) * 10) + (Math.sin(num)*1000))
        c.lineTo(x2 + (Math.sin(num2) * 10) + (Math.cos(num)*1000), y2 - (Math.cos(num2) * 10) + (Math.sin(num)*1000))
        c.lineTo(x2 + (Math.sin(num2) * 10) - (Math.cos(num)*1000), y2 - (Math.cos(num2) * 10) - (Math.sin(num)*1000))
        c.lineTo(x2 + (Math.sin(num) * 10) - (Math.cos(num)*1000), y2 - (Math.cos(num) * 10) - (Math.sin(num)*1000))
        c.closePath()
        c.fillStyle = "#ff0000"
        c.fill()
        c.beginPath()
        c.moveTo(x2 + (Math.sin(num) * 12) + (Math.cos(num)*10), y2 - (Math.cos(num) * 12) + (Math.sin(num)*10))
        c.lineTo(x2 + (Math.sin(num) * 12) + (Math.cos(num)*10), y2 - (Math.cos(num) * 12) + (Math.sin(num)*10))
        c.lineTo(x2 + (Math.sin(num2) * 12) + (Math.cos(num)*10), y2 - (Math.cos(num2) * 12) + (Math.sin(num)*10))
        c.lineTo(x2 + (Math.sin(num2) * 12) - (Math.cos(num)*10), y2 - (Math.cos(num2) * 12) - (Math.sin(num)*10))
        c.lineTo(x2 + (Math.sin(num) * 12) - (Math.cos(num)*10), y2 - (Math.cos(num) * 12) - (Math.sin(num)*10))
        c.closePath()
        c.fillStyle = "#000000"
        c.fill()
        attacks[i] += Math.PI * 0.1/fps
    }
    c.clearRect(0, 0, 1280, 640)
    c.fillStyle = "#404040"
    c.fillRect(0, 0, 1280, 640)
    c.fillStyle = "#ff0000"
    c.fillRect(x, y, 40, 40)
    for (let i = 0; i <= attacks.length; i++){
        if (i%4 == 0) {
            x2 = attacks[i];
        }else if (i%4 == 1) {
            y2 = attacks[i]
        }else if (i%4 == 2) {
            type = attacks[i]
        }else{
            num = attacks[i]
            if (type == "projectile"){
                projectile(x2, y2, num, i)
            }else if (type == "laser"){
                laser(x2, y2, num, i)
            }
        }
    }
    if (timestamp >= 4000 && timestamp <= 4999){
        c.fillStyle = "#b04040"
        c.fillRect(width/4 - 10, -1, 20, height + 2)
        c.fillStyle = "#404040"
        c.fillRect(308, 790, 24, 20)
    }
    if (timestamp >= 5000 && attacks[8] == 0){
        attacks[8] = width/4
        attacks[9] = width/4*3
        attacks[10] = "laser"
        attacks[11] = 0
    }
    fpsCalc = timestamp
    requestAnimationFrame(draw)
}
requestAnimationFrame(draw)