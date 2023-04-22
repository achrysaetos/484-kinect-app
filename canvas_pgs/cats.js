
// "ws://cpsc484-01.yale.internal:8888/frames" (live) or "ws://127.0.0.1:4444/frames" (recorded)
var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames")

last_x = 600; last_y = 450 // track last position (initially centered)

// navbar vars
const buttonTime = 2000
let home_icon = null
let left_arrow = null
let qr_code = null

socket.onmessage = (event) => {
  let data = JSON.parse(event.data) // get web socket stream
  if (data.people.length <= 0) window.location.href = "../index.html"
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

    // track hand and chest (start drawing when hand above chest)
    hand_pos = data.people[data.people.length-1].joints[15].position.y
    chest_pos = data.people[data.people.length-1].joints[2].position.y

    if (hand_pos < chest_pos){
      draw(last_x, last_y, x, y)
    }

    last_x = x; last_y = y // update last position

    // navbar logic
    if (x >= 15 & x <= 90 & y >= 575){
      if (!home_icon){
          home_icon = Date.now()
      }
      else if (home_icon + buttonTime < Date.now()){
          window.location.href = "../index.html"
      }
      left_arrow = null
      qr_code = null
    }
    else if (x >= 130 & x <= 200 & y >= 575){
        if (!left_arrow){
            left_arrow = Date.now()
        }
        else if (left_arrow + buttonTime < Date.now()){
            window.location.href = "../themes.html"
        }
        home_icon = null
        qr_code = null
    }
    else if (x >= 800 & x <= 1200 & y >= 575) {
        if (!qr_code){
            qr_code = Date.now()
        }
        else if (qr_code + navbarTime < Date.now()){
            window.location.href = "../qr_page.html"
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


let circle;

function update(x, y){
  circle = document.getElementById('circle'); 
  console.log(y)
  if (y<600){
    circle.style.display === "none"
  } else if (y >= 600){
    y = 650
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
  }
}

/* p5.js functions */

let catPics = [
  "https://wallpaperaccess.com/full/374174.jpg",
  "https://cdn.wallpapersafari.com/62/60/RolTDX.jpg",
  "https://cdn.wallpapersafari.com/64/99/RXHCyN.jpg",
]

let picture; let cover;

function preload() {
  picture = createImg(catPics[Math.floor(Math.random()*catPics.length)])
  picture.hide()
}

let pastel_colors = ["#e8dff5", "#fce1e4", "#fcf4dd", "#ddedea", "#daeaf6"]

function setup() {
  createCanvas(1200, 900)
  cover = createGraphics(width, height)

  cover.background(pastel_colors[Math.floor(Math.random()*pastel_colors.length)])
  cover.textSize(48)
  cover.textFont("andale mono", 60)
  cover.textAlign(CENTER)
  cover.text("Wave to scratch off 👋", width/2, height/4) // or info about pic, etc

  cover.imageMode(CENTER)
  cover.strokeWeight(100) // make user selectable?
  cover.blendMode(REMOVE)
}

function draw(x1, y1, x2,y2) {
  image(picture, 0, 0, width, height)
  cover.line(x1, y1, x2, y2)
  image(cover, 0, 0)
}