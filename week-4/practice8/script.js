//Clown says game logic
//Author: Leslie Brockman

"use strict";
// WEB 330 | Week 4 | Practice 8 | Clown Says
const instructions = [
    { action: "jump", label: "Jump" },
    { action: "wave", label: "Wave" },
    { action: "spin", label: "Spin" },
    { action: "clap", label: "Clap" }
];
const instructionDisplay = document.getElementById("clownInstruction");
const message = document.getElementById("clownMessage");
const scoreDisplay = document.getElementById("clownScore");
const roundDisplay = document.getElementById("clownRound");
const actionPanel = document.getElementById("clownActions");
const clownFace = document.getElementById("clownFace");
const timerFill = document.getElementById("clownTimer");
const victoryPanel = document.getElementById("clownVictory");
const finalScore = document.getElementById("clownFinalScore");
const ROUND_DURATION = 2800;
// Level progression and separate earned routines; saved after milestones.
const progression = {
    currentLevel: 1,
    completedLevels: [],
    earnedRoutines: { level1: [], level2: [], level3: [] },
    danceStudioUnlocked: false
};
const levelTickets = document.querySelectorAll(".level-ticket");
const levelSections = { 1: "level1", 2: "level2", 3: "level3", studio: "danceStudio" };

function isLevelUnlocked(level) {
    if (level === "studio") return progression.danceStudioUnlocked;
    return level === 1 || progression.completedLevels.includes(level - 1);
}

function updateProgression() {
    levelTickets.forEach(ticket => {
        const level = ticket.dataset.level === "studio" ? "studio" : Number(ticket.dataset.level);
        const current = progression.currentLevel === level;
        const complete = progression.completedLevels.includes(level);
        ticket.disabled = !isLevelUnlocked(level);
        ticket.classList.toggle("is-completed", complete);
        if (current) ticket.setAttribute("aria-current", "step");
        else ticket.removeAttribute("aria-current");
        ticket.querySelector(".ticket-status").textContent = ticket.disabled ? "Locked"
            : current ? (complete ? "Current · Completed" : "Current")
            : complete ? "Completed" : "Available";
    });
}

