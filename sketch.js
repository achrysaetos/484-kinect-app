
// "ws://cpsc484-01.yale.internal:8888/frames" (live) or "ws://127.0.0.1:4444/frames" (recorded)
var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames")

last_x = 600; last_y = 450 // track last position (initially centered)

socket.onmessage = (event) => {
  let data = JSON.parse(event.data) // get web socket stream
  if (data.people.length > 0){ // found a person

    // get right hand position (and normalize it)
    x = -data.people[0].joints[15].position.x+600
    y = data.people[0].joints[15].position.y+300
    console.log("("+Math.floor(x)+","+Math.floor(y)+")")

    // track hand and chest (start drawing when hand above chest)
    hand_pos = data.people[0].joints[15].position.y
    chest_pos = data.people[0].joints[2].position.y

    if (hand_pos < chest_pos){
      draw(last_x, last_y, x, y)
    }

    last_x = x; last_y = y // update last position
  }
}


/* p5.js functions */

let picture; let cover;

function preload() {
  picture = createImg("https://admissions.yale.edu/sites/default/files/styles/main-carousel-image--1280x850/public/home-main-carousel-images/crosscampus2019.png?itok=QJDBkwgU")
  picture.hide()
}

function setup() {
  createCanvas(1200, 900)
  cover = createGraphics(width, height)

  cover.background(100)
  cover.textSize(48)
  cover.textAlign(CENTER)
  cover.text("SCRATCH ME", width/2, height/2) // or info about pic, etc

  cover.imageMode(CENTER)
  cover.strokeWeight(100) // make user selectable?
  cover.blendMode(REMOVE)
}

function draw(x1, y1, x2,y2) {
  image(picture, 0, 0, width, height)
  cover.line(x1, y1, x2, y2)
  image(cover, 0, 0)
}