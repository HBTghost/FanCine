"use strict";

// ===== HTML elements =====
var theaterRowElements = document.querySelectorAll('#mntheater-table tbody tr');
var tableRowElements = document.querySelectorAll('#mntheater-table tr');
var tableBodyElement = document.querySelector('#mntheater-table tbody');
var displayCheckboxElements = document.querySelectorAll('#mntheater-display .mmntheater-display-item input'); // ===== Functions =====

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
      hideTableColumn(i);
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

function handleEvents() {
  eventDisplayCheckboxes();
} // ===== Main =====


function main() {
  refreshDisplay();
  handleEvents();
}

main();