function showLevel(level) {
    if (!Object.hasOwn(levelSections, level) || !isLevelUnlocked(level)) return;
    if (progression.currentLevel === "studio" && level !== "studio") stopPlayback();
    if (progression.currentLevel === 2 && level !== 2) pauseRoutine();
    if (progression.currentLevel === 3 && level !== 3) pauseChallenge();
    if (progression.currentLevel === 1 && level !== 1) {
        clearGameTimers();
        playing = false;
        acceptingInput = false;
    }
    progression.currentLevel = level;
    Object.entries(levelSections).forEach(([key, id]) => {
        document.getElementById(id).hidden = key !== String(level);
    });
    updateProgression();
    if (level === "studio") renderStudio();
}
let score = 0;
let round = 0;
let currentAction = null;
let clownSays = false;
let playing = false;
let acceptingInput = false;
let roundTimer = null;
let feedbackTimer = null;
let animationId = null;
let roundStartedAt = 0;
let successfulActions = [];
function clearGameTimers() {
    clearTimeout(roundTimer);
    clearTimeout(feedbackTimer);
    cancelAnimationFrame(animationId);
    roundTimer = null;
    feedbackTimer = null;
    animationId = null;
}
function updateCountdown(timestamp) {
    if (!playing || !acceptingInput) return;
    const elapsed = timestamp - roundStartedAt;
    const remaining = Math.max(0, 1 - elapsed / ROUND_DURATION);
    timerFill.style.width = `${remaining * 100}%`;
    animationId = requestAnimationFrame(updateCountdown);
}
function finishGame() {
    clearGameTimers();
    playing = false;
    acceptingInput = false;
    instructionDisplay.textContent = "The show is over!";
    message.textContent = "The clown has finished his tricks!";
    finalScore.textContent = `You scored ${score} out of 10 points!`;
    victoryPanel.hidden = false;
    const routine = [];
    if (successfulActions.length) {
        for (let i = 0; i < 4; i++) routine.push(successfulActions[i % successfulActions.length]);
        progression.earnedRoutines.level1 = routine;
    }
    document.getElementById("level1Reward").textContent = routine.length
        ? `🎉 Four-move routine earned: ${routine.join(" → ")}! Level 2 is unlocked.`
        : "🎉 Ten rounds complete! Level 2 is unlocked. Replay to earn a routine by performing a correct action.";
    // Correctly doing nothing still earns a point, but does not invent a dance move.
    if (!progression.completedLevels.includes(1)) progression.completedLevels.push(1);
    updateProgression();
    saveProgress();
}
function showFeedback(correct, text) {
    acceptingInput = false;
    clearTimeout(roundTimer);
    cancelAnimationFrame(animationId);
    roundTimer = null;
    animationId = null;
    message.textContent = text;
    clownFace.classList.toggle("is-happy", correct);
    clownFace.classList.toggle("is-tricky", !correct);
    if (correct) {
        score++;
        scoreDisplay.textContent = score;
    }
    feedbackTimer = setTimeout(nextInstruction, 850);
}
function handleTimeout() {
    if (!playing || !acceptingInput) return;
    if (clownSays) {
        showFeedback(false, "Too slow! The clown was waiting!");
    } else {
        showFeedback(true, "Excellent! You didn't fall for the trick!");
    }
}
function nextInstruction() {
    if (!playing) return;
    if (round >= 10) {
        finishGame();
        return;
    }
    round++;
    roundDisplay.textContent = `${round} / 10`;
    currentAction = instructions[Math.floor(Math.random() * instructions.length)];
    clownSays = Math.random() < 0.6;
    instructionDisplay.textContent = `${clownSays ? "Clown Says: " : ""}${currentAction.label}!`;
    message.textContent = "Think before you click!";
    clownFace.classList.remove("is-happy", "is-tricky");
    acceptingInput = true;
    timerFill.style.width = "100%";
    roundStartedAt = performance.now();
    roundTimer = setTimeout(handleTimeout, ROUND_DURATION);
    animationId = requestAnimationFrame(updateCountdown);
}
function handleAction(action) {
    if (!playing || !acceptingInput) return;
    const correct = clownSays && action === currentAction.action;
    if (correct) successfulActions.push(action);
    showFeedback(correct, correct ? "Correct! The clown approves!" : "Oops! The clown tricked you!");
}
function startGame() {
    clearGameTimers();
    score = 0;
    round = 0;
    successfulActions = [];
    playing = true;
    acceptingInput = false;
    currentAction = null;
    scoreDisplay.textContent = "0";
    roundDisplay.textContent = "0 / 10";
    timerFill.style.width = "100%";
    victoryPanel.hidden = true;
    clownFace.classList.remove("is-happy", "is-tricky");
    nextInstruction();
}
actionPanel.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button || !actionPanel.contains(button)) return;
    handleAction(button.dataset.action);
});
document.getElementById("clownStart").addEventListener("click", startGame);
document.getElementById("clownPlayAgain").addEventListener("click", startGame);
levelTickets.forEach(ticket => ticket.addEventListener("click", () => {
    showLevel(ticket.dataset.level === "studio" ? "studio" : Number(ticket.dataset.level));
}));

// Level 2: one pending playback/feedback timer, cleared on restart or navigation.
const routineActions = document.getElementById("routineActions");
const routineButtons = routineActions.querySelectorAll("button[data-action]");
const routineMove = document.getElementById("routineMove");
const routineMode = document.getElementById("routineMode");
const routineMessage = document.getElementById("routineMessage");
const routineRetry = document.getElementById("routineRetry");
const routineVictory = document.getElementById("routineVictory");
const moveSymbols = { jump: "🦘", wave: "👋", spin: "🌀", clap: "👏" };
let routineSequence = [];
let playerActions = [];
let routineTimer = null;
let routineAccepting = false;
let routineFinished = false;

function setRoutineInput(enabled) {
    routineAccepting = enabled;
    routineButtons.forEach(button => { button.disabled = !enabled; });
}

function updateRoutineScore() {
    document.getElementById("routineLength").textContent = `${routineSequence.length || 2} / 6`;
    document.getElementById("routineProgress").textContent = `${playerActions.length} / ${routineSequence.length || 2}`;
}

function pauseRoutine() {
    clearTimeout(routineTimer);
    routineTimer = null;
    setRoutineInput(false);
    routineMove.classList.remove("is-demonstrating");
    if (routineSequence.length && !routineFinished) {
        routineMode.textContent = "Paused";
        routineMove.textContent = "🎧";
        routineRetry.disabled = false;
        routineMessage.textContent = "Select Watch / Retry to replay this sequence from the beginning.";
    }
}

function generateNextMove() {
    routineSequence.push(instructions[Math.floor(Math.random() * instructions.length)].action);
}

