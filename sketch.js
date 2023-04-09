
// "ws://cpsc484-01.yale.internal:8888/frames" (live) or "ws://127.0.0.1:4444/frames" (recorded)
var socket = new WebSocket("ws://127.0.0.1:4444/frames") 

last_pos = [500,500] // start centered

socket.onmessage = (event) => {
  let data = JSON.parse(event.data) // get web socket stream
  if (data.people.length > 0){ // found a person

    // get right hand position (and normalize it!)
    x = -data.people[0].joints[15].position.x+600
    y = data.people[0].joints[15].position.y+300
    console.log("("+Math.floor(x)+","+Math.floor(y)+")")

    // draw line
    stroke(255);
    line(last_pos[0], last_pos[1], x, y);

    last_pos = [x,y]
  }
}

// initial blank canvas
function setup() {
  createCanvas(1200, 900);
  background(102);
}
