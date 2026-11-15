// Practice 7: Professor David's compact conversion exhibit. 
// author: Leslie  Brockman

"use strict";
// WEB 330 | Week 4 | Practice 7
// Uncle Tito's Juggling Chaos
const stage = document.getElementById("juggleStage");
const scoreDisplay = document.getElementById("juggleScore");
const livesDisplay = document.getElementById("juggleLives");
const message = document.getElementById("juggleMessage");
const startBtn = document.getElementById("juggleStart");
const stopBtn = document.getElementById("juggleStop");
const objects = ["🎾", "⚽", "🍎", "🎈", "⭐", "🤹"];
const activeObjects = new Set();
let score = 0;
let lives = 3;
let running = false;
let spawnTimer = null;
let animationId = null;
let lastFrame = 0;
function updateScore() {
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
}
function clearObjects() {
    activeObjects.forEach(item => item.element.remove());
    activeObjects.clear();
}
function stopJuggling() {
    running = false;
    clearInterval(spawnTimer);
    cancelAnimationFrame(animationId);
    spawnTimer = null;
    animationId = null;
    lastFrame = 0;
    clearObjects();
}
function endGame() {
    stopJuggling();
    message.textContent = `Show over! Uncle Tito caught ${score} objects!`;
}
function catchObject(item) {
    if (!running || !activeObjects.has(item)) return;
    activeObjects.delete(item);
    item.element.remove();
    score++;
    updateScore();
    message.textContent = "Nice catch! Uncle Tito approves!";
}
function missObject(item) {
    activeObjects.delete(item);
    item.element.remove();
    lives--;
    updateScore();
    message.textContent = "Oops! Uncle Tito dropped one!";
    if (lives <= 0) endGame();
}
function createObject() {
    if (!running) return;
    const element = document.createElement("button");
    element.type = "button";
    element.className = "juggle-object";
    element.textContent = objects[Math.floor(Math.random() * objects.length)];
    element.setAttribute("aria-label", "Catch juggling object");
    const item = {
        element,
        x: 0,
        y: -65,
        speed: Math.min(240, 95 + score * 4)
    };
    const availableWidth = Math.max(0, stage.clientWidth - 75);
    item.x = Math.random() * availableWidth;
    element.style.left = `${item.x}px`;
    element.style.top = `${item.y}px`;
    element.addEventListener("click", () => catchObject(item));
    activeObjects.add(item);
    stage.appendChild(element);
}
function animate(timestamp) {
    if (!running) return;
    const elapsed = lastFrame ? Math.min((timestamp - lastFrame) / 1000, 0.05) : 0;
    lastFrame = timestamp;
    for (const item of [...activeObjects]) {
        item.y += item.speed * elapsed;
        item.element.style.top = `${item.y}px`;
        if (item.y >= stage.clientHeight - 95) {
            missObject(item);
            if (!running) return;
        }
    }
    animationId = requestAnimationFrame(animate);
}
function startJuggling() {
    stopJuggling();
    score = 0;
    lives = 3;
    running = true;
    updateScore();
    message.textContent = "The show has begun! Catch those objects!";
    createObject();
    spawnTimer = setInterval(createObject, 1100);
    animationId = requestAnimationFrame(animate);
}
startBtn.addEventListener("click", startJuggling);
stopBtn.addEventListener("click", () => {
    stopJuggling();
    message.textContent = `Show stopped. Final score: ${score}`;
});