function playSequence() {
    if (progression.currentLevel !== 2 || !routineSequence.length || routineFinished) return;
    clearTimeout(routineTimer);
    setRoutineInput(false);
    routineRetry.disabled = true;
    playerActions = [];
    updateRoutineScore();
    routineMode.textContent = "Watch";
    routineMessage.textContent = "Watch each move. Your turn comes after the whole sequence.";
    routineMove.textContent = "Get ready…";
    routineMove.classList.remove("is-demonstrating");
    playVisualSequence(routineSequence, routineMove, (action) => {
        const label = instructions.find(move => move.action === action).label;
        routineMove.textContent = `${moveSymbols[action]} ${label}`;
    }, () => {
        routineMode.textContent = "Repeat";
        routineMove.textContent = "Your turn!";
        routineMessage.textContent = "Repeat the moves in order!";
        routineRetry.disabled = false;
        setRoutineInput(true);
    }, 900, 350, callback => { routineTimer = callback; });
}

function handleRoutineMistake() {
    setRoutineInput(false);
    routineMode.textContent = "Try again";
    routineMessage.textContent = "A little mix-up! Watch / Retry will replay the same moves.";
    routineRetry.disabled = false;
}

function completeRoutine() {
    routineFinished = true;
    setRoutineInput(false);
    routineRetry.disabled = true;
    progression.earnedRoutines.level2 = [...routineSequence];
    if (!progression.completedLevels.includes(2)) progression.completedLevels.push(2);
    updateProgression();
    routineMode.textContent = "Routine complete!";
    routineMove.textContent = "🎉";
    routineMessage.textContent = "Standing ovation! Your six-move routine unlocked Level 3!";
    routineVictory.hidden = false;
    saveProgress();
}

function advanceRoutineRound() {
    if (routineSequence.length === 6) {
        completeRoutine();
        return;
    }
    routineMode.textContent = "Success!";
    routineMessage.textContent = "Perfect routine! The DJ is adding one more move.";
    routineRetry.disabled = true;
    routineTimer = setTimeout(() => {
        generateNextMove();
        playSequence();
    }, 1000);
}

function acceptRoutineAction(action) {
    if (!routineAccepting || progression.currentLevel !== 2) return;
    setRoutineInput(false);
    const expected = routineSequence[playerActions.length];
    playerActions.push(action);
    updateRoutineScore();
    if (action !== expected) {
        handleRoutineMistake();
        return;
    }
    routineMove.textContent = `${moveSymbols[action]} ${instructions.find(move => move.action === action).label}`;
    if (playerActions.length === routineSequence.length) {
        advanceRoutineRound();
    } else {
        routineMessage.textContent = "That's it! What's the next move?";
        // Briefly gate input so an accidental double click cannot consume two steps.
        routineRetry.disabled = true;
        routineTimer = setTimeout(() => {
            setRoutineInput(true);
            routineRetry.disabled = false;
        }, 250);
    }
}

function startRoutine() {
    if (progression.currentLevel !== 2) return;
    pauseRoutine();
    routineSequence = [];
    playerActions = [];
    routineFinished = false;
    routineVictory.hidden = true;
    generateNextMove();
    generateNextMove();
    playSequence();
}

routineActions.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (button && routineActions.contains(button) && event.detail < 2) acceptRoutineAction(button.dataset.action);
});
routineActions.addEventListener("keydown", event => {
    if (event.repeat && (event.key === "Enter" || event.key === " ")) event.preventDefault();
});
document.getElementById("routineStart").addEventListener("click", startRoutine);
routineRetry.addEventListener("click", playSequence);
document.getElementById("continueLevel2").addEventListener("click", () => showLevel(2));
document.getElementById("continueLevel3").addEventListener("click", () => showLevel(3));


// Shared visual playback for Levels 2 and 3. The caller owns and cancels its timer.
function playVisualSequence(sequence, display, showItem, onComplete, duration, gap, saveTimer, finalPause = gap) {
    let index = 0;
    function showNext() {
        if (index === sequence.length) {
            onComplete();
            return;
        }
        showItem(sequence[index]);
        display.classList.add("is-demonstrating");
        saveTimer(setTimeout(() => {
            display.classList.remove("is-demonstrating");
            display.textContent = "•";
            index++;
            const pause = index === sequence.length ? finalPause : gap;
            saveTimer(setTimeout(showNext, pause));
        }, duration));
    }
    saveTimer(setTimeout(showNext, 600));
}

// Level 3 keeps command objects separate from the expected valid-action array.
const LEVEL3_COMMAND_DURATION_MS = 2000;
const LEVEL3_COMMAND_GAP_MS = 500;
const LEVEL3_FINAL_PAUSE_MS = 1000;
const djActions = document.getElementById("djActions");
const djButtons = djActions.querySelectorAll("button[data-action]");
const djCommand = document.getElementById("djCommand");
const djMode = document.getElementById("djMode");
const djMessage = document.getElementById("djMessage");
const djRetry = document.getElementById("djRetry");
const djVictory = document.getElementById("djVictory");
let challengeRound = 1;
let challengeCommands = [];
let validActions = [];
let challengeResponses = [];
let challengeTimer = null;
let challengeAccepting = false;
let challengeFinished = false;

