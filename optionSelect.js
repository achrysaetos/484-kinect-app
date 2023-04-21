// "ws://cpsc484-01.yale.internal:8888/frames" (live) or "ws://127.0.0.1:4444/frames" (recorded)
var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames")

const buttonTime = 2000
let theme1 = null
let theme2 = null

socket.onmessage = (event) => {
  let data = JSON.parse(event.data) // get web socket stream
  if (data.people.length > 0){ // found a person

    // get right hand position (and normalize it)
    x = -data.people[0].joints[15].position.x+600
    y = data.people[0].joints[15].position.y+300
    console.log("("+Math.floor(x)+","+Math.floor(y)+")")

    if (x >= 200 & x <= 400 & y >= 400 & y <= 600){
        if (!theme1){
            theme1 = Date.now()
        }
        else if (theme1 + buttonTime < Date.now()){
            window.location.href = "index.html"
        }
        theme2 = null
    }
    else if (x >= 700 & x <= 9000 & y >= 400 & y <= 600){
        if (!theme2){
            theme2 = Date.now()
        }
        else if (theme2 + buttonTime < Date.now()){
            window.location.href = "index.html"
        }
        theme1 = null
    }
    else{
        theme1 = null
        theme2 = null
    }

    update(x, y) // update tracker
  }
}

/* p5.js functions */

let circle;

function update(x, y){
    circle = document.getElementById('circle'); 

    circle.style.left = x-10 + 'px';
    circle.style.top = y-10 + 'px';
}