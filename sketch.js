
var socket = new WebSocket("ws://127.0.0.1:4444/frames")

last_pos = [500,500]

socket.onmessage = (event) => {
  let data = JSON.parse(event.data)
  if (data.people.length > 0){
    console.log("Person!")

    x = -data.people[0].joints[15].position.x+500
    y = data.people[0].joints[15].position.y
    console.log(x)
    console.log(y)

    stroke(255);
    line(last_pos[0], last_pos[1], x, y);

    last_pos = [x,y]
  }
}

function setup() {
  createCanvas(1920, 1080);
  background(102);
}

function draw() {
  stroke(255);
  if (mouseIsPressed === true) {
    line(mouseX, mouseY, pmouseX, pmouseY);
    console.log(mouseY)
    console.log(pmouseY)
  }
}

