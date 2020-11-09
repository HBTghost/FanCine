import 'bootstrap';
import $ from 'jquery';

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

$(() => {
  $('.carousel').carousel({
    interval: 1000,
    ride: 'carousel',
  });
});

if (module.hot) {
  module.hot.accept();
}
