$('document').ready(() => {
  console.log('Ahihi');

  $('.city-chooser').each(function () {
    const citySelected = parseInt($('#regCity option:first-child', this).val(), 10);
    const districtSelected = parseInt($('#regTown option:first-child', this).val(), 10);

    console.log(citySelected);
    console.log(districtSelected);

    if (citySelected !== -1) {
      $('select#regCity option:first-child', this).remove();
      $(`select#regCity option[value="${citySelected}"]`).prop('selected', true);

      if (districtSelected !== -1) {
        const districtInnerHTML = $('select#regTown', this);
        districtInnerHTML.empty();

        arr[citySelected].forEach((district, id) => {
          districtInnerHTML.append(
            `<option value=${
              id}>${
              district}</option>`,
          );
        });
        districtInnerHTML.prop('disabled', false);
        $(`select#regTown option[value="${districtSelected}"]`).prop('selected', true);
      }
    }
  });
});

$('.city-chooser').each(function () {
  $('#regCity', this).on('change', function () {
    const citySelected = this.value;
    const districtInnerHTML = $(this).siblings('#regTown');
    districtInnerHTML.empty();

    arr[citySelected].forEach((district, id) => {
      districtInnerHTML.append(
        `<option value=${
          id}>${
          district}</option>`,
      );
    });

    $(this).siblings('#regTown option:first-child').prop('selected', true);
    districtInnerHTML.prop('disabled', false);
  });
});
