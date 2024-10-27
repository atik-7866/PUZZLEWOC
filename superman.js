var rows = 3;
var columns = 3;
let musics = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
var currTile;
var otherTile;

var turns = 0;
let pieces = [];
window.onload = function() {
    //initialize the 3x3 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img>
            let tile = document.createElement("img");
            tile.src = "download.png";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

            document.getElementById("board").append(tile);
        }
    }
    document.getElementById("start").addEventListener("click", startGame);

    //pieces
    
    for (let i=1; i <= rows*columns; i++) {
        pieces.push(i.toString()); //put "1" to "" into the array (puzzle images names)
    }
    pieces.reverse();
    for (let i =0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = pieces[i] + "s.jpg";

        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver);   //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one
        tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

        document.getElementById("pieces").append(tile);
    }
    document.getElementById("submit").addEventListener("click", submitPuzzle);
}

//DRAG TILES
function dragStart() {
    currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to image that is being dropped on
    audioTurn.play()
}



function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }

    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;

    
}


// timer mechanism

var timer;
var seconds = 0;


function startGame() {
    musics.play()
    resetBoard();
    
    startTimer();

 }
function startTimer() {
    timer = setInterval(function() {
        seconds++;
        updateTimerDisplay();
    }, 1000);
}
function stopTimer() {
    
    clearInterval(timer);
}
function resetBoard() {
    

    turns = 0;
    document.getElementById("turns").innerText = turns;

    // Reset the timer
    stopTimer();
    
    seconds = 0;
    updateTimerDisplay();

    
}
var timerDisplay;
function updateTimerDisplay() {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    // You can customize the display format as needed
     timerDisplay = minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

    document.getElementById("timer").innerText = timerDisplay;
}

let bestTime = localStorage.getItem('bestTime') || "1:00";

function submitPuzzle() {
    stopTimer();
    
    if (checkPuzzle()) {
        document.getElementById('best-time').innerText = timerDisplay;
        if (seconds < bestTime) {
            alert("Congratulations! New best time: " + timerDisplay);
            bestTime = seconds;
            localStorage.setItem('bestTime', bestTime);  
            
        } else {
            alert("Congratulations! Puzzle solved in " + seconds + " seconds.");  
        }
     } else {
        alert("Puzzle is not correct. Please try again.");
        window.location.reload();
      }
    

}

function checkPuzzle() {
    
    let boardTiles = document.getElementById("board").getElementsByTagName("img");
    
    for (let i = 0; i < boardTiles.length; i++) {
        let correctOrder = "file:///C:/Users/HP/Documents/delta/project/puzzle/"+(9-i) + "s.jpg";
        
        if (boardTiles[i].src !== correctOrder) {
          
            return false;
        }
    }


    return true;
    
}
