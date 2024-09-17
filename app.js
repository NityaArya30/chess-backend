const express = require("express");
const socket = require("socket.io");
const http = require("http");
const path = require("path");
const {Chess} = require("chess.js");
const { title } = require("process");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {};
let currentPlayer = "w";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", {title: "Chess Game"} );
});

io.on("connection", function(uniquesocket) {
    console.log("connected");

    // //receiving on backend
    // uniquesocket.on("masala", function() {
    //     console.log("masala received");
    //     //sending to frontend chessgame.js
    //     io.emit("churan papdi");
    // })

    // uniquesocket.on("disconnected", function() {
    //     console.log("disconnected"); 
    // });

    if(!players.white) {
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole", "w");
    } else if(!players.black){
        players.black = uniquesocket.id;
        uniquesocket.emit("playersRole", "b");
    } else {
        uniquesocket.emit("spectatorRole");
    }

    //game chdkr gaya
    uniquesocket.on("disconnect", function() {
        if(uniquesocket.id === players.white) {
            delete players.white;
        }else if(uniquesocket.id === players.black) {
            delete players.black;
        }
    });
    uniquesocket.on("move", (move) => {
        try{
            //black ki turn h to white chalega to return krna aur vice versa
            if(chess.turn()==='w' && uniquesocket.id !== players.white) return; 
            if(chess.turn()==='b' && uniquesocket.id !== players.black) return; 

            const result = chess.move(move);
            if(result) {
                currentPlayer = chess.turn();
                //sbko bhj rhe hein jo move hua hai
                io.emit("move", move);
                //fen board ki current state deta hai
                io.emit("boardState", chess.fen())
            } else {
                console.log("Invalid Move : ", move);
                uniquesocket.emit("invalid move : ", move);
            }
        } catch(err) {
            console.log(err);
            uniquesocket.emit("Invalide move : ", move);
        }
    })
});


server.listen(3000, function () {
    console.log("listening on port 3000");
});