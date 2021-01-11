"use strict";

// ===== HTML elements =====
var theaterRowElements = document.querySelectorAll('#mntheater-table tbody tr');
var tableRowElements = document.querySelectorAll('#mntheater-table tr');
var tableBodyElement = document.querySelector('#mntheater-table tbody');
var displayCheckboxElements = document.querySelectorAll('#mntheater-display .mmntheater-display-item input'); // Global variables

var COL = Object.freeze({
  NAME: 1,
  CITY: 2,
  ADDRESS: 3,
  PHONE: 4,
  ROOMS: 5,
  ID: 6
}); // ===== Functions =====

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
    $('#edit').text('Save');
    $('.modal-content').find('.edit').each(function () {
      if (jQuery(this).is('#mapid')) {
        var value = jQuery(this).text();
        jQuery(this).text('');
        jQuery(this).append("<textarea class=\"form-control\" rows=\"3\" id=\"mapEmbedID\" name=\"mapEmbedID\" onchange=\"updateMap();\" required>".concat(value, "</textarea>"));
      } else if (jQuery(this).hasClass('desField')) {
        var _value = jQuery(this).text();

        jQuery(this).text('');
        jQuery(this).append("<textarea class=\"form-control\" rows=\"6\">".concat(_value, "</textarea>"));
      } else {
        var _value2 = jQuery(this).text();

        jQuery(this).text('');
        jQuery(this).append("<input class=\"textfield\" type=\"text\" value=\"".concat(_value2, "\" />"));
      }
    });
  } else {
    $('.modal-content').removeClass('editing');
    $('#edit').text('Edit');
    $('.modal-content').find('.edit').each(function () {
      if (!jQuery(this).is('#mapid') && !jQuery(this).hasClass('desField')) {
        var value = $(this).find('INPUT').val();
        $(this).text(value);
        $(this).find('INPUT').remove();
      } else {
        var _value3 = $(this).find('TEXTAREA').val();

        $(this).text(_value3);
        $(this).find('TEXTAREA').remove();
      }
    });
  }
}

function updateMap() {
  var result;
  result = "".concat(document.getElementById('mapEmbedID').value);
  document.getElementById('Map').src = result;
}

function submitModal() {
  var theForm;
  var id;
  var namefield;
  var city;
  var address;
  var phone;
  var description; // Start by creating a <form>

  theForm = document.createElement('form');
  theForm.action = "/admin/manageTheater/update/".concat($('.idField').text());
  theForm.method = 'post'; // Next create the <input>s in the form and give them names and values

  id = document.createElement('input');
  id.type = 'hidden';
  id.name = 'id';
  id.value = $('.idField').text();
  namefield = document.createElement('input');
  namefield.type = 'hidden';
  namefield.name = 'namefield';
  namefield.value = $('.nameField').text();
  city = document.createElement('input');
  city.type = 'hidden';
  city.name = 'city';
  city.value = $('.cityField').text();
  address = document.createElement('input');
  address.type = 'hidden';
  address.name = 'address';
  address.value = $('.addressField').text();
  phone = document.createElement('input');
  phone.type = 'hidden';
  phone.name = 'phone';
  phone.value = $('.phoneField').text();
  description = document.createElement('input');
  description.type = 'hidden';
  description.name = 'description';
  description.value = $('.desField').text(); // Now put everything together...

  theForm.appendChild(id);
  theForm.appendChild(namefield);
  theForm.appendChild(city);
  theForm.appendChild(address);
  theForm.appendChild(phone);
  theForm.appendChild(description);
  console.log(id.value);
  console.log(namefield.value);
  console.log(city.value);
  console.log(address.value);
  console.log(phone.value);
  console.log(description.value); // ...and it to the DOM...

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

function eventRowTheaters() {
  theaterRowElements.forEach(function (row) {
    row.addEventListener('click', function () {
      var _id = row.children[COL.ID].innerHTML;
      fetch("/api/theaters/".concat(_id)).then(function (res) {
        res.json().then(function (data) {
          $('h2').html(data.name);
          $('.idField').html(_id);
          $('.nameField').html(data.name);
          $('.cityField').html(data.city);
          $('.addressField').html(data.address);
          $('.phoneField').html(data.phone);
          $('.roomField').html(data.rooms[0]);

          for (var i = 1; i < data.rooms.length; i += 1) {
            $('.roomField').append(", ".concat(data.rooms[i]));
          }

          $('.desField').html(data.description);
          $('#mapid').html("https://www.google.com/maps/embed?pb=".concat(data.mapEmbedID));
          $('#Map').attr('src', "https://www.google.com/maps/embed?pb=".concat(data.mapEmbedID));
          openModal();
        });
      });
    });
  });
}

function handleEvents() {
  eventDisplayCheckboxes();
  eventRowTheaters();
} // ===== Main =====


function main() {
  refreshDisplay();
  handleEvents();
}

main();