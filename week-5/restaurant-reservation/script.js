/*
  Pragmatic JavaScript
  Chapter 2
  Programming Assignment

  Author: Leslie Brockman
  Date: 11-21-2026
  Filename: script.js
*/

// Create an in-memory object array for each table in the restaurant-- Each object represents a table with its number, capacity, reservation status, and current status.

"use strict";
let tables = [
  { tableNumber: 1, capacity: 2, isReserved: false, status: "available" },
  { tableNumber: 2, capacity: 2, isReserved: false, status: "available" },
  { tableNumber: 3, capacity: 4, isReserved: false, status: "available" },
  { tableNumber: 4, capacity: 4, isReserved: false, status: "available" },
  { tableNumber: 5, capacity: 6, isReserved: false, status: "available" },
  { tableNumber: 6, capacity: 6, isReserved: false, status: "available" },
];

let reservations = [];

// Create a function reserveTable-- This function attempts to reserve a table by its number, invoking a callback with the result after a simulated delay.

function reserveTable(tableNumber, callback, time) {
  const table = tables.find(function (item) {
    return item.tableNumber === tableNumber;
  });

  // Immediately handle a nonexistent table.-- If the table does not exist, the callback is invoked with an error message and the function returns early.

  if (!table) {
    callback("Table number " + tableNumber + " does not exist.");
    return;
  }

  // Immediately handle an already reserved table.-- If the table is already reserved, the callback is invoked with an error message and the function returns early.

  if (table.isReserved) {
    callback("Table number " + tableNumber + " is already reserved.");
    return;
  }

  table.isReserved = true;
  table.status = "reserved";

  // Use an asynchronous delay to simulate the reservation apparatus.-- Once the delay is over, the callback is invoked with a success message.

  setTimeout(function () {
    callback(
      "Table number " + tableNumber + " has been successfully reserved."
    );
  }, time);
}

function updateTableIndicators() {
  document.querySelectorAll(".table-indicator").forEach(function (indicator) {
    const tableNumber = Number(indicator.dataset.table);
    const table = tables.find(function (item) {
      return item.tableNumber === tableNumber;
    });
    const status = indicator.querySelector(".table-status");
    const tableStatus = table ? table.status : "available";
    const statusLabel =
      tableStatus.charAt(0).toUpperCase() + tableStatus.slice(1);

    indicator.classList.remove("available", "reserved", "seated");
    indicator.classList.add(tableStatus);
    status.textContent = statusLabel;
  });
}

function renderLedger() {
  const reservationsList = document.getElementById("reservationsList");
  reservationsList.replaceChildren();

  reservations.forEach(function (reservation) {
    const table = tables.find(function (item) {
      return item.tableNumber === reservation.tableNumber;
    });
    const entry = document.createElement("li");
    const details = document.createElement("div");
    const guest = document.createElement("strong");
    const information = document.createElement("span");
    const status = document.createElement("span");
    const seatButton = document.createElement("button");

    entry.className = "reservation-entry";
    guest.textContent = reservation.guestName;
    information.textContent =
      "Table " +
      reservation.tableNumber +
      " · Capacity: " +
      table.capacity +
      " guests";
    status.className = "reservation-status " + reservation.status;
    status.textContent =
      "Status: " +
      reservation.status.toUpperCase();

    details.className = "reservation-details";
    details.append(guest, information);
    entry.append(details, status);

    if (reservation.status === "reserved") {
      seatButton.type = "button";
      seatButton.className = "seat-button";
      seatButton.textContent = "Seat Guest";
      seatButton.addEventListener("click", function () {
        seatGuest(reservation);
      });
      entry.append(seatButton);
    }

    reservationsList.append(entry);
  });
}

function seatGuest(reservation) {
  const table = tables.find(function (item) {
    return item.tableNumber === reservation.tableNumber;
  });

  if (!table || reservation.status !== "reserved") {
    return;
  }

  table.status = "seated";
  reservation.status = "seated";
  updateTableIndicators();
  renderLedger();
}

// When the form is submitted, call the reserveTable function-- This handles the form submission, validates the input, and attempts to reserve the selected table.
document
  .getElementById("reservationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const guestName = document.getElementById("name").value.trim();
    const tableNumber = Number(document.getElementById("tableNumber").value);
    const message = document.getElementById("message");
    const selectedTable = tables.find(function (table) {
      return table.tableNumber === tableNumber;
    });
    const canAcceptReservation =
      guestName !== "" && selectedTable && !selectedTable.isReserved;
    const isSuccessfulReservation = function (result) {
      return result.indexOf("has been successfully reserved.") !== -1;
    };

    message.className = "";
    message.textContent = "Processing your reservation...";

    reserveTable(tableNumber, function (result) {
      const reservationSucceeded = isSuccessfulReservation(result);
      message.className = reservationSucceeded ? "success" : "error";
      message.textContent = result;
      if (reservationSucceeded) {
        reservations.push({
          guestName: guestName,
          tableNumber: tableNumber,
          status: "reserved",
        });
        renderLedger();
      }
      updateTableIndicators();
    }, 2000);

    if (canAcceptReservation) {
      document.getElementById("reservationForm").reset();
    }

    updateTableIndicators();
  });
