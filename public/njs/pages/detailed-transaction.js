const createdAtInfoElement = document.querySelector('.dettrans-info-sec-item-created-at');
createdAtInfoElement.innerHTML = new Date(createdAtInfoElement.innerHTML).toLocaleString('en-GB');
