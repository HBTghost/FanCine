"use strict";

$('document').ready(function () {
  console.log('Ahihi');
  $('.city-chooser').each(function () {
    var citySelected = parseInt($('#regCity2 option:first-child', this).val(), 10);
    var districtSelected = parseInt($('#regTown2 option:first-child', this).val(), 10);
    console.log(citySelected);
    console.log(districtSelected);

    if (citySelected !== -1) {
      $('select#regCity2 option:first-child', this).remove();
      $("select#regCity2 option[value=\"".concat(citySelected, "\"]")).prop('selected', true);

      if (districtSelected !== -1) {
        var districtInnerHTML = $('select#regTown2', this);
        districtInnerHTML.empty();
        arr[citySelected].forEach(function (district, id) {
          districtInnerHTML.append("<option value=".concat(id, ">").concat(district, "</option>"));
        });
        districtInnerHTML.prop('disabled', false);
        $("select#regTown2 option[value=\"".concat(districtSelected, "\"]")).prop('selected', true);
      }
    }
  });
});
$('.city-chooser').each(function () {
  $('#regCity2', this).on('change', function () {
    var _this = this;

    var citySelected = this.value;
    $(this).siblings().empty();
    arr[citySelected].forEach(function (district, id) {
      $(_this).siblings().append("<option value=".concat(id, ">").concat(district, "</option>"));
    });
    $(this).siblings().prop('disabled', false);
  });
});