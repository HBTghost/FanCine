"use strict";

var colorWhite = '#fff';
var colorLightgray = '#f1f1f1';
var movieItems = document.getElementsByClassName('showtimes-row-data-film');
var curMovieItemIndex = 0;
var curMovieID = '';

function clickMovieItem(newIndex) {
  movieItems[curMovieItemIndex].style.backgroundColor = colorWhite;
  movieItems[newIndex].style.backgroundColor = colorLightgray;
  curMovieItemIndex = newIndex;
  curMovieID = movieItems[newIndex].firstElementChild.innerHTML;
  console.log(curMovieID);
  fetch("api/theaters_movies/findByMovie/".concat(curMovieID)).then(function (response) {
    response.json().then(function (json) {
      console.log(json);
    });
  });
}

var _loop = function _loop(i) {
  movieItems[i].addEventListener('click', function () {
    clickMovieItem(i);
  });
};

for (var i = 0; i < movieItems.length; ++i) {
  _loop(i);
}