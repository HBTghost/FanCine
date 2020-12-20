// Global variables
const TABLE_HEADERS = Object.freeze({
  ROLE: 0,
  NAME: 1,
  EMAIL: 2,
  PHONE_NUM: 3,
  DOB: 4,
  GENDER: 5,
  ADDRESS: 6,
  CITY: 7,
  AREA: 8,
  STAR: 9,
  EXPENSE: 10,
});

// ===== HTML elements =====
const userRowElements = document.querySelectorAll('#mnuser-table tbody tr');
const tableRowElements = document.querySelectorAll('#mnuser-table tr');
const expenseCellElements = document.querySelectorAll('#mnuser-table tbody tr .mnuser-expense');
const displayCheckboxElements = document.querySelectorAll(
  '#mnuser-display .mmnuser-display-item input',
);

// ===== Functions =====
function removeUserFromDatabase(todo) {
  const _id = todo.firstElementChild.innerHTML;
  try {
    fetch(`/api/users/${_id}`, {
      method: 'DELETE',
    }).then((res) => {
      res.json().then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          todo.classList.add('fall');
          todo.ontransitionend = (e) => todo.remove();
        }
      });
    });
  } catch (err) {
    return false;
  }
}

function removeUser(event) {
  const item = event.target;
  const todo = item.parentElement;
  if (item.classList[0] === 'trash-btn') {
    if (confirm('Bạn có chắc chắn xóa user này không?')) {
      removeUserFromDatabase(todo);
    }
  } else if (item.classList[0] === 'edit-btn') {
    todo.classList.toggle('completed');
  } else if (item.classList[0] === 'complete-btn') {
    todo.classList.toggle('completed');
  }
}

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

function initTable() {
  const defaultColIndex = [
    TABLE_HEADERS.ROLE,
    TABLE_HEADERS.NAME,
    TABLE_HEADERS.EMAIL,
    TABLE_HEADERS.PHONE_NUM,
    TABLE_HEADERS.DOB,
    TABLE_HEADERS.CITY,
    TABLE_HEADERS.EXPENSE,
  ];
  const hiddenColIndex = [
    TABLE_HEADERS.GENDER,
    TABLE_HEADERS.ADDRESS,
    TABLE_HEADERS.AREA,
    TABLE_HEADERS.STAR,
  ];

  defaultColIndex.forEach((colIndex) => {
    displayCheckboxElements[colIndex].checked = true;
  });

  hiddenColIndex.forEach((colIndex) => {
    hideTableColumn(colIndex);
  });
}

function formatExpenseValues() {
  expenseCellElements.forEach((e) => {
    e.innerHTML = parseInt(e.innerHTML, 10).toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    });
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

// ===== Main =====
function main() {
  initTable();
  formatExpenseValues();
  eventDisplayCheckboxes();
}

main();
