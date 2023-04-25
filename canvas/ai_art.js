
// "ws://cpsc484-01.yale.internal:8888/frames" (live) or "ws://127.0.0.1:4444/frames" (recorded)
var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames")

last_x = 800; last_y = 450 // track last position (initially centered)

// navbar vars
const buttonTime = 2000
let home_icon = null
let left_arrow = null
let qr_code = null
let refresh = null

socket.onmessage = (event) => {
  let data = JSON.parse(event.data) // get web socket stream
  if (data.people.length <= 0) window.location.href = "../index.html"
  else if (data.people.length > 0){ // found a person

    // get higher hand position (and normalize it)
    person_id = data.groups.body_ids[0]
    let x = 0; let y = 0;
    right = data.people.filter(x => x.body_id == person_id)[0]?.joints[15].position.y+300
    left = data.people.filter(x => x.body_id == person_id)[0]?.joints[8].position.y+300
    if (right<left){
        x = 2 * -data.people.filter(x => x.body_id == person_id)[0]?.joints[15].position.x+600
        y = 2 * data.people.filter(x => x.body_id == person_id)[0]?.joints[15].position.y+300
    } else {
        x = 2 * -data.people.filter(x => x.body_id == person_id)[0]?.joints[8].position.x+600
        y = 2 * data.people.filter(x => x.body_id == person_id)[0]?.joints[8].position.y+300
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
      refresh = null
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
        refresh = null
    }
    else if (x >= 200 & x <= 300 & y >= 1000){
        if (!refresh){
            refresh = Date.now()
        }
        else if (refresh + buttonTime < Date.now()){
            window.location.href = "ai_art.html"
        }
        home_icon = null
        qr_code = null
        left_arrow = null
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
        refresh = null
    }
    else{
        home_icon = null
        left_arrow = null
        qr_code = null
        refresh = null
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

let catPics = [
  "https://cdn.pixabay.com/photo/2023/03/11/22/19/nature-7845443_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/03/22/20/06/bird-7870458_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/03/11/22/21/ai-generated-7845463_1280.jpg",
  "https://cdn.pixabay.com/photo/2022/09/14/13/46/woods-7454336_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/03/11/22/23/ai-generated-7845480_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/03/24/04/16/ai-generated-7873292_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/04/03/12/41/ai-generated-7896729_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/01/26/22/23/ai-generated-7747278_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/02/14/15/33/ai-generated-7789913_1280.jpg",
  "https://cdn.pixabay.com/photo/2022/09/22/00/42/mountains-7471423_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/03/11/22/20/ai-generated-7845449_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/04/20/18/37/ai-generated-7940344_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/03/11/22/19/ai-generated-7845442_1280.jpg",
  "https://cdn.pixabay.com/photo/2022/09/14/20/26/city-7455209_1280.jpg",
]

let picture; let cover;

function preload() {
  picture = createImg(catPics[Math.floor(Math.random()*catPics.length)])
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
