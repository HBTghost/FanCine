$('document').ready(() => {
  console.log('Ahihi');

  $('.city-chooser').each(function () {
    const citySelected = parseInt($('#regCity2 option:first-child', this).val(), 10);
    const districtSelected = parseInt($('#regTown2 option:first-child', this).val(), 10);

    console.log(citySelected);
    console.log(districtSelected);

    if (citySelected !== -1) {
      $('select#regCity2 option:first-child', this).remove();
      $(`select#regCity2 option[value="${citySelected}"]`).prop('selected', true);

      if (districtSelected !== -1) {
        const districtInnerHTML = $('select#regTown2', this);
        districtInnerHTML.empty();

        arr[citySelected].forEach((district, id) => {
          districtInnerHTML.append(
            `<option value=${
              id}>${
              district}</option>`,
          );
        });
        districtInnerHTML.prop('disabled', false);
        $(`select#regTown2 option[value="${districtSelected}"]`).prop('selected', true);
      }
    }
  });
});

$('.city-chooser').each(function () {
  $('#regCity2', this).on('change', function () {
    const citySelected = this.value;
    $(this).siblings().empty();

    arr[citySelected].forEach((district, id) => {
      $(this).siblings().append(
        `<option value=${
          id}>${
          district}</option>`,
      );
    });

    $(this).siblings().prop('disabled', false);
  });
});
