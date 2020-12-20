"use strict";

// Global variables
var TABLE_HEADERS = Object.freeze({
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
  EXPENSE: 10
}); // ===== HTML elements =====

var userRowElements = document.querySelectorAll('#mnuser-table tbody tr');
var tableRowElements = document.querySelectorAll('#mnuser-table tr');
var expenseCellElements = document.querySelectorAll('#mnuser-table tbody tr .mnuser-expense');
var displayCheckboxElements = document.querySelectorAll('#mnuser-display .mmnuser-display-item input'); // ===== Functions =====

function removeUserFromDatabase(todo) {
  var _id = todo.firstElementChild.innerHTML;

  try {
    fetch("/api/users/".concat(_id), {
      method: 'DELETE'
    }).then(function (res) {
      res.json().then(function (data) {
        if (data.message) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: data.message
          });
        } else {
          todo.classList.add('fall');

          todo.ontransitionend = function (e) {
            return todo.remove();
          };

          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            html: 'Xóa user thành công'
          });
        }
      });
    });
  } catch (err) {
    return false;
  }
}

function removeUser(event) {
  var item = event.target;
  var todo = item.parentElement;

  if (item.classList[0] === 'trash-btn') {
    Swal.fire({
      title: 'Cảnh báo',
      icon: 'warning',
      html: "B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn x\xF3a user <b>".concat(todo.innerText, "</b> kh\xF4ng?"),
      confirmButtonColor: '#E74C3C',
      confirmButtonText: 'Chắc chắn',
      showCancelButton: true,
      cancelButtonColor: '#99A3A4',
      cancelButtonText: 'Không'
    }).then(function (result) {
      if (result.isConfirmed) {
        removeUserFromDatabase(todo);
      }
    });
  } else if (item.classList[0] === 'edit-btn') {
    todo.classList.toggle('completed');
  } else if (item.classList[0] === 'complete-btn') {
    todo.classList.toggle('completed');
  }
}

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

function initTable() {
  var defaultColIndex = [TABLE_HEADERS.ROLE, TABLE_HEADERS.NAME, TABLE_HEADERS.EMAIL, TABLE_HEADERS.PHONE_NUM, TABLE_HEADERS.DOB, TABLE_HEADERS.CITY, TABLE_HEADERS.EXPENSE];
  var hiddenColIndex = [TABLE_HEADERS.GENDER, TABLE_HEADERS.ADDRESS, TABLE_HEADERS.AREA, TABLE_HEADERS.STAR];
  defaultColIndex.forEach(function (colIndex) {
    displayCheckboxElements[colIndex].checked = true;
  });
  hiddenColIndex.forEach(function (colIndex) {
    hideTableColumn(colIndex);
  });
}

function formatExpenseValues() {
  expenseCellElements.forEach(function (e) {
    e.innerHTML = parseInt(e.innerHTML, 10).toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND'
    });
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
} // ===== Main =====


function main() {
  initTable();
  formatExpenseValues();
  eventDisplayCheckboxes();
}

main();