let clientSocket = io();
clientSocket.on("connect",newConnection)
clientSocket.on("facialBroadcast", newBroadcast)
//clientSocket.on("mouseBroadcast", newBroadcast)

let webcam
let tracker
let features



function newConnection(){
  console.log(clientSocket.id)
}

function newBroadcast(data){
  //background(0)
  background(0)
  fill("blue")
  incoming_features = data.features_data
  for (var ii = 0; ii < incoming_features.length; ii++) {
    inc_current_feature = incoming_features[ii]
    console.log(inc_current_feature[0])
    square(inc_current_feature[0],inc_current_feature[1],10)
  }
  //fill("red")
  //circle(data.x,data.y,10)
}

function setup(){
  createCanvas(640,480)
  background(0)
  webcam = createCapture(VIDEO)
  webcam.size(width,height)
  webcam.hide()

  tracker = new clm.tracker()
  tracker.init()
  tracker.start(webcam.elt)
}

function draw(){
  //fill("blue")
  //circle(mouseX,mouseY,20)
  //background(0)
  fill('red')
  features = tracker.getCurrentPosition()
  if (features.length>0){
  for (var ii = 0; ii < features.length; ii++) {
    current_feature = features[ii]
    ellipse(current_feature[0],current_feature[1],5)
  }
  let facial_data = {
    features_data: features,
  }
  clientSocket.emit("facial_data",facial_data)
}
}

//function mouseMoved(){
//  let message = {
//    x: mouseX,
//    y: mouseY,
//  };
//  clientSocket.emit("mouse", message)
//}
