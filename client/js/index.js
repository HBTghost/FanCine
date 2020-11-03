import '../scss/main.scss';

import square from './square';

console.log(square(7));

document.querySelector('h1').innerHTML = 'FanCine';

if (module.hot) {
  module.hot.accept();
}