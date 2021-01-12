// ===== HTML elements =====
const movieRowElements = document.querySelectorAll('#mnmovie-table tbody tr');
const tableRowElements = document.querySelectorAll('#mnmovie-table tr');
const tableBodyElement = document.querySelector('#mnmovie-table tbody');
const displayCheckboxElements = document.querySelectorAll(
  '#mnmovie-display .mmnmovie-display-item input',
);

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

function openModal() {
  $('#myModal').css('display', 'block');
}

function closeModal() {
  $('#myModal').css('display', 'none');
}

function editModal() {
  if (!$('.modal-content').hasClass('editing')) {
    $('.modal-content').addClass('editing');
    $('#button-submit').css('display', 'none');
    $('#close').css('display', 'none');
    $('#edit').text('Save');
    $('.modal-content')
      .find('.edit')
      .each(function () {
        if (jQuery(this).hasClass('descriptionField')) {
          const value = jQuery(this).text();
          jQuery(this).text('');
          jQuery(this).append(`<textarea class="form-control" rows="8">${value}</textarea>`);
        } else if (jQuery(this).is('#trailerembedidfield')) {
          const value = jQuery(this).text();
          jQuery(this).text('');
          jQuery(this).append(
            `<textarea class="form-control" rows="1" id="trailerEmbedID" onchange="updateVideo();">${value}</textarea>`,
          );
        } else {
          const value = jQuery(this).text();
          jQuery(this).text('');
          jQuery(this).append(`<input class="textfield" type="text" value="${value}" />`);
        }
      });
  } else {
    $('.modal-content').removeClass('editing');
    $('#edit').text('Edit');
    $('#button-submit').css('display', 'inline-block');
    $('#close').css('display', 'inline-block');
    $('.modal-content')
      .find('.edit')
      .each(function () {
        if (
          !jQuery(this).hasClass('descriptionField') &&
          !jQuery(this).is('#trailerembedidfield')
        ) {
          const value = $(this).find('INPUT').val();
          $(this).text(value);
          $(this).find('INPUT').remove();
        } else {
          const value = $(this).find('TEXTAREA').val();
          $(this).text(value);
          $(this).find('TEXTAREA').remove();
        }
      });
  }
}

function submitModal() {
  let theForm;
  let id;
  let originalName;
  let vietnameseName;
  let label;
  let time;
  let producer;
  let category;
  let cast;
  let nation;
  let director;
  let date;
  let description;
  let trailerEmbedID;

  // Start by creating a <form>
  theForm = document.createElement('form');
  theForm.action = '/admin/manageMovie/update';
  theForm.method = 'post';

  // Next create the <input>s in the form and give them names and values
  id = document.createElement('input');
  id.type = 'hidden';
  id.name = 'id';
  id.value = $('.idField').text();
  originalName = document.createElement('input');
  originalName.type = 'hidden';
  originalName.name = 'originalName';
  originalName.value = $('.originalNameField').text();
  vietnameseName = document.createElement('input');
  vietnameseName.type = 'hidden';
  vietnameseName.name = 'vietnameseName';
  vietnameseName.value = $('.vietnameseNameField').text();
  label = document.createElement('input');
  label.type = 'hidden';
  label.name = 'label';
  label.value = $('.labelField').text();
  time = document.createElement('input');
  time.type = 'hidden';
  time.name = 'time';
  time.value = $('.timeField').text();
  producer = document.createElement('input');
  producer.type = 'hidden';
  producer.name = 'producer';
  producer.value = $('.producerField').text();
  category = document.createElement('input');
  category.type = 'hidden';
  category.name = 'category';
  category.value = $('.categoryField').text();
  cast = document.createElement('input');
  cast.type = 'hidden';
  cast.name = 'cast';
  cast.value = $('.castField').text();
  nation = document.createElement('input');
  nation.type = 'hidden';
  nation.name = 'nation';
  nation.value = $('.nationField').text();
  director = document.createElement('input');
  director.type = 'hidden';
  director.name = 'director';
  director.value = $('.directorField').text();
  date = document.createElement('input');
  date.type = 'hidden';
  date.name = 'date';
  date.value = $('.dateField').text();
  description = document.createElement('input');
  description.type = 'hidden';
  description.name = 'description';
  description.value = $('.descriptionField').text();
  trailerEmbedID = document.createElement('input');
  trailerEmbedID.type = 'hidden';
  trailerEmbedID.name = 'trailerEmbedID';
  trailerEmbedID.value = $('#trailerembedidfield').text();
  trailerEmbedID.value = trailerEmbedID.value.replace('https://www.youtube.com/embed/', '');

  // Now put everything together...
  theForm.appendChild(id);
  theForm.appendChild(originalName);
  theForm.appendChild(vietnameseName);
  theForm.appendChild(label);
  theForm.appendChild(time);
  theForm.appendChild(producer);
  theForm.appendChild(category);
  theForm.appendChild(cast);
  theForm.appendChild(nation);
  theForm.appendChild(director);
  theForm.appendChild(date);
  theForm.appendChild(description);
  theForm.appendChild(trailerEmbedID);

  // ...and it to the DOM...
  document.getElementById('hidden_form_container').appendChild(theForm);
  // ...and submit it
  theForm.submit();
}

function updateVideo() {
  let result;
  result = `${document.getElementById('trailerEmbedID').value}`;
  document.getElementById('video-trailer').src = result;
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

function eventRowMovies() {
  movieRowElements.forEach((row) => {
    row.addEventListener('click', () => {
      const _id = row.children[13].innerHTML;
      fetch(`/api/movies/${_id}`).then((res) => {
        res.json().then((data) => {
          $('h2').html(data.originalName);
          $('.idField').html(_id);
          $('.originalNameField').html(data.originalName);
          $('.vietnameseNameField').html(data.vietnameseName);
          $('.ratingField').html(data.rating);
          $('.ratesField').html(data.rates);
          $('.labelField').html(data.label);
          $('.timeField').html(data.time);
          $('.producerField').html(data.producer);
          $('.categoryField').html(data.category[0]);
          for (let i = 1; i < data.category.length; i += 1) {
            $('.categoryField').append(`, ${data.category[i]}`);
          }
          $('.castField').html(data.cast[0]);
          for (let i = 1; i < data.cast.length; i += 1) {
            $('.castField').append(`, ${data.cast[i]}`);
          }
          $('.nationField').html(data.nation);
          $('.directorField').html(data.director);
          $('.dateField').html(data.date);
          $('.descriptionField').html(data.description[0]);
          for (let i = 1; i < data.description.length; i += 1) {
            $('.descriptionField').append(`<br>${data.description[i]}`);
          }
          $('#trailerembedidfield').html(`https://www.youtube.com/embed/${data.trailerEmbedID}`);
          $('#video-trailer').attr('src', `https://www.youtube.com/embed/${data.trailerEmbedID}`);
          // $('.imageSourceField').html(data.imageSource);
          // $('.horizontalImageSourceField').html(data.horizontalImageSource);
          openModal();
        });
      });
    });
  });
}

function handleEvents() {
  eventDisplayCheckboxes();
  eventRowMovies();
}

// ===== Main =====
function main() {
  refreshDisplay();
  handleEvents();
}

main();
