console.log("Up and running");
//Load library in variable: can provide files as server
let express = require("express");
//activate express
let app = express();
//define the port you want to use (PORT is wat Heroku maakt)
//Now it can work both online and locally
let port = process.env.PORT || 3000;
//create variable and tell express to listen there
//so localhost is simulated
let server = app.listen(port)

console.log("Server is running on http://localhost:"+port)
//Where to get server files from?
app.use(express.static("public"))

//load the socket.io library
let serverSocket = require("socket.io")
//this object has to handle in and outcoming messages
let io = serverSocket(server)
//start to tell node what to do
io.on("connection", newConnection)

function newConnection(newSocket){
  console.log(newSocket.id)

  //newSocket.on("mouse",mouseMessage)
  newSocket.on("facial_data",facialMessage)

  function facialMessage(dataReceived){
//send to all the clients
    newSocket.broadcast.emit("facialBroadcast",dataReceived)
  }

  //function mouseMessage(dataReceived){
//send to all the clients
    //newSocket.broadcast.emit("mouseBroadcast",dataReceived)
  //}
}
