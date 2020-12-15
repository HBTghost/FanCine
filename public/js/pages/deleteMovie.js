"use strict";

function removeMovieFromDatabase(_id) {
  try {
    fetch("/api/movies/".concat(_id), {
      method: 'DELETE'
    });
  } catch (err) {
    return false;
  }

  return true;
}

function removeMovie(event) {
  var item = event.target;
  var todo = item.parentElement;

  if (item.classList[0] === 'trash-btn') {
    if (confirm('Bạn có chắc chắn xóa phim này không?')) {
      var _id = todo.firstElementChild.innerHTML;

      if (removeMovieFromDatabase(_id)) {
        todo.classList.add('fall');

        todo.ontransitionend = function (e) {
          return todo.remove();
        };
      }
    }
  } else if (item.classList[0] === 'edit-btn') {
    todo.classList.toggle('completed'); // todo.classList.add('fall');
    // todo.ontransitionend = (e) => todo.remove();
  } else if (item.classList[0] === 'complete-btn') {
    todo.classList.toggle('completed');
  }
}