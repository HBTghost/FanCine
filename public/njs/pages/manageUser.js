// ===== HTML elements =====
let userRowElements = document.querySelectorAll('#mnuser-table tbody tr');
let tableRowElements = document.querySelectorAll('#mnuser-table tr');
const tableBodyElement = document.querySelector('#mnuser-table tbody');
const displayCheckboxElements = document.querySelectorAll(
  '#mnuser-display .mmnuser-display-item input',
);
const sortingIconsElements = document.querySelectorAll('.mnuser-cell-sort');

// Global variables
const COL = Object.freeze({
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
  ID: 11,
});

const parser = new DOMParser();

let preColIndex;
let preSortType;

// ===== Functions =====
function removeUserFromDatabase(row) {
  const _id = row.children[COL.ID].innerHTML;
  try {
    fetch(`/api/users/${_id}`, {
      method: 'DELETE',
    }).then((res) => {
      res.json().then((data) => {
        if (data.message) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: data.message,
          });
        } else {
          row.remove();
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            html: 'Xóa tài khoản thành công',
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
    html: `Bạn có chắc chắn xóa tài khoản <b>${row.children[COL.EMAIL].innerHTML}</b> không?`,
    confirmButtonColor: '#E74C3C',
    confirmButtonText: 'Chắc chắn',
    showCancelButton: true,
    cancelButtonColor: '#99A3A4',
    cancelButtonText: 'Không',
  }).then((result) => {
    if (result.isConfirmed) {
      removeUserFromDatabase(row);
    }
  });
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

function formatExpenseValues() {
  userRowElements.forEach((e) => {
    e.children[COL.EXPENSE].innerHTML = parseInt(
      e.children[COL.EXPENSE].innerHTML,
      10,
    ).toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
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

  displayCheckboxElements.forEach((e, i) => {
    if (e.checked === false) {
      hideTableColumn(i);
    }
  });
}

function sortAllUsers(colIndex, sortType) {
  fetch(`/admin/manageUser/sort/${colIndex}/${sortType}`).then((partial) => {
    partial.text().then((html) => {
      const usersData = parser.parseFromString(html, 'text/html');
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
  sortingIconsElements[preColIndex].children[preSortType].classList.add(
    'mnuser-cell-sort-asc-selected',
  );
  sortAllUsers(preColIndex, preSortType);
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

function eventSorting() {
  const sortTypeStr = ['asc', 'desc'];
  let dupCount = 0;

  sortingIconsElements.forEach((icons, colIndex) => {
    for (let sortType = 0; sortType < icons.children.length; ++sortType) {
      icons.children[sortType].addEventListener('click', () => {
        icons.children[sortType].classList.add(
          `mnuser-cell-sort-${sortTypeStr[sortType]}-selected`,
        );
        sortingIconsElements[preColIndex].children[preSortType].classList.remove(
          `mnuser-cell-sort-${sortTypeStr[preSortType]}-selected`,
        );

        if (preColIndex === colIndex && preSortType === sortType) {
          dupCount += 1;
          if (dupCount % 2 === 0) {
            icons.children[sortType].classList.add(
              `mnuser-cell-sort-${sortTypeStr[sortType]}-selected`,
            );
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

      icons.children[sortType].addEventListener('mouseenter', () => {
        icons.children[sortType].classList.add(`mnuser-cell-sort-${sortTypeStr[sortType]}-hover`);
      });
      icons.children[sortType].addEventListener('mouseleave', () => {
        icons.children[sortType].classList.remove(
          `mnuser-cell-sort-${sortTypeStr[sortType]}-hover`,
        );
      });
    }
  });
}

function eventRowUsers() {
  // userRowElements.forEach((row) => {
  //   row.addEventListener('click', () => {
  //     if (row.children[COL.ROLE].innerHTML === 'user') {
  //       Swal.fire({
  //         icon: 'info',
  //         title: 'Cảnh báo',
  //         html: 'Mọi thay đổi của bạn không thể khôi phục lại!',
  //         confirmButtonText: 'Xóa',
  //         showCancelButton: true,
  //         cancelButtonText: 'Trở lại',
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           removeAUser(row);
  //         }
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: 'warning',
  //         title: 'Cảnh báo',
  //         html: 'Loại tài khoản này không thể truy cập!',
  //         confirmedButtonText: 'Trở lại',
  //       });
  //     }
  //   });
  // });
}

function handleEvents() {
  eventDisplayCheckboxes();
  eventSorting();
}

// ===== Main =====
function main() {
  initTable();
  refreshTable();
  refreshDisplay();
  handleEvents();
}

main();
