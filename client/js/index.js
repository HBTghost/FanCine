import getLogoText from './utils';

document.querySelector('.logo').innerHTML = getLogoText();

if (module.hot) {
  module.hot.accept();
}