console.log("Up and running");
//Load library in variable
let express = require("express");
//result of running the library?
let app = express();

let port = 3000;

let server = app.listen(port)

console.log("Server is running on http://localhost:"+port)
//Where to get server files from?
app.use(express.static("public"))
