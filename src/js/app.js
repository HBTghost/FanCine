import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all';

import '../scss/app.scss';

import axios from 'axios';

axios.get('/api/movies').then((res) => {
  console.log('Movies data:');
  console.log(res.data);
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
