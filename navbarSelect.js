// "ws://cpsc484-01.yale.internal:8888/frames" (live) or "ws://127.0.0.1:4444/frames" (recorded)
var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames")

const buttonTime = 2000
let home_icon = null
let left_arrow = null
let qr_code = null

socket.onmessage = (event) => {
  let data = JSON.parse(event.data) // get web socket stream
  if (data.people.length <= 0) window.location.href = "index.html"
  else if (data.people.length > 0){ // found a person

    // get higher hand position (and normalize it)
    person_id = data.groups.body_ids[0]
    let x = 0; let y = 0;
    right = data.people.filter(x => x.body_id == person_id)[0].joints[15].position.y+300
    left = data.people.filter(x => x.body_id == person_id)[0].joints[8].position.y+300
    if (right<left){
        x = 2 * -data.people.filter(x => x.body_id == person_id)[0].joints[15].position.x+600
        y = 2 * data.people.filter(x => x.body_id == person_id)[0].joints[15].position.y+300
    } else {
        x = 2 * -data.people.filter(x => x.body_id == person_id)[0].joints[8].position.x+600
        y = 2 * data.people.filter(x => x.body_id == person_id)[0].joints[8].position.y+300
    }
    console.log("("+Math.floor(x)+","+Math.floor(y)+")")

    if (x<5) x = 5
    if (x>1885) x = 1885
    if (y>1000) {
      y = 1050
      if (x<0) x = 50
      if (x>1885) x = 1850
    }
  
    if (x >= 0 & x <= 100 & y >= 1000){
        if (!home_icon){
            home_icon = Date.now()
        }
        else if (home_icon + buttonTime < Date.now()){
            window.location.href = "index.html"
        }
        left_arrow = null
        qr_code = null
    }
    else if (x >= 100 & x <= 200 & y >= 1000){
        if (!left_arrow){
            left_arrow = Date.now()
        }
        else if (left_arrow + buttonTime < Date.now()){
            window.location.href = "themes.html"
        }
        home_icon = null
        qr_code = null
    }
    else{
        home_icon = null
        left_arrow = null
        qr_code = null
    }

    update(x, y) // update tracker
  }
}

/* p5.js functions */

let circle;

function update(x, y){
    circle = document.getElementById('circle'); 

    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
}