"use strict";

function removeUserFromDatabase(todo) {
  var _id = todo.firstElementChild.innerHTML;

  try {
    fetch("/api/users/".concat(_id), {
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

function removeUser(event) {
  var item = event.target;
  var todo = item.parentElement;

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