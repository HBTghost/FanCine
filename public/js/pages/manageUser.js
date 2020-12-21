"use strict";

// ===== HTML elements =====
var userRowElements = document.querySelectorAll('#mnuser-table tbody tr');
var tableRowElements = document.querySelectorAll('#mnuser-table tr');
var tableBodyElement = document.querySelector('#mnuser-table tbody');
var displayCheckboxElements = document.querySelectorAll('#mnuser-display .mmnuser-display-item input');
var sortingIconsElements = document.querySelectorAll('.mnuser-cell-sort'); // Global variables

var COL = Object.freeze({
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
  ID: 11
});
var parser = new DOMParser();
var preColIndex;
var preSortType; // ===== Functions =====

function removeUserFromDatabase(row) {
  var _id = row.children[COL.ID].innerHTML;

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
          row.remove();
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            html: 'Xóa tài khoản thành công'
          });
          refreshTable();
        }
      });
    });
  } catch (err) {
    return false;
  }
}

function removeAUser(row) {
  Swal.fire({
    title: 'Cảnh báo',
    icon: 'warning',
    html: "B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn x\xF3a t\xE0i kho\u1EA3n <b>".concat(row.children[COL.EMAIL].innerHTML, "</b> kh\xF4ng?"),
    confirmButtonColor: '#E74C3C',
    confirmButtonText: 'Chắc chắn',
    showCancelButton: true,
    cancelButtonColor: '#99A3A4',
    cancelButtonText: 'Không'
  }).then(function (result) {
    if (result.isConfirmed) {
      removeUserFromDatabase(row);
    }
  });
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

function formatExpenseValues() {
  userRowElements.forEach(function (e) {
    e.children[COL.EXPENSE].innerHTML = parseInt(e.children[COL.EXPENSE].innerHTML, 10).toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND'
    });
  });
}

function refreshTable() {
  userRowElements = document.querySelectorAll('#mnuser-table tbody tr');
  tableRowElements = document.querySelectorAll('#mnuser-table tr');
  eventRowUsers();
}

function refreshDisplay() {
  formatExpenseValues();
  displayCheckboxElements.forEach(function (e, i) {
    if (e.checked === false) {
      hideTableColumn(i);
    }
  });
}

function sortAllUsers(colIndex, sortType) {
  fetch("/admin/manageUser/sort/".concat(colIndex, "/").concat(sortType)).then(function (partial) {
    partial.text().then(function (html) {
      var usersData = parser.parseFromString(html, 'text/html');
      console.log(usersData);
      tableBodyElement.innerHTML = usersData.getElementById('mnuser-users').innerHTML;
      refreshTable();
      refreshDisplay();
    });
  });
}

function initTable() {
  preColIndex = COL.ROLE;
  preSortType = 0;
  sortingIconsElements[preColIndex].children[preSortType].classList.add('mnuser-cell-sort-asc-selected');
  sortAllUsers(preColIndex, preSortType);
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

function eventSorting() {
  var sortTypeStr = ['asc', 'desc'];
  var dupCount = 0;
  sortingIconsElements.forEach(function (icons, colIndex) {
    var _loop = function _loop(sortType) {
      icons.children[sortType].addEventListener('click', function () {
        icons.children[sortType].classList.add("mnuser-cell-sort-".concat(sortTypeStr[sortType], "-selected"));
        sortingIconsElements[preColIndex].children[preSortType].classList.remove("mnuser-cell-sort-".concat(sortTypeStr[preSortType], "-selected"));

        if (preColIndex === colIndex && preSortType === sortType) {
          dupCount += 1;

          if (dupCount % 2 === 0) {
            icons.children[sortType].classList.add("mnuser-cell-sort-".concat(sortTypeStr[sortType], "-selected"));
            sortAllUsers(colIndex, sortType);
          } else {
            sortAllUsers(-1, 0);
          }
        } else {
          dupCount = 0;
          sortAllUsers(colIndex, sortType);
        }

        preColIndex = colIndex;
        preSortType = sortType;
      });
      icons.children[sortType].addEventListener('mouseenter', function () {
        icons.children[sortType].classList.add("mnuser-cell-sort-".concat(sortTypeStr[sortType], "-hover"));
      });
      icons.children[sortType].addEventListener('mouseleave', function () {
        icons.children[sortType].classList.remove("mnuser-cell-sort-".concat(sortTypeStr[sortType], "-hover"));
      });
    };

    for (var sortType = 0; sortType < icons.children.length; ++sortType) {
      _loop(sortType);
    }
  });
}

function eventRowUsers() {
  userRowElements.forEach(function (row) {
    row.addEventListener('click', function () {
      if (row.children[COL.ROLE].innerHTML === 'user') {
        Swal.fire({
          icon: 'info',
          title: 'Cảnh báo',
          html: 'Mọi thay đổi của bạn không thể khôi phục lại!',
          confirmButtonText: 'Lịch sử giao dịch',
          showDenyButton: true,
          denyButtonText: 'Xóa',
          showCancelButton: true,
          cancelButtonText: 'Trở lại'
        }).then(function (result) {
          if (result.isConfirmed) {
            window.open("/admin/manageUser/transaction-history/".concat(row.children[COL.ID].innerHTML));
          } else if (result.isDenied) {
            removeAUser(row);
          }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Cảnh báo',
          html: 'Loại tài khoản này không thể truy cập!',
          confirmedButtonText: 'Trở lại'
        });
      }
    });
  });
}

function handleEvents() {
  eventDisplayCheckboxes();
  eventSorting();
} // ===== Main =====


function main() {
  initTable();
  refreshTable();
  refreshDisplay();
  handleEvents();
}

main();