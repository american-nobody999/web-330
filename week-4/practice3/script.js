// WEB 330 - Practice 3
// Rotating Discovery Cards
// Author: Leslie Brockman
//Again, Practice 3: Discovery Cards for Index and Template

"use strict";

// WEB 330 - Practice 3
// Rotating Discovery Cards

// Five discoveries stored as objects inside an array.
const discoveries = [
    {
        title: "Explore the West Bank",
        category: "Places & Communities",
        description: "Discover communities, maps, and stories from the West Bank.",
        emoji: "🗺️",
        color: "#ffdb79",
        link: "https://american-nobody999.github.io/One-match/west-bank.html"
    },
    {
        title: "Visit the Schoolhouse",
        category: "Learning & Games",
        description: "Explore interactive activities and learn something new!",
        emoji: "📚",
        color: "#a8dded",
        link: "#"
    },
    {
        title: "Step Into the Circus",
        category: "Circus Adventures",
        description: "Come explore the wonderful world of the Gaza Circus School!",
        emoji: "🎪",
        color: "#f4a8c4",
        link: "#"
    },
    {
        title: "Meet the Creators",
        category: "People & Stories",
        description: "Discover the voices and creative people sharing their stories.",
        emoji: "🎤",
        color: "#a78acb",
        link: "#"
    },
    {
        title: "What's Happening This Week?",
        category: "Weekly Discoveries",
        description: "Catch up on the latest updates and additions to the website.",
        emoji: "📰",
        color: "#bce5d4",
        link: "#"
    }
];

// Find the HTML elements.
const cardCounter = document.getElementById("cardCounter");
const cardArt = document.getElementById("cardArt");
const cardCategory = document.getElementById("cardCategory");
const cardTitle = document.getElementById("discovery-title");
const cardDescription = document.getElementById("cardDescription");
const cardLink = document.getElementById("cardLink");
const cardDots = document.getElementById("cardDots");
const statusMessage = document.getElementById("statusMessage");

const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const randomBtn = document.getElementById("randomBtn");

// Remember which card is currently displayed.
let currentIndex = Math.floor(Math.random() * discoveries.length);

// Display one discovery.
function showCard(index) {
    const discovery = discoveries[index];

    cardCounter.textContent = `Discovery ${index + 1} of ${discoveries.length}`;
    cardArt.textContent = discovery.emoji;
    cardArt.style.backgroundColor = discovery.color;
    cardCategory.textContent = discovery.category;
    cardTitle.textContent = discovery.title;
    cardDescription.textContent = discovery.description;
    cardLink.href = discovery.link;

    // Disable the link until a real destination is provided.
    if (discovery.link === "#") {
        cardLink.removeAttribute("href");
        cardLink.textContent = "Coming Soon!";
        cardLink.setAttribute("aria-disabled", "true");
    } else {
        cardLink.textContent = "Explore This Page →";
        cardLink.removeAttribute("aria-disabled");
    }

    updateDots();
}

// Create navigation dots.
function createDots() {
    discoveries.forEach((discovery, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.setAttribute("aria-label", `Show discovery ${index + 1}`);

        dot.addEventListener("click", () => {
            currentIndex = index;
            showCard(currentIndex);
            statusMessage.textContent = `Now showing: ${discovery.title}`;
        });

        cardDots.appendChild(dot);
    });
}

// Highlight the active navigation dot.
function updateDots() {
    const dots = cardDots.querySelectorAll("button");

    dots.forEach((dot, index) => {
        const isActive = index === currentIndex;

        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-pressed", String(isActive));
    });
}

// Move to the previous discovery.
function previousCard() {
    currentIndex = (currentIndex - 1 + discoveries.length) % discoveries.length;

    showCard(currentIndex);
    statusMessage.textContent = "Here's another discovery!";
}

// Move to the next discovery.
function nextCard() {
    currentIndex = (currentIndex + 1) % discoveries.length;

    showCard(currentIndex);
    statusMessage.textContent = "Keep exploring!";
}

// Choose a random discovery different from the current one.
function randomCard() {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * discoveries.length);
    } while (randomIndex === currentIndex && discoveries.length > 1);

    currentIndex = randomIndex;

    showCard(currentIndex);
    statusMessage.textContent = "🎉 Surprise! You found something new!";
}

// Connect the buttons to their functions.
previousBtn.addEventListener("click", previousCard);
nextBtn.addEventListener("click", nextCard);
randomBtn.addEventListener("click", randomCard);

// Set up the page.
createDots();
showCard(currentIndex);
