import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all';

import '../scss/app.scss';

import axios from 'axios';
import Handlebars from 'handlebars';

axios.get('/api/movies').then((res) => {
  console.log('Movies data:');

  const moviesData = res.data;

  console.log(moviesData);

  const render = Handlebars.compile('    {{#each movies}} <h4>Original Name: {{ originalName }}</h4> <h4>Vietnamese Name: {{ vietnameseName }}</h4> <p>Rating: {{ rating }}</p> <p>Rates: {{ rates }}</p> <p>Label: {{ label }}</p> <p>Time: {{ time }}</p> <p>Producer: {{ producer }}</p> <p>Category: {{ category }}</p> <h3>Cast:</h3> <ul> {{#each cast}} <li>{{ this }}</li> {{/each}} </ul> <p>Nation: {{ nation }}</p> <p>Director: {{ director }}</p> <p>Date: {{ date }}</p> <h3>Description:</h3> <ul> {{#each description}} <li>{{ this }}</li> {{/each}} </ul> <iframe width="420" height="315" src="https://www.youtube.com/embed/{{ trailerEmbedID }}"> </iframe> <img src="{{ imageSource }}" alt=""> {{/each}}');

  const movieDataSample = document.querySelector('.movie-data-sample');
  if (movieDataSample !== null) {
    movieDataSample.innerHTML = render({
      movies: moviesData,
    });
  }
});

axios.get('/api/theaters').then((res) => {
  console.log('Theaters data:');
  console.log(res.data);
});

axios.get('/api/theaters_movies').then((res) => {
  console.log('Theaters_Movies data:');
  console.log(res.data);
});

axios.get('/api/showTimes').then((res) => {
  console.log('ShowTimes data:');
  console.log(res.data);
});

if (module.hot) {
  module.hot.accept();
}