function randomizeCommands(commands) {
    for (let i = commands.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [commands[i], commands[j]] = [commands[j], commands[i]];
    }
    return commands;
}

function extractValidActions(commands) {
    return commands.filter(command => command.clownSays).map(command => command.action);
}

function generateCommands() {
    challengeCommands = [];
    const validCount = challengeRound * 2;
    for (let i = 0; i < validCount + challengeRound; i++) {
        challengeCommands.push({
            action: instructions[Math.floor(Math.random() * instructions.length)].action,
            clownSays: i < validCount
        });
    }
    randomizeCommands(challengeCommands);
    validActions = extractValidActions(challengeCommands);
}

function setChallengeInput(enabled) {
    challengeAccepting = enabled;
    djButtons.forEach(button => { button.disabled = !enabled; });
}

function updateChallengeProgress() {
    document.getElementById("djRound").textContent = `${challengeRound} / 4`;
    document.getElementById("djProgress").textContent = `${challengeResponses.length} / ${validActions.length || 2}`;
    document.getElementById("djCommandCount").textContent = `Round ${challengeRound}: ${challengeRound * 2} valid moves and ${challengeRound} trick command${challengeRound === 1 ? "" : "s"}.`;
}

function pauseChallenge() {
    clearTimeout(challengeTimer);
    challengeTimer = null;
    setChallengeInput(false);
    djCommand.classList.remove("is-demonstrating");
    if (challengeCommands.length && !challengeFinished) {
        djRetry.disabled = false;
        djMode.textContent = "Paused";
        djCommand.textContent = "🎧";
        djMessage.textContent = "Watch / Retry will replay this round from the beginning.";
    }
}

function displayChallengeCommands() {
    if (progression.currentLevel !== 3 || !challengeCommands.length || challengeFinished) return;
    clearTimeout(challengeTimer);
    setChallengeInput(false);
    djRetry.disabled = true;
    challengeResponses = [];
    updateChallengeProgress();
    djMode.textContent = "Watch — remember only Clown Says moves";
    djMessage.textContent = "Wait until all commands finish before repeating the valid moves.";
    djCommand.textContent = "Get ready…";
    djCommand.classList.remove("is-demonstrating");
    playVisualSequence(challengeCommands, djCommand, command => {
        const label = instructions.find(move => move.action === command.action).label;
        djCommand.textContent = `${command.clownSays ? "Clown Says: " : ""}${moveSymbols[command.action]} ${label}!`;
    }, () => {
        djMode.textContent = "Repeat only the Clown Says moves";
        djCommand.textContent = "Your turn!";
        djMessage.textContent = `Repeat the ${validActions.length} valid moves in order. Ignore the tricks!`;
        djRetry.disabled = false;
        setChallengeInput(true);
    }, LEVEL3_COMMAND_DURATION_MS, LEVEL3_COMMAND_GAP_MS,
    timer => { challengeTimer = timer; }, LEVEL3_FINAL_PAUSE_MS);
}

function handleChallengeMistake() {
    setChallengeInput(false);
    djMode.textContent = "Try the same round again";
    djMessage.textContent = "The DJ slipped in a trick! Select Watch / Retry; the commands will stay the same.";
    djRetry.disabled = false;
}

function completeChallenge() {
    clearTimeout(challengeTimer);
    challengeTimer = null;
    challengeFinished = true;
    setChallengeInput(false);
    djRetry.disabled = true;
    progression.earnedRoutines.level3 = [...validActions];
    if (!progression.completedLevels.includes(3)) progression.completedLevels.push(3);
    progression.danceStudioUnlocked = [1, 2, 3].every(level => progression.completedLevels.includes(level));
    updateProgression();
    djMode.textContent = "Final challenge complete!";
    djCommand.textContent = "🎉";
    djMessage.textContent = "Standing ovation! Eight moves earned. Enter the Dance Studio when ready.";
    djVictory.hidden = false;
    saveProgress();
}

function advanceChallengeRound() {
    setChallengeInput(false);
    djRetry.disabled = true;
    if (challengeRound === 4) {
        completeChallenge();
        return;
    }
    // Store the next round before the delay so navigation cannot repeat an earned round.
    challengeRound++;
    generateCommands();
    djMode.textContent = "Round complete!";
    djMessage.textContent = "Perfect! The DJ is preparing a bigger challenge.";
    challengeTimer = setTimeout(displayChallengeCommands, 1000);
}

