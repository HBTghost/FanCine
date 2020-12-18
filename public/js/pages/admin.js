$(document).ready(function(){$('#sidebarCollapse').on('click',function(){$('#sidebar').toggleClass('active');});});
$('li').click(function () {
  $('li.active').removeClass('active');
  $(this).addClass('active');
});