

// "ws://cpsc484-01.yale.internal:8888/frames" (live) or "ws://127.0.0.1:4444/frames" (recorded)
// var socket = new WebSocket("ws://127.0.0.1:4444/frames") 
var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames");

last_x = 500; last_y = 500 // track last position

socket.onmessage = (event) => {
  let data = JSON.parse(event.data) // get web socket stream

  if (data.people.length > 0){ // found a person

    if (data.people[0].joints[0].position.x < 100) { //100 halfway for pelvis (ie if on the left half of screen switch to newScreen state, right for main state)
      currentState = 'newScreen';
    } else {
      currentState = 'main';
    }

    newState();
  }
}

function setup() {
  createCanvas(1200, 900);
  noStroke();
  fill(244, 244, 232);
  textSize(32);
  fill(0);
  textAlign(CENTER, CENTER);
  // Add text to the main screen
  text("START SCREEN", width / 2, height / 2);
}

function newState() {
  if (currentState === 'main') {
    background(244, 244, 232);
    // Set text properties for the main screen
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    // Add text to the main screen
    text("Main Screen", width / 2, height / 2);
  } else if (currentState === 'newScreen') {
    background(200, 50, 50);
    // Set text properties for the new screen
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    // Add text to the new screen
    text("New Screen", width / 2, height / 2);
  }
}