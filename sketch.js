
// "ws://cpsc484-01.yale.internal:8888/frames" (live) or "ws://127.0.0.1:4444/frames" (recorded)
var socket = new WebSocket("ws://127.0.0.1:4444/frames") 

last_x = 500; last_y = 500 // track last position

socket.onmessage = (event) => {
  let data = JSON.parse(event.data) // get web socket stream
  if (data.people.length > 0){ // found a person

  }
}



function setup() {
      
  // Create Canvas of size 600*600
  createCanvas(1500, 700, WEBGL);
}
 
function draw() {
    
  // Set background color
  background(200);
   
  // Set fill color of box
  fill('green');
   
  square(-500, -150, 300);

  fill('purple');
  square(50, -150, 300);
}
