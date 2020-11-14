import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all';

import axios from 'axios';

import '../scss/app.scss';

const annoyStick = {
  profile: {
    website: 'annoyStick.com',
    type: 'blog javascript',
    age: 0,
    release: '',
  },
};

console.log(annoyStick.profile.age || 18);
console.log(annoyStick.profile.release ? '17/07/2014' : 18);

console.log(annoyStick.profile.age ?? 18);
console.log(annoyStick.profile.release ?? 18);

axios.get('/api/ticket').then((a) => {
  console.log(a);
});

if (module.hot) {
  module.hot.accept();
}