function recordChallengeResponse(action) {
    if (!challengeAccepting || progression.currentLevel !== 3) return;
    setChallengeInput(false);
    const expected = validActions[challengeResponses.length];
    challengeResponses.push(action);
    updateChallengeProgress();
    if (action !== expected) {
        handleChallengeMistake();
        return;
    }
    djCommand.textContent = `${moveSymbols[action]} ${instructions.find(move => move.action === action).label}`;
    if (challengeResponses.length === validActions.length) {
        advanceChallengeRound();
    } else {
        djMessage.textContent = "Correct! Remember the next valid move.";
        djRetry.disabled = true;
        challengeTimer = setTimeout(() => {
            setChallengeInput(true);
            djRetry.disabled = false;
        }, 250);
    }
}

function startChallenge() {
    if (progression.currentLevel !== 3) return;
    pauseChallenge();
    challengeRound = 1;
    challengeFinished = false;
    challengeResponses = [];
    djVictory.hidden = true;
    generateCommands();
    displayChallengeCommands();
}

djActions.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (button && djActions.contains(button) && event.detail < 2) recordChallengeResponse(button.dataset.action);
});
djActions.addEventListener("keydown", event => {
    if (event.repeat && (event.key === "Enter" || event.key === " ")) event.preventDefault();
});
document.getElementById("djStart").addEventListener("click", startChallenge);
djRetry.addEventListener("click", displayChallengeCommands);
document.getElementById("enterStudio").addEventListener("click", () => showLevel("studio"));


// Dance Studio: playback and audio state are separate from the three games.
const STORAGE_KEY = "mpga-circus-dj-v1";
const studioStage = document.getElementById("studioStage");
const studioMove = document.getElementById("studioMove");
const studioProgress = document.getElementById("studioProgress");
const studioMessage = document.getElementById("studioMessage");
const audioMessage = document.getElementById("audioMessage");
const pauseButton = document.getElementById("studioPause");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const BEAT_MS = 60000 / 90;
let customRoutine = [];
let studioMode = "earned";
let lightsEnabled = !reducedMotion.matches;
let muted = false;
let audioContext = null;
let audioMaster = null;
let noiseBuffer = null;
const activeSounds = new Set();
const playback = { state: "stopped", routine: [], index: 0, timer: null, nextBeat: 0, token: 0 };

function combineEarnedRoutines() {
    const { level1, level2, level3 } = progression.earnedRoutines;
    return [...level1, ...level2, ...level3];
}

function validRoutine(routine, length) {
    return Array.isArray(routine) && routine.length === length &&
        routine.every(action => instructions.some(move => move.action === action));
}

function renderStudio() {
    const routines = progression.earnedRoutines;
    const ready = validRoutine(routines.level1, 4) && validRoutine(routines.level2, 6) && validRoutine(routines.level3, 8);
    document.getElementById("earnedSummary").textContent = ready
        ? "Your grand finale: 4 + 6 + 8 = 18 earned moves!"
        : "Your finale needs all three earned routines. Replay Level 1 to earn four moves if you finished without a successful action.";
    document.getElementById("studioStart").textContent = studioMode === "earned" ? "Start the Show" : "Play My Dance";
    document.getElementById("studioStart").disabled = studioMode === "earned" && !ready;
    document.getElementById("studioReplay").disabled = studioMode === "earned" && !ready;
    document.getElementById("earnedMode").setAttribute("aria-pressed", String(studioMode === "earned"));
    document.getElementById("customMode").setAttribute("aria-pressed", String(studioMode === "custom"));
    document.getElementById("customBuilder").hidden = studioMode !== "custom";
    if (playback.state === "stopped") studioProgress.textContent = `Move 0 / ${studioMode === "earned" ? 18 : customRoutine.length}`;
    renderCustomChoreography();
    updateLighting(false);
}

function renderCustomChoreography() {
    const list = document.getElementById("customSequence");
    list.replaceChildren();
    customRoutine.forEach(action => {
        const card = document.createElement("li");
        card.textContent = `${moveSymbols[action]} ${instructions.find(move => move.action === action).label}`;
        list.appendChild(card);
    });
    document.getElementById("customCount").textContent = `${customRoutine.length} / 32 moves`;
    document.getElementById("customUndo").disabled = customRoutine.length === 0;
    document.getElementById("customClear").disabled = customRoutine.length === 0;
    document.querySelectorAll("#choreographyActions button").forEach(button => { button.disabled = customRoutine.length >= 32; });
}

