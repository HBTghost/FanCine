"use strict";

// Colors
var colorWhite = '#fff';
var colorLightgray = '#f1f1f1';
var colorDarkgray = '#a0a3a7';
var colorBlack = '#000';
var colorOrange = '#f26b38'; // HTML Elements

var movieTabBtn = document.getElementById('showtimes-controller-movie');
var theaterTabBtn = document.getElementById('showtimes-controller-theater');
var mainContainer = document.getElementById('showtimes-main');
var moviesCol = document.getElementById('showtimes-col-movie');
var theatersCol = document.getElementById('showtimes-col-theater');
var showtimesCol = document.getElementById('showtimes-col-showtime');
var moviesList = document.querySelector('#showtimes-col-movie .showtimes-row-list');
var theatersList = document.querySelector('#showtimes-col-theater .showtimes-row-list');
var showtimesList = document.querySelector('#showtimes-col-showtime .showtimes-row-list');
var moviesListNoti = moviesList.firstElementChild;
var theatersListNoti = theatersList.firstElementChild;
var showtimesListNotiTheater = showtimesList.firstElementChild;
var showtimesListNotiMovie = showtimesList.lastElementChild;
var movieItems;
var curMovieItemIndex = 0;
var curMovieID = '';
console.log(curMovieID);
var theaterItems;
var curTheaterItemIndex = 0;
var curTheaterID = '';
console.log(curTheaterID); // Handle

fetch('/sample/showtimes').then(function (partial) {
  partial.text().then(function (html) {
    // Load the sample data
    var sampleData = new DOMParser().parseFromString(html, 'text/html'); // Display list of movies

    moviesList.innerHTML = sampleData.getElementById('showtimes-movies').innerHTML;
    showtimesList.innerHTML = '';
    showtimesList.appendChild(showtimesListNotiTheater); // Handle the Movie/Theater/Showtime items event

    function clickTheaterItemMovie(newIndex) {
      theaterItems[curTheaterItemIndex].style.backgroundColor = colorWhite;
      theaterItems[newIndex].style.backgroundColor = colorLightgray;
      curTheaterItemIndex = newIndex;
      curTheaterID = theaterItems[newIndex].firstElementChild.innerHTML;
      showtimesList.innerHTML = sampleData.getElementById('showtimes-showtimes').innerHTML;
    }

    function clickMovieItemMovie(newIndex) {
      movieItems[curMovieItemIndex].style.backgroundColor = colorWhite;
      movieItems[newIndex].style.backgroundColor = colorLightgray;
      curMovieItemIndex = newIndex;
      curMovieID = movieItems[newIndex].firstElementChild.innerHTML;
      theatersList.innerHTML = sampleData.getElementById('showtimes-theaters').innerHTML;
      theaterItems = document.getElementsByClassName('showtimes-row-data-theater');

      var _loop = function _loop(i) {
        theaterItems[i].addEventListener('click', function () {
          clickTheaterItemMovie(i);
        });
      };

      for (var i = 0; i < theaterItems.length; ++i) {
        _loop(i);
      }
    }

    function clickMovieItemTheater(newIndex) {
      movieItems[curMovieItemIndex].style.backgroundColor = colorWhite;
      movieItems[newIndex].style.backgroundColor = colorLightgray;
      curMovieItemIndex = newIndex;
      curMovieID = movieItems[newIndex].firstElementChild.innerHTML;
      showtimesList.innerHTML = sampleData.getElementById('showtimes-showtimes').innerHTML;
    }

    function clickTheaterItemTheater(newIndex) {
      theaterItems[curTheaterItemIndex].style.backgroundColor = colorWhite;
      theaterItems[newIndex].style.backgroundColor = colorLightgray;
      curTheaterItemIndex = newIndex;
      curTheaterID = theaterItems[newIndex].firstElementChild.innerHTML;
      moviesList.innerHTML = sampleData.getElementById('showtimes-movies').innerHTML;
      movieItems = document.getElementsByClassName('showtimes-row-data-movie');

      var _loop2 = function _loop2(i) {
        movieItems[i].addEventListener('click', function () {
          clickMovieItemTheater(i);
        });
      };

      for (var i = 0; i < movieItems.length; ++i) {
        _loop2(i);
      }
    } // Add event for the movie items (first load)


    movieItems = document.getElementsByClassName('showtimes-row-data-movie');

    var _loop3 = function _loop3(i) {
      movieItems[i].addEventListener('click', function () {
        clickMovieItemMovie(i);
      });
    };

    for (var i = 0; i < movieItems.length; ++i) {
      _loop3(i);
    } // Handle the Movie tab event


    movieTabBtn.addEventListener('click', function () {
      theaterTabBtn.style.borderBottomColor = 'transparent';
      theaterTabBtn.style.color = colorDarkgray;
      movieTabBtn.style.borderBottomColor = colorOrange;
      movieTabBtn.style.color = colorBlack;
      mainContainer.innerHTML = '';
      mainContainer.appendChild(moviesCol);
      mainContainer.appendChild(theatersCol);
      mainContainer.appendChild(showtimesCol);
      theatersList.innerHTML = '';
      theatersList.appendChild(theatersListNoti);
      moviesList.innerHTML = sampleData.getElementById('showtimes-movies').innerHTML;
      showtimesList.innerHTML = '';
      showtimesList.appendChild(showtimesListNotiTheater);
      movieItems = document.getElementsByClassName('showtimes-row-data-movie');

      var _loop4 = function _loop4(_i) {
        movieItems[_i].addEventListener('click', function () {
          clickMovieItemMovie(_i);
        });
      };

      for (var _i = 0; _i < movieItems.length; ++_i) {
        _loop4(_i);
      }
    }); // Handle the Theater tab event

    theaterTabBtn.addEventListener('click', function () {
      movieTabBtn.style.borderBottomColor = 'transparent';
      movieTabBtn.style.color = colorDarkgray;
      theaterTabBtn.style.borderBottomColor = colorOrange;
      theaterTabBtn.style.color = colorBlack;
      mainContainer.innerHTML = '';
      mainContainer.appendChild(theatersCol);
      mainContainer.appendChild(moviesCol);
      mainContainer.appendChild(showtimesCol);
      moviesList.innerHTML = '';
      moviesList.appendChild(moviesListNoti);
      theatersList.innerHTML = sampleData.getElementById('showtimes-theaters').innerHTML;
      showtimesList.innerHTML = '';
      showtimesList.appendChild(showtimesListNotiMovie);
      theaterItems = document.getElementsByClassName('showtimes-row-data-theater');

      var _loop5 = function _loop5(_i2) {
        theaterItems[_i2].addEventListener('click', function () {
          clickTheaterItemTheater(_i2);
        });
      };

      for (var _i2 = 0; _i2 < theaterItems.length; ++_i2) {
        _loop5(_i2);
      }
    });
  });
});