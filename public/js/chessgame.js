const socket = io();
//sent to backend
socket.emit("masala");
socket.on("churan papdi", function() {
    //received from backend
    console.log("Churan papdi received");
});