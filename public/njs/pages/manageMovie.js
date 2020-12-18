function removeMovieFromDatabase(todo) {
  const _id = todo.firstElementChild.innerHTML;
  try {
    fetch(`/api/movies/${_id}`, {
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

function removeMovie(event) {
  const item = event.target;
  const todo = item.parentElement;
  if (item.classList[0] === 'trash-btn') {
    if (confirm('Bạn có chắc chắn xóa phim này không?')) {
      removeMovieFromDatabase(todo);
    }
  } else if (item.classList[0] === 'edit-btn') {
    todo.classList.toggle('completed');
    // todo.classList.add('fall');
    // todo.ontransitionend = (e) => todo.remove();
  } else if (item.classList[0] === 'complete-btn') {
    todo.classList.toggle('completed');
  }
}
