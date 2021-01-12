"use strict";

// ===== HTML elements =====
var movieRowElements = document.querySelectorAll('#mnmovie-table tbody tr');
var tableRowElements = document.querySelectorAll('#mnmovie-table tr');
var tableBodyElement = document.querySelector('#mnmovie-table tbody');
var displayCheckboxElements = document.querySelectorAll('#mnmovie-display .mmnmovie-display-item input'); // ===== Functions =====

function showTableColumn(colIndex) {
  tableRowElements.forEach(function (e) {
    e.children[colIndex].style.display = 'table-cell';
  });
}

function hideTableColumn(colIndex) {
  tableRowElements.forEach(function (e) {
    e.children[colIndex].style.display = 'none';
  });
}

function refreshDisplay() {
  displayCheckboxElements.forEach(function (e, i) {
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
    $('.modal-content').find('.edit').each(function () {
      if (jQuery(this).hasClass('descriptionField')) {
        var value = jQuery(this).text();
        jQuery(this).text('');
        jQuery(this).append("<textarea class=\"form-control\" rows=\"8\">".concat(value, "</textarea>"));
      } else {
        var _value = jQuery(this).text();

        jQuery(this).text('');
        jQuery(this).append("<input class=\"textfield\" type=\"text\" value=\"".concat(_value, "\" />"));
      }
    });
  } else {
    $('.modal-content').removeClass('editing');
    $('#edit').text('Edit');
    $('#button-submit').css('display', 'inline-block');
    $('#close').css('display', 'inline-block');
    $('.modal-content').find('.edit').each(function () {
      if (!jQuery(this).hasClass('descriptionField')) {
        var value = $(this).find('INPUT').val();
        $(this).text(value);
        $(this).find('INPUT').remove();
      } else {
        var _value2 = $(this).find('TEXTAREA').val();

        $(this).text(_value2);
        $(this).find('TEXTAREA').remove();
      }
    });
  }
}

function submitModal() {
  var theForm;
  var id;
  var originalName;
  var vietnameseName;
  var label;
  var time;
  var producer;
  var category;
  var cast;
  var nation;
  var director;
  var date;
  var description; // Start by creating a <form>

  theForm = document.createElement('form');
  theForm.action = '/admin/manageMovie/update';
  theForm.method = 'post'; // Next create the <input>s in the form and give them names and values

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
  description.value = $('.descriptionField').text(); // Now put everything together...

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
  theForm.appendChild(description); // ...and it to the DOM...

  document.getElementById('hidden_form_container').appendChild(theForm); // ...and submit it

  theForm.submit();
} // ===== Events =====


function eventDisplayCheckboxes() {
  displayCheckboxElements.forEach(function (e, i) {
    e.addEventListener('click', function () {
      if (e.checked === true) {
        showTableColumn(i + 1);
      } else {
        hideTableColumn(i + 1);
      }
    });
  });
}

function eventRowMovies() {
  movieRowElements.forEach(function (row) {
    row.addEventListener('click', function () {
      var _id = row.children[13].innerHTML;
      fetch("/api/movies/".concat(_id)).then(function (res) {
        res.json().then(function (data) {
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

          for (var i = 1; i < data.category.length; i += 1) {
            $('.categoryField').append(", ".concat(data.category[i]));
          }

          $('.castField').html(data.cast[0]);

          for (var _i = 1; _i < data.cast.length; _i += 1) {
            $('.castField').append(", ".concat(data.cast[_i]));
          }

          $('.nationField').html(data.nation);
          $('.directorField').html(data.director);
          $('.dateField').html(data.date);
          $('.descriptionField').html(data.description[0]);

          for (var _i2 = 1; _i2 < data.description.length; _i2 += 1) {
            $('.descriptionField').append("<br>".concat(data.description[_i2]));
          }

          $('#trailerEmbedIDField').html("https://www.youtube.com/embed/".concat(data.trailerEmbedID));
          $('#video-trailer').attr('src', "https://www.youtube.com/embed/".concat(data.trailerEmbedID)); // $('.imageSourceField').html(data.imageSource);
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
} // ===== Main =====


function main() {
  refreshDisplay();
  handleEvents();
}

main();