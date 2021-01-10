"use strict";

// ===== HTML elements =====
var theaterRowElements = document.querySelectorAll('#mntheater-table tbody tr');
var tableRowElements = document.querySelectorAll('#mntheater-table tr');
var tableBodyElement = document.querySelector('#mntheater-table tbody');
var displayCheckboxElements = document.querySelectorAll('#mntheater-display .mmntheater-display-item input'); // Global variables

var COL = Object.freeze({
  NAME: 1,
  CITY: 2,
  ADDRESS: 3,
  PHONE: 4,
  ROOMS: 5,
  ID: 6
}); // ===== Functions =====

function showTableColumn(colIndex) {
  tableRowElements.forEach(function (e) {
    e.children[colIndex].style.display = 'table-cell';
  });
}

function hideTableColumn(colIndex) {
  tableRowElements.forEach(function (e) {
    e.children[colIndex].style.display = 'none';
  });
}

function refreshDisplay() {
  displayCheckboxElements.forEach(function (e, i) {
    if (e.checked === false) {
      hideTableColumn(i + 1);
    }
  });
} // ===== Events =====


function eventDisplayCheckboxes() {
  displayCheckboxElements.forEach(function (e, i) {
    e.addEventListener('click', function () {
      if (e.checked === true) {
        showTableColumn(i + 1);
      } else {
        hideTableColumn(i + 1);
      }
    });
  });
}

function eventRowTheaters() {
  theaterRowElements.forEach(function (row) {
    row.addEventListener('click', function () {
      var _id = row.children[COL.ID].innerHTML;
      fetch("/api/theaters/".concat(_id)).then(function (res) {
        res.json().then(function (data) {
          console.log(data.address);
        });
      });
    });
  });
}

function handleEvents() {
  eventDisplayCheckboxes();
  eventRowTheaters();
} // ===== Main =====


function main() {
  refreshDisplay();
  handleEvents();
}

main();