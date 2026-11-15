"use strict";

// WEB 330 | Week 4 | Practice 6 — Circus Memory Match
const performers = [
    { id: "clown", name: "Clown", symbol: "🤡" },
    { id: "big-top", name: "Big Top", symbol: "🎪" },
    { id: "ticket", name: "Ticket", symbol: "🎟️" },
    { id: "juggling", name: "Juggling", symbol: "🤹" },
    { id: "magic", name: "Magic", symbol: "🎩" },
    { id: "star", name: "Star", symbol: "⭐" },
    { id: "music", name: "Music", symbol: "🎵" },
    { id: "balloon", name: "Balloon", symbol: "🎈" }
];

const board = document.getElementById("memoryBoard");
const matchesDisplay = document.getElementById("matches");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const message = document.getElementById("gameMessage");
const victoryPanel = document.getElementById("victoryPanel");
const finalScore = document.getElementById("finalScore");
let firstCard = null;
let secondCard = null;
let matches = 0;
let moves = 0;
let playing = false;
let boardLocked = false;
let startedAt = 0;
let timerInterval = null;
let flipTimeout = null;

// Fisher–Yates swaps each entry with a random entry from the remaining range.
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]];
    }
    return deck;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function updateTimer() {
    // Derive elapsed time from the clock, rather than counting interval callbacks.
    const seconds = Math.floor((performance.now() - startedAt) / 1000);
    timerDisplay.textContent = formatTime(seconds);
    return formatTime(seconds);
}

function updateScoreboard() {
    matchesDisplay.textContent = `${matches} / ${performers.length}`;
    movesDisplay.textContent = moves;
}

function createCard(performer, index) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "memory-card";
    card.dataset.performer = performer.id;
    card.dataset.name = performer.name;
    card.dataset.position = index + 1;
    card.setAttribute("aria-label", `Card ${index + 1}, face down`);
    card.setAttribute("aria-pressed", "false");

    const inner = document.createElement("span");
    inner.className = "card-inner";
    // Hide visual faces from assistive technology; the button label tracks its state.
    inner.setAttribute("aria-hidden", "true");
    const front = document.createElement("span");
    front.className = "card-front";
    front.textContent = "✦";
    const back = document.createElement("span");
    back.className = "card-back";
    const symbol = document.createElement("span");
    symbol.className = "card-symbol";
    symbol.textContent = performer.symbol;
    const name = document.createElement("span");
    name.className = "card-name";
    name.textContent = performer.name;
    back.append(symbol, name);
    inner.append(front, back);
    card.appendChild(inner);
    card.addEventListener("click", () => selectCard(card));
    return card;
}

function flipCard(card, revealed) {
    card.classList.toggle("is-flipped", revealed);
    card.setAttribute("aria-pressed", String(revealed));
    card.setAttribute("aria-label", `Card ${card.dataset.position}, ${revealed ? card.dataset.name : "face down"}`);
}

function clearSelection() {
    firstCard = null;
    secondCard = null;
    boardLocked = false;
}

function selectCard(card) {
    if (!playing || boardLocked || card === firstCard || card.disabled) return;
    flipCard(card, true);
    if (!firstCard) {
        firstCard = card;
        message.textContent = "One performer revealed! Find their partner!";
        return;
    }
    secondCard = card;
    moves++;
    if (firstCard.dataset.performer === secondCard.dataset.performer) {
        const name = firstCard.dataset.name;
        [firstCard, secondCard].forEach(matchedCard => {
            matchedCard.classList.add("is-matched");
            matchedCard.disabled = true;
            matchedCard.setAttribute("aria-label", `Card ${matchedCard.dataset.position}, ${name}, matched`);
        });
        matches++;
        message.textContent = `Perfect match! ${name}! The crowd goes wild!`;
        clearSelection();
        updateScoreboard();
        if (matches === performers.length) finishGame();
    } else {
        boardLocked = true;
        message.textContent = "Not a match! Remember those performers!";
        updateScoreboard();
        flipTimeout = setTimeout(() => {
            flipCard(firstCard, false);
            flipCard(secondCard, false);
            clearSelection();
            flipTimeout = null;
            message.textContent = "Back to the big top! Choose another pair.";
        }, 900);
    }
}

function finishGame() {
    playing = false;
    boardLocked = true;
    clearInterval(timerInterval);
    timerInterval = null;
    const elapsed = updateTimer();
    finalScore.textContent = `All eight pairs found in ${moves} moves. Elapsed time: ${elapsed}.`;
    victoryPanel.hidden = false;
    message.textContent = "A standing ovation for our memory champion!";
    document.getElementById("playAgainBtn").focus();
}

function startGame() {
    // Cancel old callbacks before replacing the board or resetting selected cards.
    clearInterval(timerInterval);
    clearTimeout(flipTimeout);
    timerInterval = null;
    flipTimeout = null;
    clearSelection();
    matches = 0;
    moves = 0;
    playing = true;
    victoryPanel.hidden = true;
    finalScore.textContent = "";
    timerDisplay.textContent = "00:00";
    updateScoreboard();
    board.replaceChildren();
    const deck = shuffleDeck([...performers, ...performers]);
    deck.forEach((performer, index) => board.appendChild(createCard(performer, index)));
    startedAt = performance.now();
    timerInterval = setInterval(updateTimer, 1000);
    message.textContent = "The show has begun! Find all eight pairs!";
    board.querySelector("button").focus();
}

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("restartBtn").addEventListener("click", startGame);
document.getElementById("playAgainBtn").addEventListener("click", startGame);

// Wait for a start control before creating a playable deck or running the timer.
updateScoreboard();
timerDisplay.textContent = "00:00";
victoryPanel.hidden = true;
message.textContent = "The performers are waiting backstage!";
