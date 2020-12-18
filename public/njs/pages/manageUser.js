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