function setStudioMode(mode) {
    stopPlayback();
    studioMode = mode;
    renderStudio();
    studioMessage.textContent = mode === "custom" ? "Build your own dance, then select Play My Dance." : "Your earned routine is ready when all 18 moves are earned.";
}

function renderDanceMove(action, index, total) {
    const label = instructions.find(move => move.action === action).label;
    studioMove.textContent = `${moveSymbols[action]} ${label.toUpperCase()}!`;
    studioProgress.textContent = `Move ${index + 1} / ${total}`;
}

// Only this scheduler advances dance moves. Audio and lights consume its same beat.
function scheduleStudioBeat() {
    if (playback.state !== "playing") return;
    if (playback.index === playback.routine.length) {
        stopPlayback(false);
        studioMove.textContent = "YOU ARE THE STAR OF THE SHOW!";
        studioMessage.textContent = "Standing ovation! Replay your dance or choose Create My Own.";
        return;
    }
    renderDanceMove(playback.routine[playback.index], playback.index, playback.routine.length);
    scheduleAudio(playback.index);
    updateLighting(true, playback.index);
    playback.index++;
    // Do not rush through missed beats after a stalled/background tab.
    playback.nextBeat = Math.max(playback.nextBeat + BEAT_MS, performance.now() + BEAT_MS * .8);
    playback.timer = setTimeout(scheduleStudioBeat, Math.max(0, playback.nextBeat - performance.now()));
}

async function prepareAudio() {
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) throw new Error("Audio unavailable");
        if (!audioContext) {
            audioContext = new AudioContextClass();
            audioMaster = audioContext.createGain();
            audioMaster.gain.value = muted ? 0 : .22;
            audioMaster.connect(audioContext.destination);
            // Original noise provides the snare and hi-hat texture; no recordings.
            noiseBuffer = audioContext.createBuffer(1, Math.ceil(audioContext.sampleRate * .2), audioContext.sampleRate);
            const data = noiseBuffer.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        }
        // Invoked only from a user's play/resume/unmute event.
        if (audioContext.state !== "running") {
            const resumeAttempt = audioContext.resume();
            resumeAttempt.catch(() => { audioMessage.textContent = "Audio is blocked. The dance can still play silently."; });
        }
        audioMessage.textContent = audioContext.state === "running"
            ? (muted ? "Music muted." : "Original synthesized percussion · 90 beats per minute.")
            : "Audio may need another tap on Unmute. Visual playback remains available.";
    } catch (error) {
        audioMessage.textContent = "Audio is unavailable here. Enjoy the visual dance!";
    }
}

function trackSound(source, nodes, end) {
    activeSounds.add(source);
    source.onended = () => {
        activeSounds.delete(source);
        source.disconnect();
        nodes.forEach(node => node.disconnect());
    };
    source.stop(end);
}

function synthKick(when) {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.frequency.setValueAtTime(145, when);
    oscillator.frequency.exponentialRampToValueAtTime(48, when + .14);
    gain.gain.setValueAtTime(.7, when);
    gain.gain.exponentialRampToValueAtTime(.001, when + .17);
    oscillator.connect(gain).connect(audioMaster);
    oscillator.start(when);
    trackSound(oscillator, [gain], when + .18);
}

function synthNoise(when, snare) {
    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    source.buffer = noiseBuffer;
    filter.type = "highpass";
    filter.frequency.value = snare ? 1400 : 6500;
    const duration = snare ? .14 : .06;
    gain.gain.setValueAtTime(snare ? .28 : .12, when);
    gain.gain.exponentialRampToValueAtTime(.001, when + duration);
    source.connect(filter).connect(gain).connect(audioMaster);
    source.start(when);
    trackSound(source, [filter, gain], when + duration + .01);
}

function scheduleAudio(beat) {
    if (muted || !audioContext || audioContext.state !== "running") return;
    try {
        const when = audioContext.currentTime;
        if (beat % 2 === 0) synthKick(when);
        else synthNoise(when, true);
        synthNoise(when, false);
    } catch (error) {
        silenceAudio();
        audioMessage.textContent = "The speakers need a rest. Visual playback will continue.";
    }
}

function silenceAudio() {
    activeSounds.forEach(source => {
        try { source.stop(); } catch (error) { /* Already ended. */ }
    });
    activeSounds.clear();
}

