
// "ws://cpsc484-01.yale.internal:8888/frames" (live) or "ws://127.0.0.1:4444/frames" (recorded)
var socket = new WebSocket("ws://127.0.0.1:4444/frames") 

last_x = 500; last_y = 500 // track last position

socket.onmessage = (event) => {
  let data = JSON.parse(event.data) // get web socket stream
  if (data.people.length > 0){ // found a person

    // get right hand position (and normalize it)
    x = -data.people[0].joints[15].position.x+600
    y = data.people[0].joints[15].position.y+300
    console.log("("+Math.floor(x)+","+Math.floor(y)+")")

    // keep track of open/closed hands
    drawing = true // data.people[0].joints[16].position.y-data.people[0].joints[17].position.y < 0
    erasing = false // data.people[0].joints[16].position.y-data.people[0].joints[17].position.y > 0

    if (drawing){
      for(let i=1; i<100; i++){
        draw(last_x+i/100*(x-last_x), last_y+i/100*(y-last_y))
      }
    } else if (erasing){
      for(let i=1; i<100; i++){
        erase(last_x+i/100*(x-last_x), last_y+i/100*(y-last_y))
      }
    } else if (moving){
      console.log("Moving...") // invisible, no need to implement
    }

    last_x = x; last_y = y // update last position
  }
}

// initial blank canvas
function setup() {
  createCanvas(1200, 900);
  background(244, 244, 232);
  noStroke();
  fill(244, 244, 232);
}

function draw(x, y) {
  fill(52, 165, 111);
  ellipse(x, y, 30, 30);
}

function erase(x, y) {
  fill(244, 244, 232);
  ellipse(x, y, 60, 60);
}