import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all';

import '../scss/app.scss';

import axios from 'axios';

axios.get('/api/movies/5fb2b0539ad69859a2e1bb94').then((res) => {
  console.log(res.data);
});

if (module.hot) {
  module.hot.accept();
}
