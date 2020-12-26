// ===== HTML elements =====
const userRowElements = document.querySelectorAll('#mnuser-table tbody tr');
const tableRowElements = document.querySelectorAll('#mnuser-table tr');
const tableBodyElement = document.querySelector('#mnuser-table tbody');
const displayCheckboxElements = document.querySelectorAll(
  '#mnuser-display .mmnuser-display-item input',
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
      hideTableColumn(i);
    }
  });
}

// ===== Events =====
function eventDisplayCheckboxes() {
  displayCheckboxElements.forEach((e, i) => {
    e.addEventListener('click', () => {
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
}

// ===== Main =====
function main() {
  refreshDisplay();
  handleEvents();
}

main();
