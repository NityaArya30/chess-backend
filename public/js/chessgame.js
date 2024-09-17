const socket = io();
//sent to backend
// socket.emit("masala");
// socket.on("churan papdi", function() {
//     //received from backend
//     console.log("Churan papdi received");
//});
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");
let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = ()=> {
    const board = chess.board();
    boardElement.innerHTML = "";
    //console.log(board);
    board.forEach((row, rowindex) => {
        //console.log(row);
        row.forEach((square, squareindex) => {
            //console.log(square);
            const squareElement = document.createElement("div");
            //check box bnane k liye light aur dark
            squareElement.classList.add("square", 
                (rowindex+ squareindex)%2 === 0 ? "light" : "dark"
            );
            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            //checkbox p element h ya ni
            if(square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece", 
                    square.color === 'w' ? "white" : "black"
                );
                pieceElement.innerText = "";
                pieceElement.draggable = playerRole === square.color;
                pieceElement.addEventListener("dragstart", () => {
                    if(pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = {row: rowindex, col: squareindex};
                    }
                });
            }
        });
    });
}

const handleMove = () => {

}

const getPieceUnicode = () => {

}

renderBoard();