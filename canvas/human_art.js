
// "ws://cpsc484-01.yale.internal:8888/frames" (live) or "ws://127.0.0.1:4444/frames" (recorded)
var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames")

last_x = 800; last_y = 450 // track last position (initially centered)

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
        x = 2 * -data.people.filter(x => x.body_id == person_id)[0].joints[15].position.x+600
        y = 2 * data.people.filter(x => x.body_id == person_id)[0].joints[15].position.y+300
    } else {
        x = 2 * -data.people.filter(x => x.body_id == person_id)[0].joints[8].position.x+600
        y = 2 * data.people.filter(x => x.body_id == person_id)[0].joints[8].position.y+300
    }
    console.log("("+Math.floor(x)+","+Math.floor(y)+")")

    if (x<5) x = 5
    if (x>1885) x = 1885
    if (y<5) y = 5
    if (y>1000) {
      y = 1050
      if (x<0) x = 50
      if (x>1885) x = 1850
    }

    if (y < 1000){
      draw(last_x, last_y, x, y)
    }

    last_x = x; last_y = y // update last position
    
    // navbar logic
    if (x >= 0 & x <= 100 & y >= 1000){
      if (!home_icon){
          home_icon = Date.now()
      }
      else if (home_icon + buttonTime < Date.now()){
          window.location.href = "../index.html"
      }
      left_arrow = null
      qr_code = null
    }
    else if (x >= 100 & x <= 200 & y >= 1000){
        if (!left_arrow){
            left_arrow = Date.now()
        }
        else if (left_arrow + buttonTime < Date.now()){
            window.location.href = "../themes.html"
        }
        home_icon = null
        qr_code = null
    }
    else if (x >= 1800 & x <= 1900 & y >= 1000) {
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
  if (y<1000){
    circle.style.visibility = "hidden"
  } else if (y >= 1000){
    circle.style.visibility = "visible"
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
  }
}

/* p5.js functions */

let yalePics = [
  "https://wallpaperset.com/w/full/f/f/8/51684.jpg",
  "https://wallpaperset.com/w/full/2/f/4/51697.jpg",
  "https://wallpaperset.com/w/full/4/8/d/51702.jpg",
  "https://wallpaperset.com/w/full/c/7/9/51706.jpg",
  "https://wallpaperset.com/w/full/8/a/2/51707.jpg",
  "https://wallpaperset.com/w/full/b/4/8/51708.jpg",
  "https://wallpaperset.com/w/full/9/a/2/51710.jpg",
  "https://wallpaperset.com/w/full/8/3/9/51713.jpg",
  "https://wallpaperset.com/w/full/5/a/5/51720.jpg",
  "https://wallpaperset.com/w/full/6/d/7/51721.jpg",
  "https://wallpaperset.com/w/full/9/5/d/51729.jpg",
  "https://wallpaperset.com/w/full/2/e/5/51731.jpg",
  "https://wallpaperset.com/w/full/7/b/4/51734.jpg",
  "https://wallpaperset.com/w/full/f/a/7/51738.jpg",
]

let picture; let cover;

function preload() {
  picture = createImg(yalePics[Math.floor(Math.random()*yalePics.length)])
  picture.hide()
}

let pastel_colors = ["#e8dff5", "#fce1e4", "#fcf4dd", "#ddedea", "#daeaf6"]

function setup() {
  createCanvas(1600, 900)
  cover = createGraphics(width, height)

  cover.background(pastel_colors[Math.floor(Math.random()*pastel_colors.length)])
  cover.textSize(48)
  cover.textFont("andale mono", 60)
  cover.textAlign(CENTER)
  cover.text("Wave to scratch off 👋", width/2, height/4) // or info about pic, etc

  cover.imageMode(CENTER)
  cover.strokeWeight(200) // make user selectable?
  cover.blendMode(REMOVE)
}

function draw(x1, y1, x2,y2) {
  image(picture, 0, 0, width, height)
  cover.line(x1, y1, x2, y2)
  image(cover, 0, 0)
}