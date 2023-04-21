// "ws://cpsc484-01.yale.internal:8888/frames" (live) or "ws://127.0.0.1:4444/frames" (recorded)
var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames")

const buttonTime = 2000
let hoveredAt = null

socket.onmessage = (event) => {
  let data = JSON.parse(event.data) // get web socket stream
  if (data.people.length > 0){ // found a person

    // get right hand position (and normalize it)
    x = -data.people[data.people.length-1].joints[15].position.x+600
    y = data.people[data.people.length-1].joints[15].position.y+300
    console.log("("+Math.floor(x)+","+Math.floor(y)+")")

    if (x >= 700 & x <= 900 & y >= 400 & y <= 600){
        if (!hoveredAt){
            hoveredAt = Date.now()
        }
        else if (hoveredAt + buttonTime < Date.now()){
            window.location.href = "themes.html"
        }

    update(x, y) // update tracker
  }
}
}

/* p5.js functions */

let circle;

function update(x, y){
    circle = document.getElementById('circle'); 

    circle.style.left = x-10 + 'px';
    circle.style.top = y-10 + 'px';
}
