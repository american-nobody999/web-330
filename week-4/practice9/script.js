"use strict";

// Practice 9 — Little Number Sliding Puzzle
const solvedBoard = [1, 2, 3, 4, 5, 6, 7, 8, 0];
const puzzleBoard = document.getElementById("puzzleBoard");
const movesDisplay = document.getElementById("puzzleMoves");
const message = document.getElementById("puzzleMessage");
let board = [...solvedBoard];
let moves = 0;

function isSolved() {
    return board.every((number, index) => number === solvedBoard[index]);
}

function isAdjacent(first, second) {
    const firstRow = Math.floor(first / 3);
    const firstCol = first % 3;
    const secondRow = Math.floor(second / 3);
    const secondCol = second % 3;
    // Exactly one row OR column apart: no diagonals and no row wrapping.
    return Math.abs(firstRow - secondRow) + Math.abs(firstCol - secondCol) === 1;
}

function swapTiles(first, second) {
    const temporary = board[first];
    board[first] = board[second];
    board[second] = temporary;
}

function renderBoard(focusNumber = null) {
    puzzleBoard.replaceChildren();
    board.forEach((number, index) => {
        const row = Math.floor(index / 3) + 1;
        const col = index % 3 + 1;
        if (number === 0) {
            const space = document.createElement("div");
            space.className = "empty-space";
            space.textContent = "Empty";
            space.setAttribute("aria-label", `Empty space, row ${row}, column ${col}`);
            puzzleBoard.appendChild(space);
            return;
        }
        const tile = document.createElement("button");
        tile.type = "button";
        tile.className = "tile";
        tile.dataset.number = number;
        tile.textContent = number;
        tile.setAttribute("aria-label", `Number ${number}, row ${row}, column ${col}`);
        tile.addEventListener("click", () => moveTile(index));
        puzzleBoard.appendChild(tile);
    });
    movesDisplay.textContent = moves;
    // Re-rendering replaces buttons; restore focus to the tile the player just moved.
    if (focusNumber !== null) puzzleBoard.querySelector(`[data-number="${focusNumber}"]`).focus();
}

function moveTile(index) {
    if (isSolved()) return;
    const emptyIndex = board.indexOf(0);
    if (!isAdjacent(index, emptyIndex)) {
        message.textContent = "Choose a number right next to the empty space!";
        return;
    }
    const number = board[index];
    swapTiles(index, emptyIndex);
    moves++;
    renderBoard(number);
    message.textContent = isSolved() ? "Hooray! You did it! 🌟" : "Keep going! Put the numbers in order.";
}

function shufflePuzzle() {
    board = [...solvedBoard];
    let previousEmpty = -1;
    // Shuffle by walking through legal moves, so the result can always be solved.
    for (let step = 0; step < 60; step++) {
        const empty = board.indexOf(0);
        const neighbors = [];
        for (let index = 0; index < board.length; index++) {
            if (isAdjacent(index, empty) && index !== previousEmpty) neighbors.push(index);
        }
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        swapTiles(empty, next);
        previousEmpty = empty;
    }
    // If the random walk returns to the goal, one more legal move makes it unsolved.
    if (isSolved()) swapTiles(8, 7);
    moves = 0;
    renderBoard();
    message.textContent = "Ready! Tap a number next to the empty space.";
}

document.getElementById("puzzleShuffle").addEventListener("click", shufflePuzzle);
shufflePuzzle();

// Activity 2 owns separate state; it never changes the sliding puzzle's board or moves.
const numberLine = document.getElementById("numberLine");
const numberTray = document.getElementById("numberTray");
const lineMessage = document.getElementById("numberLineMessage");
const lineGoal = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let linePositions = Array(9).fill(null);
let trayOrder = [];
let selectedNumber = null;
let draggedNumber = null;

