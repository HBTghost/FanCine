"use strict";

var colorWhite = '#fff';
var colorLightgray = '#f1f1f1';
var parser = new DOMParser();
var movieItems = document.getElementsByClassName('showtimes-row-data-film');
var curMovieItemIndex = 0;
var curMovieID = '';

function clickMovieItem(newIndex) {
  movieItems[curMovieItemIndex].style.backgroundColor = colorWhite;
  movieItems[newIndex].style.backgroundColor = colorLightgray;
  curMovieItemIndex = newIndex;
  curMovieID = movieItems[newIndex].firstElementChild.innerHTML;
  console.log(curMovieID);
}

var _loop = function _loop(i) {
  movieItems[i].addEventListener('click', function () {
    clickMovieItem(i);
    fetch('allTheaters').then(function (partial) {
      partial.text().then(function (html) {
        var doc = parser.parseFromString(html, 'text/html');
        document.querySelector('.theaters-in-showtimes').innerHTML = doc.querySelector('.theaters-in-showtimes').innerHTML;
      });
    });
  });
};

for (var i = 0; i < movieItems.length; ++i) {
  _loop(i);
}