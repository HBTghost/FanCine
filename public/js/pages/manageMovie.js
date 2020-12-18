"use strict";

function removeMovieFromDatabase(todo) {
  var _id = todo.firstElementChild.innerHTML;

  try {
    fetch("/api/movies/".concat(_id), {
      method: 'DELETE'
    }).then(function (res) {
      res.json().then(function (data) {
        if (data.message) {
          alert(data.message);
        } else {
          todo.classList.add('fall');

          todo.ontransitionend = function (e) {
            return todo.remove();
          };
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
    if (confirm('Bạn có chắc chắn xóa phim này không?')) {
      removeMovieFromDatabase(todo);
    }
  } else if (item.classList[0] === 'edit-btn') {
    todo.classList.toggle('completed'); // todo.classList.add('fall');
    // todo.ontransitionend = (e) => todo.remove();
  } else if (item.classList[0] === 'complete-btn') {
    todo.classList.toggle('completed');
  }
}