function renderNumberLine(focusId = null) {
    numberLine.replaceChildren();
    linePositions.forEach((number, index) => {
        const item = document.createElement("li");
        const slot = document.createElement("button");
        slot.type = "button";
        slot.id = `line-position-${index}`;
        slot.className = "line-slot";
        slot.classList.toggle("is-empty", number === null);
        slot.textContent = number === null ? `Place ${index + 1}` : number;
        slot.setAttribute("aria-label", number === null
            ? `Empty position ${index + 1}. Place the selected number here.`
            : `Number ${number} in position ${index + 1}. Return to tray.`);
        slot.addEventListener("click", () => {
            if (number !== null) returnNumberToTray(index);
            else placeLineNumber(index, selectedNumber);
        });
        slot.addEventListener("dragover", event => {
            if (draggedNumber !== null && linePositions[index] === null) {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
            }
        });
        slot.addEventListener("drop", event => {
            event.preventDefault();
            // Only accept a current drag from this activity, not arbitrary external text.
            if (draggedNumber !== null) placeLineNumber(index, draggedNumber);
            draggedNumber = null;
        });
        item.appendChild(slot);
        numberLine.appendChild(item);
    });
    renderNumberTray();
    if (focusId) document.getElementById(focusId)?.focus();
}

function renderNumberTray() {
    numberTray.replaceChildren();
    trayOrder.filter(number => !linePositions.includes(number)).forEach(number => {
        const block = document.createElement("button");
        block.type = "button";
        block.className = "number-block";
        block.id = `tray-number-${number}`;
        block.textContent = number;
        block.draggable = true;
        block.setAttribute("aria-label", `Number ${number}. Select, then choose an empty position.`);
        block.setAttribute("aria-pressed", String(number === selectedNumber));
        block.addEventListener("click", () => {
            selectedNumber = selectedNumber === number ? null : number;
            numberTray.querySelectorAll("button").forEach(button => {
                button.setAttribute("aria-pressed", String(button.id === `tray-number-${selectedNumber}`));
            });
            lineMessage.textContent = selectedNumber === null ? "Pick a number to begin."
                : `Number ${number} selected. Choose an empty position!`;
        });
        block.addEventListener("dragstart", event => {
            draggedNumber = number;
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", String(number));
        });
        block.addEventListener("dragend", () => { draggedNumber = null; });
        numberTray.appendChild(block);
    });
    if (!numberTray.children.length) {
        const note = document.createElement("p");
        note.textContent = "All blocks placed! Select any placed number to return it here.";
        numberTray.appendChild(note);
    }
}

function placeLineNumber(index, number) {
    if (number === null) {
        lineMessage.textContent = "First pick a number from the tray, then choose an empty position.";
        return;
    }
    if (!lineGoal.includes(number) || linePositions.includes(number) || linePositions[index] !== null) return;
    linePositions[index] = number;
    selectedNumber = null;
    draggedNumber = null;
    renderNumberLine(`line-position-${index}`);
    const complete = linePositions.every((value, position) => value === lineGoal[position]);
    lineMessage.textContent = complete ? "Hooray! You put all the numbers in order! 🌟"
        : linePositions.every(value => value !== null)
            ? "All blocks are placed! Want to change the order? Select a placed number to return it to the tray."
            : "Keep building your number line!";
}

function returnNumberToTray(index) {
    const number = linePositions[index];
    if (number === null) return;
    linePositions[index] = null;
    selectedNumber = null;
    draggedNumber = null;
    renderNumberLine(`tray-number-${number}`);
    lineMessage.textContent = `Number ${number} is back in the tray. Pick a number and try another position!`;
}

function resetNumberLine() {
    linePositions = Array(9).fill(null);
    selectedNumber = null;
    draggedNumber = null;
    trayOrder = [...lineGoal];
    // Fisher–Yates changes tray order without changing the ordered destination positions.
    for (let i = trayOrder.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [trayOrder[i], trayOrder[randomIndex]] = [trayOrder[randomIndex], trayOrder[i]];
    }
    renderNumberLine();
    lineMessage.textContent = "Pick a number and put it in order from 1 to 9!";
}

document.getElementById("numberLineReset").addEventListener("click", resetNumberLine);
resetNumberLine();
