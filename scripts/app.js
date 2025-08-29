//@ts-check
//Hello World

console.log("good job, you opened the console!");

//strings are surrounded by "", '', or `` (thing under the tilda)
let users = {
 "JustADude": "383116",
 "Big_Jim": "Alex",
 "John": "383116",
 "Joh": "383116",
}
users["NotJohn"] = "1234"

var usernameBox = document.createElement("INPUT");
usernameBox.setAttribute("type", "text");
usernameBox.setAttribute("id", "usernameBox")

var passwordBox = document.createElement("INPUT");
passwordBox.setAttribute("type", "text");
passwordBox.setAttribute("id", "passwordBox")

document.body.appendChild(usernameBox)
document.body.appendChild(passwordBox)

function enter() {
    if (usernameBox.value in users && passwordBox.value == users[usernameBox.value]){
        console.log("correct!")
    }else if (usernameBox.value in users){
        console.log("Username found, incorrect password")
    }
}
/*
const shadow1 = document.getElementById("Shadow1").attatchShadow({mode: "open"})
shadow1.innerHTML = 
"<style>p{color: blue;font-weight: bold};</style>"
<p>"ooga booga"</p>
*/
let username = ""
let profile = {
    username: "KittyMaster2000",
    favGame: "TBOI",
    likes: 1,
    subs: 2,
    friendsIWishIDidntEat: ["Jason Relent", "Lesley Styllfine", "Adonos Y"]
}
console.log(profile);
profile.likes += profile.likes + 1