function updateLighting(on, beat = 0) {
    const active = on && lightsEnabled && !reducedMotion.matches;
    studioStage.classList.toggle("lights-off", !active);
    studioStage.classList.toggle("beat-even", active && beat % 2 === 0);
    studioStage.classList.toggle("beat-odd", active && beat % 2 !== 0);
    document.getElementById("studioLights").textContent = lightsEnabled ? "Lights Off" : "Lights On";
    document.getElementById("studioLights").setAttribute("aria-pressed", String(lightsEnabled));
}

async function startPlayback(routine) {
    if (progression.currentLevel !== "studio") return;
    stopPlayback();
    if (!routine.length) {
        studioMessage.textContent = "Add at least one move before playing your dance!";
        return;
    }
    if (studioMode === "earned" && routine.length !== 18) {
        studioMessage.textContent = "Earn the missing Level 1 routine before starting the 18-move finale.";
        return;
    }
    playback.routine = [...routine];
    playback.index = 0;
    playback.state = "starting";
    const token = playback.token;
    await prepareAudio();
    if (token !== playback.token || progression.currentLevel !== "studio") return;
    playback.state = "playing";
    playback.nextBeat = performance.now();
    pauseButton.disabled = false;
    pauseButton.textContent = "Pause";
    studioMessage.textContent = "Follow your moves! Every move shares the musical beat.";
    scheduleStudioBeat();
}

async function pauseResumePlayback() {
    if (playback.state === "playing") {
        playback.state = "paused";
        playback.token++;
        clearTimeout(playback.timer);
        playback.timer = null;
        silenceAudio();
        updateLighting(false);
        pauseButton.textContent = "Resume";
        studioMessage.textContent = "Paused. Resume continues with the next move.";
    } else if (playback.state === "paused") {
        playback.state = "starting";
        const token = ++playback.token;
        await prepareAudio();
        if (token !== playback.token || progression.currentLevel !== "studio") return;
        playback.state = "playing";
        playback.nextBeat = performance.now();
        pauseButton.textContent = "Pause";
        studioMessage.textContent = "Back to the beat!";
        scheduleStudioBeat();
    }
}

function stopPlayback(resetDisplay = true) {
    playback.token++;
    playback.state = "stopped";
    clearTimeout(playback.timer);
    playback.timer = null;
    silenceAudio();
    updateLighting(false);
    pauseButton.disabled = true;
    pauseButton.textContent = "Pause";
    if (resetDisplay) {
        studioMove.textContent = "Ready for your spotlight?";
        studioMessage.textContent = "Playback stopped. Your saved routines are unchanged.";
        studioProgress.textContent = `Move 0 / ${studioMode === "earned" ? 18 : customRoutine.length}`;
    }
}

function selectedDance() {
    return studioMode === "earned" ? combineEarnedRoutines() : customRoutine;
}

// Persistence stores only progress/routine data, never transient timers or audio state.
function saveProgress() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            version: 1,
            completedLevels: progression.completedLevels,
            earnedRoutines: progression.earnedRoutines,
            customRoutine
        }));
        document.getElementById("storageMessage").textContent = "Progress and choreography saved on this browser.";
    } catch (error) {
        document.getElementById("storageMessage").textContent = "Saving is unavailable. You can keep playing in this visit.";
    }
}

function restoreProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        if (!data || data.version !== 1 || !Array.isArray(data.completedLevels) || !data.earnedRoutines) throw new Error("Invalid save");
        const levels = data.completedLevels;
        if (levels.length > 3 || levels.some((level, i) => level !== i + 1)) throw new Error("Invalid progression");
        const routines = data.earnedRoutines;
        for (let level = 1; level <= 3; level++) {
            const routine = routines[`level${level}`];
            const length = [0, 4, 6, 8][level];
            if (!validRoutine(routine, 0) && !validRoutine(routine, length)) throw new Error("Invalid routine");
            if (routine.length && !levels.includes(level)) throw new Error("Unearned routine");
            if (level > 1 && levels.includes(level) && routine.length !== length) throw new Error("Missing routine");
        }
        if (!Array.isArray(data.customRoutine) || data.customRoutine.length > 32 || !validRoutine(data.customRoutine, data.customRoutine.length)) throw new Error("Invalid choreography");
        progression.completedLevels = [...levels];
        progression.earnedRoutines = { level1: [...routines.level1], level2: [...routines.level2], level3: [...routines.level3] };
        progression.danceStudioUnlocked = levels.length === 3;
        customRoutine = [...data.customRoutine];
        document.getElementById("storageMessage").textContent = "Saved progress restored. Choose an unlocked level or the Dance Studio.";
    } catch (error) {
        document.getElementById("storageMessage").textContent = "Saved progress was unavailable or invalid. Starting safely with a fresh game.";
    }
}

