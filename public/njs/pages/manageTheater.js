// ===== HTML elements =====
const theaterRowElements = document.querySelectorAll('#mntheater-table tbody tr');
const tableRowElements = document.querySelectorAll('#mntheater-table tr');
const tableBodyElement = document.querySelector('#mntheater-table tbody');
const displayCheckboxElements = document.querySelectorAll(
  '#mntheater-display .mmntheater-display-item input',
);

// ===== Functions =====
function showTableColumn(colIndex) {
  tableRowElements.forEach((e) => {
    e.children[colIndex].style.display = 'table-cell';
  });
}

function hideTableColumn(colIndex) {
  tableRowElements.forEach((e) => {
    e.children[colIndex].style.display = 'none';
  });
}

function refreshDisplay() {
  displayCheckboxElements.forEach((e, i) => {
    if (e.checked === false) {
      hideTableColumn(i + 1);
    }
  });
}

// ===== Events =====
function eventDisplayCheckboxes() {
  displayCheckboxElements.forEach((e, i) => {
    e.addEventListener('click', () => {
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
}

// ===== Main =====
function main() {
  refreshDisplay();
  handleEvents();
}

main();
