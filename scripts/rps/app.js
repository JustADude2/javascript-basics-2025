//@ts-check

const options = ["rock", "paper", "scissors"]
let duelElement = document.getElementById("duel");
let health = 2
let comHealth = 2
let wins = 0
let comWins = 0
let winRatio = 0.0
let winner = ""
const shoot = function (weapon) {
    if (winner==""&&weapon!=9){
        let comWeapon = Math.round((3*Math.random()-0.5))
        if (weapon == ((comWeapon+2)%3)){
            health -= 1
            //@ts-ignore
            duelElement.innerHTML = "you lost against the computer's " + options[comWeapon] + ",<br>your health: " + health
            
            document.body.setAttribute("style", "background-color:#FF0000")
            setTimeout(() => {document.body.setAttribute("style", "background-color:#FF0404")}, 50)
            setTimeout(() => {document.body.setAttribute("style", "background-color:#FF0808")}, 100)
            setTimeout(() => {document.body.setAttribute("style", "background-color:#FF1010")}, 150)
            setTimeout(() => {document.body.setAttribute("style", "background-color:#FF1818")}, 200)
            setTimeout(() => {document.body.setAttribute("style", "background-color:#FF2424")}, 250)
            setTimeout(() => {document.body.setAttribute("style", "background-color:#FF3030")}, 300)
            setTimeout(() => {document.body.setAttribute("style", "background-color:#FF4848")}, 350)
            setTimeout(() => {document.body.setAttribute("style", "background-color:#FF6060")}, 400)
            setTimeout(() => {document.body.setAttribute("style", "background-color:#FF7B7B")}, 450)
            setTimeout(() => {document.body.setAttribute("style", "background-color:#FF9898")}, 500)
            setTimeout(() => {document.body.setAttribute("style", "background-color:#FFB8B8")}, 550)
            setTimeout(() => {document.body.setAttribute("style", "background-color:#FFD8D8")}, 600)
            setTimeout(() => {document.body.setAttribute("style", "background-color:#FFEBEB")}, 650)
            setTimeout(() => {document.body.setAttribute("style", "background-color:#FFFFFF")}, 700)
        }else if(weapon == ((comWeapon+1)%3)){
            comHealth -= 1
            //@ts-ignore
            duelElement.innerHTML = "you won against the computer's " + options[comWeapon] + "!<br>computer's health: " + comHealth
        }else{
            //@ts-ignore
            duelElement.innerHTML = "you tied!"
        }
        if(health == 0){
            //@ts-ignore
            duelElement.innerHTML = duelElement.innerHTML + "<br>game over, better luck next time!";
            winner = "computer";
            duelElement.setAttribute("class", "fail")
            document.getElementById("reset").innerHTML = "Reset"
            comWins += 1
        }else if(comHealth == 0){
            //@ts-ignore
            duelElement.innerHTML += "<br>You won!";
            winner = "you";
            duelElement.setAttribute("class", "win")
            document.getElementById("reset").innerHTML = "Reset"
            wins += 1
        }
    }else if(weapon==9){
        winRatio = wins/comWins
        health = 2
        comHealth = 2
        winner = ""
        duelElement.setAttribute("class", "")
        duelElement.innerHTML = "wins: " + wins + "<br>enemy wins: " + comWins + "<br>win ratio: " + winRatio + " (player:computer)<br>What do you do?"
        document.getElementById("reset").innerHTML = ""
    }
}