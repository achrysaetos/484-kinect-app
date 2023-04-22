// "ws://cpsc484-01.yale.internal:8888/frames" (live) or "ws://127.0.0.1:4444/frames" (recorded)
var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames")

// selection vars
const buttonTime = 2000
let theme1 = null
let theme2 = null

// navbar vars
const navbarTime = 2000
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
        x = -data.people.filter(x => x.body_id == person_id)[0].joints[15].position.x+600
        y = data.people.filter(x => x.body_id == person_id)[0].joints[15].position.y+300
    } else {
        x = -data.people.filter(x => x.body_id == person_id)[0].joints[8].position.x+600
        y = data.people.filter(x => x.body_id == person_id)[0].joints[8].position.y+300
    }
    console.log("("+Math.floor(x)+","+Math.floor(y)+")")

    // selection logic
    if (x >= 200 & x <= 400 & y >= 400 & y <= 600){
        if (!theme1){
            theme1 = Date.now()
        }
        else if (theme1 + buttonTime < Date.now()){
            window.location.href = "canvas_pgs/yale.html"
        }
        theme2 = null
    }
    else if (x >= 700 & x <= 900 & y >= 400 & y <= 600){
        if (!theme2){
            theme2 = Date.now()
        }
        else if (theme2 + buttonTime < Date.now()){
            window.location.href = "canvas_pgs/cats.html"
        }
        theme1 = null
    }
    else{
        theme1 = null
        theme2 = null
    }

    update(x, y) // update tracker

    // navbar logic
    if (x >= 15 & x <= 90 & y >= 575 & y <= 675){
        if (!home_icon){
            home_icon = Date.now()
        }
        else if (home_icon + navbarTime < Date.now()){
            window.location.href = "index.html"
        }
        left_arrow = null
        qr_code = null
    }
    else if (x >= 130 & x <= 200 & y >= 575 & y <= 675){
        if (!left_arrow){
            left_arrow = Date.now()
        }
        else if (left_arrow + navbarTime < Date.now()){
            window.location.href = "index.html"
        }
        home_icon = null
        qr_code = null
    }
    else if (x >= 800 & x <= 1200 & y >= 575 & y <= 675) {
        if (!qr_code){
            qr_code = Date.now()
        }
        else if (qr_code + navbarTime < Date.now()){
            window.location.href = "qr_page.html"
        }
        home_icon = null
        left_arrow = null
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