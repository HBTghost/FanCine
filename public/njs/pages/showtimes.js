const colorWhite = '#fff';
const colorLightgray = '#f1f1f1';

const movieItems = document.getElementsByClassName('showtimes-row-data-film');
let curMovieItemIndex = 0;
let curMovieID = '';

function clickMovieItem(newIndex) {
  movieItems[curMovieItemIndex].style.backgroundColor = colorWhite;
  movieItems[newIndex].style.backgroundColor = colorLightgray;
  curMovieItemIndex = newIndex;
  curMovieID = movieItems[newIndex].firstElementChild.innerHTML;
  console.log(curMovieID);
}

for (let i = 0; i < movieItems.length; ++i) {
  movieItems[i].addEventListener('click', () => {
    clickMovieItem(i);
  });
}
