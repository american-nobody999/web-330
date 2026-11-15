
"use strict";

// WEB 330 - Practice 4
// The Cosmic Oracle
// Phase 2 - Random Fortune Generator

// Original fortunes for entertainment and satire.
// Description: JavaScript for the cosmic fortune-telling arcade machine simulation. Includes integration for random fortune generation and user interaction.

const fortunes = [
    {
        number: "001",
        title: "The Wandering Planet",
        symbol: "🪐",
        fortune: "You are destined for great things. Unfortunately, the universe forgot to specify which things.",
        omen: "Cosmic advice: Bring snacks."
    },
    {
        number: "002",
        title: "The Suspicious Moon",
        symbol: "🌙",
        fortune: "Someone is thinking about you. They probably want to know why you haven't answered their message.",
        omen: "Cosmic advice: Check your notifications."
    },
    {
        number: "003",
        title: "The Galactic Committee",
        symbol: "🌌",
        fortune: "The stars have formed a committee to discuss your future. A second committee has been appointed to investigate the first.",
        omen: "Cosmic advice: Do not expect minutes."
    },
    {
        number: "004",
        title: "The Diplomatic Fog",
        symbol: "🌫️",
        fortune: "A powerful voice will express deep concern. The concern will be forwarded to another department.",
        omen: "Cosmic advice: Your patience has expired."
    },
    {
        number: "005",
        title: "Mercury's Complaint Department",
        symbol: "☿",
        fortune: "Your complaint has reached Mercury. Mercury is currently unavailable and suggests contacting Venus.",
        omen: "Cosmic advice: Please remain on the line."
    },
    {
        number: "006",
        title: "The Rebellious Comet",
        symbol: "☄️",
        fortune: "You were born to follow your own path. The universe would appreciate it if you stopped asking for directions.",
        omen: "Cosmic advice: Take the scenic route."
    },
    {
        number: "007",
        title: "Saturn's Performance Review",
        symbol: "🪐",
        fortune: "Saturn has reviewed your recent decisions. The rings are impressed. The moons have concerns.",
        omen: "Cosmic advice: Schedule a follow-up."
    },
    {
        number: "008",
        title: "The Cosmic Customer Service Desk",
        symbol: "✨",
        fortune: "Your request for a peaceful week has been received. Estimated processing time: Three to five business eternities.",
        omen: "Cosmic advice: Your call is important."
    },
    {
        number: "009",
        title: "The Overworked Sun",
        symbol: "☀️",
        fortune: "You are a shining example of perseverance. The sun would like to know whether you can cover its next shift.",
        omen: "Cosmic advice: Apply sunscreen."
    },
    {
        number: "010",
        title: "The Lost Constellation",
        symbol: "⭐",
        fortune: "Your future is written in the stars. Unfortunately, somebody spilled coffee on the map.",
        omen: "Cosmic advice: Follow the crumbs."
    },
    {
        number: "011",
        title: "The Intergalactic Audit",
        symbol: "🌠",
        fortune: "The universe has audited your life choices. Several receipts are missing, but your sense of humor remains deductible.",
        omen: "Cosmic advice: Keep your paperwork."
    },
    {
        number: "012",
        title: "The Cosmic Plot Twist",
        symbol: "🌑",
        fortune: "Everything is about to make sense. Not today, obviously. The universe enjoys dramatic suspense.",
        omen: "Cosmic advice: Stay for the sequel."
    }
];

// DOM elements

const revealBtn = document.getElementById("revealBtn");
const newFortuneBtn = document.getElementById("newFortuneBtn");
const fortuneTicket = document.getElementById("fortuneTicket");
const ticketNumber = document.getElementById("ticketNumber");
const ticketSymbol = document.getElementById("ticketSymbol");
const fortuneTitle = document.getElementById("fortuneTitle");
const fortuneText = document.getElementById("fortuneText");
const fortuneOmen = document.getElementById("fortuneOmen");
const windowMessage = document.getElementById("windowMessage");
const machineStatus = document.getElementById("machineStatus");

// Application state

let currentFortuneIndex = -1;
let fortuneRevealed = false;
let fortuneDeck = [];

// Refill the deck and shuffle its indexes using Fisher–Yates.

function shuffleFortuneDeck() {
    fortuneDeck = fortunes.map((fortune, index) => index);

    for (let i = fortuneDeck.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [fortuneDeck[i], fortuneDeck[randomIndex]] = [fortuneDeck[randomIndex], fortuneDeck[i]];
    }

    // pop() draws from the end. Avoid repeating the previous cycle's final draw.
    const last = fortuneDeck.length - 1;
    if (fortuneDeck.length > 1 && fortuneDeck[last] === currentFortuneIndex) {
        const swapIndex = Math.floor(Math.random() * last);
        [fortuneDeck[last], fortuneDeck[swapIndex]] = [fortuneDeck[swapIndex], fortuneDeck[last]];
    }
}

// Draw every fortune once before refilling the deck.

function selectRandomFortune() {
    if (fortunes.length === 0) {
        return null;
    }

    if (fortuneDeck.length === 0) {
        shuffleFortuneDeck();
    }

    currentFortuneIndex = fortuneDeck.pop();

    return fortunes[currentFortuneIndex];
}

// Display the selected fortune on the ticket.

function displayFortune(fortune) {
    if (!fortune) {
        machineStatus.textContent = "The cosmos has misplaced its fortunes.";
        return;
    }

    ticketNumber.textContent = `NO. ${fortune.number}`;
    ticketSymbol.textContent = fortune.symbol;
    fortuneTitle.textContent = fortune.title;
    fortuneText.textContent = `"${fortune.fortune}"`;
    fortuneOmen.textContent = fortune.omen;

    fortuneTicket.classList.remove("dispense");
    fortuneTicket.hidden = true;

    // Restart the CSS ticket-dispensing animation.

    void fortuneTicket.offsetWidth;

    fortuneTicket.hidden = false;
    fortuneTicket.classList.add("dispense");

    windowMessage.textContent = "The universe has spoken!";
    machineStatus.textContent = `Fortune ${fortune.number} dispensed.`;

    fortuneRevealed = true;
}

// Reveal a new fortune.

function revealFortune() {
    if (fortuneRevealed) {
        machineStatus.textContent = "Your fortune is already revealed. Try another!";
        return;
    }

    const fortune = selectRandomFortune();

    displayFortune(fortune);
}

// Reset the machine for another reading.

function resetMachine() {
    fortuneTicket.hidden = true;
    fortuneTicket.classList.remove("dispense");

    fortuneRevealed = false;

    windowMessage.textContent = "The stars are waiting...";
    machineStatus.textContent = "The cosmos is ready for another question.";
}

// Event listeners

revealBtn.addEventListener("click", revealFortune);

newFortuneBtn.addEventListener("click", resetMachine);
