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
  } else {
    $('.modal-content').removeClass('editing');
    $('#edit').text('Edit');
    $('#button-submit').css('display', 'inline-block');
    $('#close').css('display', 'inline-block');
  }
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
            $('.descriptionField').append("\n".concat(data.description[_i2]));
          } // $('.trailerEmbedIDField').html(data.trailerEmbedID);
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
} // ===== Main =====


function main() {
  refreshDisplay();
  handleEvents();
}

main();