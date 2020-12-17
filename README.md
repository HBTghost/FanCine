# FanCine

  A movie ticketing website with [NodeJS](https://nodejs.org), [Gulp](https://gulpjs.com/), [Handlebars](https://handlebarsjs.com/), [Express](https://github.com/expressjs/express) and [MongoDB](https://www.mongodb.com/), 
  
<div align="center">
<p align="center">
  <a href="https://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
  <p align="center">The streaming build system</p>
</p>

![Lint Commit Messages](https://github.com/HBTghost/FanCine/workflows/Lint%20Commit%20Messages/badge.svg?branch=main)
![Lint Source Files](https://github.com/HBTghost/FanCine/workflows/Lint%20Source%20Files/badge.svg?branch=main)
[![semantic-release][semantic-image]][semantic-url]
[![Node version](https://img.shields.io/badge/node-14.15.1-FF00FF.svg)](https://shields.io/)
[![Yarn version](https://img.shields.io/badge/yarn-1.22.5-00FFFF.svg)](https://shields.io/)
[![js-standard-style][eslint-image]][eslint-url]
[![Contributors](https://img.shields.io/badge/contributors-4-FFFF00.svg)](https://shields.io/)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/Naereen/badges/)

</div>

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[eslint-image]: https://badgen.net/badge/eslint/airbnb/ff5a5f?icon=airbnb
[eslint-url]: https://eslint.org/

## Features

  * Live server, hot reload browser
  * Minimize CSS, JS supported.
  * Autoprefixer CSS
  * Prettier for JS.
  * Linter for JS, SCSS and Commit.
  * Lint-staged for optimize linter process.
  * Husky for pre-commit check (run all linter in lint-staged).
  * Babel compile for new ES
  * CI with Travis
  * Responsive design.
  * Security sign in / sign out with Passport / Session / JWT / Bcrypt
  * Auto send mail for register / reset passport process (with Nodemailer / Google SMTP / JWT)

## Docs & Community

  * [Proposal](https://docs.google.com/document/d/1LCmHC-N9CkWMpLu0BuUbIqHyHsOfPyBb3GwbVM_3A8Y/edit?fbclid=IwAR3kT4l1fPlB80KM858vi3w6Cjkk7x3Wz5C5GDRL7gOn-yQoKwZ3QDN3sYg)
  * [Website repo](https://github.com/HBTghost/FanCine)
  * [Website](https://fancine.herokuapp.com)
  

## Quick Start

  Install Node & Yarn (latest verson), then enter in command line:

```bash
$ git clone https://github.com/HBTghost/FanCine.git && cd FanCine
```

  Install dependencies:

```bash
$ yarn
```

  Start the server:

```bash
$ yarn dev
```

  App will opened automatically at: http://localhost:6969

## Working Guides

  In folder FanCine, we pull newest commit from remote with:

```bash
$ git pull
```

  Then, reinstall dependencies and start the server:

```bash
$ yarn
$ yarn dev
```

## Issues:
  If ```yarn``` frozen then run ```npm install``` instead, then remove package-lock.json file

## People

The current lead maintainer is [Ngô Thanh Phương Thái](https://github.com/HBTghost)

Members:
  * [Kiều Công Hậu](https://github.com/kieuconghau)
  * [Hồ Nguyễn Huy Hoàng](https://github.com/18127006)
  * [Nguyễn Đức Hiếu](https://github.com/18127099)

## License

  [MIT](LICENSE)
