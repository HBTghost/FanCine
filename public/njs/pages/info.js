window.gc_params = {
  graphcomment_id: 'fancine',
};

(function () {
  const gc = document.createElement('script');
  gc.type = 'text/javascript';
  gc.async = true;
  gc.src = `https://graphcomment.com/js/integration.js?${Math.round(Math.random() * 1e8)}`;
  (
    document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]
  ).appendChild(gc);
}());

function confirmGotoShowtime() {
  Swal.fire({
    title: 'Thông tin',
    icon: 'info',
    html:
      '<p>Hiện tại chức năng xem lịch chiếu trực tiếp vẫn đang được hoàn thiện.</p><p>Bạn có muốn chuyển hướng đến trang <b>Mua vé</b> để xem lịch chiếu đầy đủ không?',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Có, chuyển hướng',
    showCancelButton: true,
    cancelButtonColor: '#99A3A4',
    cancelButtonText: 'Không, tôi muốn ở đây',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location = '/showtimes';
    }
  });
}

function toggleRate(event) {
  event.preventDefault();
  $('.rating').toggleClass('show');
}

$('.rating').on('change', (ev, data) => {
  console.log(data.from, data.to);
});
