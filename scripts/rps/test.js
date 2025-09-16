let up, down, left, right = false;
document.addEventListener("keydown", (event) => {
    console.log(event.key);
    if (event.key == "ArrowUp" || event.code == "KeyW") {
        console.log("up");

    }
    if (event.key == "ArrowLeft" || event.code == "KeyA") {
        console.log("left");

    }
    if (event.key == "ArrowRight" || event.code == "KeyD") {
        console.log("right");

    }
    if (event.key == "ArrowDown" || event.code == "KeyS") {
        console.log("down");

    }

})
