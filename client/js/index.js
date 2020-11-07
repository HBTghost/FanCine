import getLogoText from './utils';

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

document.querySelector('.logo').innerHTML = getLogoText();

if (module.hot) {
  module.hot.accept();
}
