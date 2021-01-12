// ===== HTML elements =====
let reviewRowElements = document.querySelectorAll('#mnmovie-table tbody tr');
let tableRowElements = document.querySelectorAll('#mnmovie-table tr');
const tableBodyElement = document.querySelector('#mnmovie-table tbody');
const displayCheckboxElements = document.querySelectorAll(
  '#mnmovie-display .mmnmovie-display-item input',
);

// ===== Global variable =====
const COL = Object.freeze({
  ORDER: 0,
  ONAME: 1,
  VNAME: 2,
  TITLE: 3,
  AUTHOR: 4,
  ID: 5,
});

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

function eventRowReviews() {
  reviewRowElements.forEach((row) => {
    row.addEventListener('click', () => {
      Swal.fire({
        icon: 'info',
        title: 'Cảnh báo',
        html: 'Mọi thay đổi của bạn chỉ có thể khôi phục lại bằng tay với cơ sở dữ liệu!',
        confirmButtonText: 'Xóa',
        showCancelButton: true,
        cancelButtonText: 'Trở lại',
      }).then((result) => {
        if (result.isConfirmed) {
          removeAReview(row);
        }
      });
    });
  });
}

function handleEvents() {
  eventDisplayCheckboxes();
}

function removeAReview(row) {
  Swal.fire({
    title: 'Cảnh báo',
    icon: 'warning',
    html: 'Ba&#803;n co&#769; ch&#259;&#769;c xo&#769;a ba&#768;i vi&ecirc;&#769;t <b>'.concat(row.children[COL.TITLE].innerHTML, '</b> kh\xF4ng?'),
    confirmButtonColor: '#E74C3C',
    confirmButtonText: 'Chắc chắn',
    showCancelButton: true,
    cancelButtonColor: '#99A3A4',
    cancelButtonText: 'Không',
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(row);
      removeReviewFromDatabase(row);
    }
  });
}

// ===== Main =====
function main() {
  refreshDisplay();
  handleEvents();
  eventRowReviews();
}

function refreshTable() {
  reviewRowElements = document.querySelectorAll('#mnuser-table tbody tr');
  tableRowElements = document.querySelectorAll('#mnuser-table tr');
  eventRowReviews();
}

function removeReviewFromDatabase(row) {
  const _id = row.children[COL.ID].innerHTML;

  try {
    fetch('/api/reviews/'.concat(_id), {
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
            html: 'Xóa review thành công',
          });
          refreshTable();
        }
      });
    });
  } catch (err) {
    return false;
  }
}

main();
