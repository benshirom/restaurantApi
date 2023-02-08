const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const { config } = require("./api/config/secret");

// דואג שהאפליקציה תכיר את הקובץ אינוורמינט שמכיל 
// משתנים סודיים והגדרות של השרת
const {Server} = require("socket.io")
const {sockets} = require( "./api/routes/socket");

const {routesInit} = require("./api/routes/config_routes")
require("./api/db/mongoconnect");

const app = express();

// נותן גישה לכל הדומיינים לגשת לשרת שלנו
app.use(cors({
    origin : [ "http://localhost:3000",config.ReactUrl],
    credentials: true,
}));
// כדי שנוכל לקבל באדי
app.use(express.json());
// הגדרת תקיית הפאבליק כתקייה ראשית
app.use(express.static(path.join(__dirname,"public")))

routesInit(app);

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin : [ "http://localhost:3000",config.ReactUrl,"http://localhost:3001"]
    }
})

app.get("/" , (req,res)=> {
    console.log("socket")
    res.json("Socket ready")
  })
// console.log("env",process.env.TEST, process.env.USER_DB)

let port = process.env.PORT 
server.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
});
io.on('connection', sockets)
