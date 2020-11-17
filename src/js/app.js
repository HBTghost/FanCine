import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all';

import '../scss/app.scss';

import axios from 'axios';

axios.get('/api/movies').then((res) => {
  console.log(res.data);
});

axios.get('/api/theaters').then((res) => {
  console.log(res.data);
});

if (module.hot) {
  module.hot.accept();
}
