/*
  Pragmatic JavaScript
  Chapter 1
  Programming Assignment

  Author:Leslie Brockman
  Date: 2026-10-31
  Filename: script.js
  Description: Circus-themed character generator demonstrating closures to maintain private character data through getter methods, with form submission, input validation, interactive character selection, and dynamic character display.
*/

"use strict";

function createCharacter(name, gender, characterClass) {
  return {
    getName() {
      return name;
    },
    getGender() {
      return gender;
    },
    getClass() {
      return characterClass;
    }
  };
}

const form = document.getElementById("characterForm");
const nameInput = document.getElementById("heroName");
const classSelect = document.getElementById("heroClass");
const classCards = form.querySelectorAll('input[name="heroClassCard"]');
const validationMessage = document.getElementById("validationMessage");

// The native select is the source of character data; cards mirror its value.
function synchronizeClassCards() {
  classCards.forEach(function(card) {
    card.checked = card.value === classSelect.value;
  });
}

classSelect.addEventListener("change", synchronizeClassCards);
classCards.forEach(function(card) {
  card.addEventListener("change", function() {
    if (card.checked) {
      classSelect.value = card.value;
      synchronizeClassCards();
    }
  });
});
synchronizeClassCards();

// Let the submit handler show a consistent message before native validation.
form.noValidate = true;

form.addEventListener("input", function() {
  nameInput.setCustomValidity("");
  validationMessage.textContent = "";
});

form.addEventListener("submit", function(e) {
  e.preventDefault();

  nameInput.setCustomValidity(
    nameInput.value.trim() ? "" : "Please enter a name with at least one non-space character."
  );

  if (!form.checkValidity()) {
    validationMessage.textContent =
      "Please enter your hero’s name, choose a gender, and select a circus companion.";
    form.reportValidity();
    return;
  }

  const name = nameInput.value.trim();
  const gender = document.getElementById("heroGender").value;
  const characterClass = classSelect.value;
  const character = createCharacter(name, gender, characterClass);
  const identities = {
    warrior: "Seal the Warrior",
    mage: "Mage the Elephant",
    rogue: "Rogue Lion"
  };

  validationMessage.textContent = "";
  document.getElementById("characterOutput").textContent =
    `Name: ${character.getName()} Gender: ${character.getGender()} Class: ${character.getClass()}`;
  document.getElementById("outputName").textContent = character.getName();
  document.getElementById("outputGender").textContent = character.getGender();
  document.getElementById("outputClass").textContent = character.getClass();
  document.getElementById("outputIdentity").textContent = identities[character.getClass()];
  document.getElementById("ticketHeading").textContent = "Welcome to the grand show!";
  document.getElementById("ticketHint").hidden = true;
  document.getElementById("ticketDetails").hidden = false;
});
