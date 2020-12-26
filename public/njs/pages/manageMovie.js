// ===== HTML elements =====
const movieRowElements = document.querySelectorAll('#mnmovie-table tbody tr');
const tableRowElements = document.querySelectorAll('#mnmovie-table tr');
const tableBodyElement = document.querySelector('#mnmovie-table tbody');
const displayCheckboxElements = document.querySelectorAll(
  '#mnmovie-display .mmnmovie-display-item input',
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
