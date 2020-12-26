"use strict";

// ===== HTML elements =====
var movieRowElements = document.querySelectorAll('#mnmovie-table tbody tr');
var tableRowElements = document.querySelectorAll('#mnmovie-table tr');
var tableBodyElement = document.querySelector('#mnmovie-table tbody');
var displayCheckboxElements = document.querySelectorAll('#mnmovie-display .mmnmovie-display-item input'); // ===== Functions =====

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

function handleEvents() {
  eventDisplayCheckboxes();
} // ===== Main =====


function main() {
  refreshDisplay();
  handleEvents();
}

main();