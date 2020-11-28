// Colors
const colorWhite = '#fff';
const colorLightgray = '#f1f1f1';
const colorDarkgray = '#a0a3a7';
const colorBlack = '#000';
const colorOrange = '#f26b38';

// HTML Elements
const movieTabBtn = document.getElementById('showtimes-controller-movie');
const theaterTabBtn = document.getElementById('showtimes-controller-theater');
const mainContainer = document.getElementById('showtimes-main');
const moviesCol = document.getElementById('showtimes-col-movie');
const theatersCol = document.getElementById('showtimes-col-theater');
const showtimesCol = document.getElementById('showtimes-col-showtime');
const moviesList = document.querySelector('#showtimes-col-movie .showtimes-row-list');
const theatersList = document.querySelector('#showtimes-col-theater .showtimes-row-list');
const showtimesList = document.querySelector('#showtimes-col-showtime .showtimes-row-list');
const moviesListNoti = moviesList.firstElementChild;
const theatersListNoti = theatersList.firstElementChild;
const showtimesListNotiTheater = showtimesList.firstElementChild;
const showtimesListNotiMovie = showtimesList.lastElementChild;

let movieItems;
let curMovieItemIndex = 0;
let curMovieID = '';
console.log(curMovieID);

let theaterItems;
let curTheaterItemIndex = 0;
let curTheaterID = '';
console.log(curTheaterID);

// Handle
fetch('/sample/showtimes').then((partial) => {
  partial.text().then((html) => {
    // Load the sample data
    const sampleData = (new DOMParser()).parseFromString(html, 'text/html');

    // Display list of movies
    moviesList.innerHTML = sampleData.getElementById('showtimes-movies').innerHTML;
    showtimesList.innerHTML = '';
    showtimesList.appendChild(showtimesListNotiTheater);

    // Handle the Movie/Theater/Showtime items event
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
      for (let i = 0; i < theaterItems.length; ++i) {
        theaterItems[i].addEventListener('click', () => {
          clickTheaterItemMovie(i);
        });
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
      for (let i = 0; i < movieItems.length; ++i) {
        movieItems[i].addEventListener('click', () => {
          clickMovieItemTheater(i);
        });
      }
    }

    // Add event for the movie items (first load)
    movieItems = document.getElementsByClassName('showtimes-row-data-movie');
    for (let i = 0; i < movieItems.length; ++i) {
      movieItems[i].addEventListener('click', () => {
        clickMovieItemMovie(i);
      });
    }

    // Handle the Movie tab event
    movieTabBtn.addEventListener('click', () => {
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
      for (let i = 0; i < movieItems.length; ++i) {
        movieItems[i].addEventListener('click', () => {
          clickMovieItemMovie(i);
        });
      }
    });

    // Handle the Theater tab event
    theaterTabBtn.addEventListener('click', () => {
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
      for (let i = 0; i < theaterItems.length; ++i) {
        theaterItems[i].addEventListener('click', () => {
          clickTheaterItemTheater(i);
        });
      }
    });
  });
});
