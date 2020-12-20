"use strict";

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