function resetAllProgress() {
    if (!window.confirm("Reset all completed levels and saved dances? This cannot be undone.")) return;
    stopPlayback();
    clearGameTimers();
    playing = false;
    acceptingInput = false;
    pauseRoutine();
    pauseChallenge();
    routineSequence = [];
    playerActions = [];
    routineFinished = false;
    challengeCommands = [];
    validActions = [];
    challengeResponses = [];
    challengeRound = 1;
    challengeFinished = false;
    successfulActions = [];
    score = 0;
    round = 0;
    currentAction = null;
    clownSays = false;
    scoreDisplay.textContent = "0";
    roundDisplay.textContent = "0 / 10";
    timerFill.style.width = "100%";
    clownFace.classList.remove("is-happy", "is-tricky");
    instructionDisplay.textContent = "Ready to play?";
    message.textContent = "The clown is waiting for the show to begin!";
    finalScore.textContent = "";
    document.getElementById("level1Reward").textContent = "";
    victoryPanel.hidden = true;
    routineVictory.hidden = true;
    djVictory.hidden = true;
    routineRetry.disabled = true;
    djRetry.disabled = true;
    routineMode.textContent = "Ready to watch?";
    routineMove.textContent = "🎧";
    routineMessage.textContent = "Select Start Routine to begin.";
    djMode.textContent = "Ready for the final challenge?";
    djCommand.textContent = "🎧";
    djMessage.textContent = "Start the challenge when you are ready.";
    progression.completedLevels = [];
    progression.earnedRoutines = { level1: [], level2: [], level3: [] };
    progression.danceStudioUnlocked = false;
    customRoutine = [];
    studioMode = "earned";
    updateRoutineScore();
    updateChallengeProgress();
    renderStudio();
    showLevel(1);
    try {
        localStorage.removeItem(STORAGE_KEY);
        document.getElementById("storageMessage").textContent = "All progress reset. Ready for a fresh show!";
    } catch (error) {
        document.getElementById("storageMessage").textContent = "This visit was reset, but browser storage could not be cleared.";
    }
    document.getElementById("clownStart").focus();
}

// Register studio controls once; starting a dance never adds listeners.
document.getElementById("earnedMode").addEventListener("click", () => setStudioMode("earned"));
document.getElementById("customMode").addEventListener("click", () => setStudioMode("custom"));
document.getElementById("studioStart").addEventListener("click", () => startPlayback(selectedDance()));
document.getElementById("studioReplay").addEventListener("click", () => startPlayback(selectedDance()));
pauseButton.addEventListener("click", pauseResumePlayback);
document.getElementById("studioStop").addEventListener("click", () => stopPlayback());
document.getElementById("customStop").addEventListener("click", () => stopPlayback());
document.getElementById("studioMute").addEventListener("click", async () => {
    muted = !muted;
    if (muted) silenceAudio();
    else if (playback.state === "playing") await prepareAudio();
    if (audioMaster) audioMaster.gain.value = muted ? 0 : .22;
    document.getElementById("studioMute").textContent = muted ? "Unmute" : "Mute";
    document.getElementById("studioMute").setAttribute("aria-pressed", String(muted));
});
document.getElementById("studioLights").addEventListener("click", () => {
    lightsEnabled = !lightsEnabled;
    updateLighting(playback.state === "playing", Math.max(0, playback.index - 1));
});
reducedMotion.addEventListener("change", () => updateLighting(playback.state === "playing", Math.max(0, playback.index - 1)));
document.getElementById("choreographyActions").addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button || customRoutine.length >= 32) return;
    stopPlayback();
    customRoutine.push(button.dataset.action);
    renderCustomChoreography();
    studioMessage.textContent = "Move added! Keep building or play your dance.";
    saveProgress();
});
document.getElementById("customUndo").addEventListener("click", () => {
    stopPlayback();
    customRoutine.pop();
    renderCustomChoreography();
    saveProgress();
});
document.getElementById("customClear").addEventListener("click", () => {
    stopPlayback();
    customRoutine = [];
    renderCustomChoreography();
    saveProgress();
});
document.getElementById("customPlay").addEventListener("click", () => startPlayback(customRoutine));
document.getElementById("customSave").addEventListener("click", saveProgress);
document.getElementById("resetProgress").addEventListener("click", resetAllProgress);
// Pause hidden-tab playback instead of leaving music running or catching up in a burst.
document.addEventListener("visibilitychange", () => {
    if (document.hidden && playback.state === "playing") pauseResumePlayback();
});
window.addEventListener("pagehide", () => stopPlayback());
restoreProgress();
renderStudio();
showLevel(1);
