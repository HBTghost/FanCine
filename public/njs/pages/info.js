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
})();
