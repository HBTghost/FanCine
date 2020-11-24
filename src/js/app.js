import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all';

import '../scss/app.scss';

import axios from 'axios';
import Handlebars from 'handlebars';

axios.get('/api/movies').then((res) => {
  console.log('Movies data:');
  console.log(res.data);
  const myCats = [
    { name: 'Fiona', age: 4 },
    { name: 'Spot', age: 12 },
    { name: 'Chestnut', age: 4 },
    { name: 'Frisky', age: false },
    { name: 'Biscuit', age: 4 },
  ];
  const renderCats = Handlebars.compile('    {{#each cats}} <div id="cat-list"> <h1>{{name}}</h1> <p>Age: {{age}}</p> </div> {{/each}}');
  console.log(renderCats);
  document.querySelector('.handlebar').innerHTML = renderCats({
    cats: myCats,
  });
  console.log(renderCats({ cats: myCats }));
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
