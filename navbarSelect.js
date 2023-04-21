// "ws://cpsc484-01.yale.internal:8888/frames" (live) or "ws://127.0.0.1:4444/frames" (recorded)
var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames")

const buttonTime = 2000
let home_icon = null
let left_arrow = null
let qr_code = null

socket.onmessage = (event) => {
  let data = JSON.parse(event.data) // get web socket stream
  if (data.people.length > 0){ // found a person

    // get right hand position (and normalize it)
    x = -data.people[0].joints[15].position.x+600
    y = data.people[0].joints[15].position.y+300
    console.log("("+Math.floor(x)+","+Math.floor(y)+")")

    if (x >= 15 & x <= 90 & y >= 575 & y <= 675){
        if (!home_icon){
            home_icon = Date.now()
        }
        else if (home_icon + buttonTime < Date.now()){
            window.location.href = "index.html"
        }
        left_arrow = null
        qr_code = null
    }
    else if (x >= 130 & x <= 200 & y >= 575 & y <= 675){
        if (!left_arrow){
            left_arrow = Date.now()
        }
        else if (left_arrow + buttonTime < Date.now()){
            window.location.href = "index.html"
        }
        home_icon = null
        qr_code = null
    }
    else if (x >= 800 & x <= 1200 & y >= 575 & y <= 675) {
        if (!qr_code){
            qr_code = Date.now()
        }
        else if (qr_code + buttonTime < Date.now()){
            window.location.href = "qr_page.html"
        }
        home_icon = null
        left_arrow = null
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