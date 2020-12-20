function removeUserFromDatabase(todo) {
  const _id = todo.firstElementChild.innerHTML;
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
          todo.classList.add('fall');
          todo.ontransitionend = (e) => todo.remove();
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            html: 'Xóa user thành công',
          });
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
    Swal.fire({
      title: 'Cảnh báo',
      icon: 'warning',
      html: `Bạn có chắc chắn xóa user <b>${todo.innerText}</b> không?`,
      confirmButtonColor: '#E74C3C',
      confirmButtonText: 'Chắc chắn',
      showCancelButton: true,
      cancelButtonColor: '#99A3A4',
      cancelButtonText: 'Không',
    }).then((result) => {
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
