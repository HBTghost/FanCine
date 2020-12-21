"use strict";

function removeMovieFromDatabase(todo) {
  var _id = todo.firstElementChild.innerHTML;

  try {
    fetch("/api/movies/".concat(_id), {
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
            html: 'Xóa phim thành công'
          });
        }
      });
    });
  } catch (err) {
    return false;
  }
}

function removeMovie(event) {
  var item = event.target;
  var todo = item.parentElement;

  if (item.classList[0] === 'trash-btn') {
    Swal.fire({
      title: 'Cảnh báo',
      icon: 'warning',
      html: "B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn x\xF3a phim <b>".concat(todo.innerText, "</b> kh\xF4ng?"),
      confirmButtonColor: '#E74C3C',
      confirmButtonText: 'Chắc chắn',
      showCancelButton: true,
      cancelButtonColor: '#99A3A4',
      cancelButtonText: 'Không'
    }).then(function (result) {
      if (result.isConfirmed) {
        removeMovieFromDatabase(todo);
      }
    });
  } else if (item.classList[0] === 'edit-btn') {
    todo.classList.toggle('completed'); // todo.classList.add('fall');
    // todo.ontransitionend = (e) => todo.remove();
  } else if (item.classList[0] === 'complete-btn') {
    todo.classList.toggle('completed');
  }
}