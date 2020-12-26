"use strict";

// ===== HTML elements =====
var userRowElements = document.querySelectorAll('#mnuser-table tbody tr');
var tableRowElements = document.querySelectorAll('#mnuser-table tr');
var tableBodyElement = document.querySelector('#mnuser-table tbody');
var displayCheckboxElements = document.querySelectorAll('#mnuser-display .mmnuser-display-item input'); // ===== Functions =====

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
        showTableColumn(i);
      } else {
        hideTableColumn(i);
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