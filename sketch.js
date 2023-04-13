
// "ws://cpsc484-01.yale.internal:8888/frames" (live) or "ws://127.0.0.1:4444/frames" (recorded)
var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames")

last_x = 600; last_y = 450 // track last position (initially centered)

let state = "start"
let picture;
let cover;
let hoverStartTime = null;
const hoverDuration = 3000; //3 seconds

function circleHovered(x, y, cx, cy, r) {
  return dist(x, y, cx, cy) < r;
}

socket.onmessage = (event) => {
  let data = JSON.parse(event.data) // get web socket stream
  if (data.people.length > 0) { // found a person
    let person = data.people[0];
    let hand_x = -person.joints[15].position.x + 600;
    let hand_y = person.joints[15].position.y + 300;


    let circle_x = width - 100;
    let circle_y = 100;
    let circle_r = 50;

    if (circleHovered(hand_x, hand_y, circle_x, circle_y, circle_r)) {
      if (hoverStartTime === null) {
        hoverStartTime = millis();
      }

      if (millis() - hoverStartTime >= hoverDuration) {
        if (state === "start") {
          state = "play";
        } else if (state === "play") {
          state = "start";
          resetCover();
        }
        hoverStartTime = null;
      }
    } else {
      hoverStartTime = null;
    }

    console.log("("+Math.floor(x)+","+Math.floor(y)+")")

    if (state === "play") {
      // track hand and chest (start drawing when hand above chest)
      hand_pos = data.people[0].joints[15].position.y
      chest_pos = data.people[0].joints[2].position.y

      if (hand_pos < chest_pos){
        draw(last_x, last_y, hand_x, hand_y)
      }

      last_x = hand_x; last_y = hand_y // update last position
    }
  }
}


/* p5.js functions */
function resetCover() {
  cover.background(100);
  cover.textSize(48);
  cover.textAlign(CENTER);
  cover.text("SCRATCH ME", width / 2, height / 2);
  cover.strokeWeight(100);
  cover.blendMode(REMOVE);
}

function preload() {
  picture = createImg("https://admissions.yale.edu/sites/default/files/styles/main-carousel-image--1280x850/public/home-main-carousel-images/crosscampus2019.png?itok=QJDBkwgU")
  picture.hide()
}

function setup() {
  createCanvas(1200, 900)
  cover = createGraphics(width, height)
  resetCover();
}

function draw(x1, y1, x2, y2) {
  if (state === "start") {
    background(100);
    textSize(48);
    textAlign(CENTER);
    text("Hover over the circle to play", width / 2, height / 2);
  } else if (state === "play") {
    image(picture, 0, 0, width, height);
    cover.line(x1, y1, x2, y2);
    image(cover, 0, 0);
  }

  let circle_x = width - 100;
  let circle_y = 100;
  let circle_r = 50;

  fill(255, 0, 0);
  ellipse(circle_x, circle_y, circle_r * 2);
}