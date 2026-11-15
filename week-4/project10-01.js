"use strict";
/*    JavaScript 7th Edition
      Chapter 10
      Project 10-01

      Project to create a drag and drop jigsaw puzzle
      Author: Leslie Brockman
      Date: 11-14-2026  

      Filename: project10-01.js
*/

// Reference to the puzzle board
let puzzleBoard = document.getElementById("puzzleBoard");
// Counter for the zIndex style of each puzzle piece
let zCounter = 1;
// Array of integers from 1 to 48
let intList = new Array(48);
// pointerX and pointerY will contain the initial coordinates of the pointerX
// pieceX and pieceY will contain the initial coordinates of a puzzle piece
let pointerX, pointerY, pieceX, pieceY;

// Sort the integers from 1 to 48 in random order
for (let i = 0; i < 48 ; i++) {
   intList[i] = i+1;
}
intList.sort(function() {
   return 0.5 - Math.random();
});

// generate randomly-sorted puzzle pieces
for (let i = 0; i < 48; i++) {
   let piece = document.createElement("img");
   piece.src = "piece" + intList[i] + ".png";
   let rowNum = Math.ceil((i+1)/8);
   let colNum = (i + 1) - (rowNum - 1)*8;
   piece.style.top = (rowNum - 1)*98 + 7 + "px";
   piece.style.left = (colNum - 1)*98 + 7 + "px";
   piece.draggable = false; // override the default draggability of images
   puzzleBoard.appendChild(piece);      
}

// Node list representing the puzzle pieces
let pieces = document.querySelectorAll("div#puzzleBoard img");

for (let i = 0; i < pieces.length; i++) {
   pieces[i].style.touchAction = "none";
   pieces[i].addEventListener("pointerdown", grabPiece);
}

function grabPiece(event) {
   pointerX = event.clientX;
   pointerY = event.clientY;
   event.target.style.touchAction = "none";
   zCounter++;
   event.target.style.zIndex = zCounter;
   pieceX = event.target.offsetLeft;
   pieceY = event.target.offsetTop;
   event.target.setPointerCapture(event.pointerId);
   event.target.addEventListener("pointermove", movePiece);
   event.target.addEventListener("pointerup", dropPiece);
   event.target.addEventListener("pointercancel", dropPiece);
}

function movePiece(event) {
   // Add the pointer's movement to the piece's starting position.
   event.target.style.left = pieceX + (event.clientX - pointerX) + "px";
   event.target.style.top = pieceY + (event.clientY - pointerY) + "px";
}

function dropPiece(event) {
   event.target.removeEventListener("pointermove", movePiece);
   event.target.removeEventListener("pointerup", dropPiece);
   event.target.removeEventListener("pointercancel", dropPiece);
   if (event.target.hasPointerCapture(event.pointerId)) {
      event.target.releasePointerCapture(event.pointerId);
   }
}
