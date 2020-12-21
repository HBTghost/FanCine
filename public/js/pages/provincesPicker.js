"use strict";

$('document').ready(function () {
  console.log('Ahihi');
  $('.city-chooser').each(function () {
    var citySelected = parseInt($('#regCity option:first-child', this).val(), 10);
    var districtSelected = parseInt($('#regTown option:first-child', this).val(), 10);
    console.log(citySelected);
    console.log(districtSelected);

    if (citySelected !== -1) {
      $('select#regCity option:first-child', this).remove();
      $("select#regCity option[value=\"".concat(citySelected, "\"]")).prop('selected', true);

      if (districtSelected !== -1) {
        var districtInnerHTML = $('select#regTown', this);
        districtInnerHTML.empty();
        arr[citySelected].forEach(function (district, id) {
          districtInnerHTML.append("<option value=".concat(id, ">").concat(district, "</option>"));
        });
        districtInnerHTML.prop('disabled', false);
        $("select#regTown option[value=\"".concat(districtSelected, "\"]")).prop('selected', true);
      }
    }
  });
});
$('.city-chooser').each(function () {
  $('#regCity', this).on('change', function () {
    var citySelected = this.value;
    var districtInnerHTML = $(this).siblings('#regTown');
    districtInnerHTML.empty();
    arr[citySelected].forEach(function (district, id) {
      districtInnerHTML.append("<option value=".concat(id, ">").concat(district, "</option>"));
    });
    $(this).siblings('#regTown option:first-child').prop('selected', true);
    districtInnerHTML.prop('disabled', false);
  });
});