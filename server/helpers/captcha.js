import axios from 'axios';

function getCaptchaUrl(req) {
  return `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPCHA_SECRET_KEY}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`;
}

function ensureCaptchaClicked(req, res, next) {
  if (
    req.body['g-recaptcha-response'] === undefined ||
    req.body['g-recaptcha-response'] === '' ||
    req.body['g-recaptcha-response'] === null
  ) {
    return res.json({
      message: 'Vui lòng xác nhận bạn không phải là rôbốt bằng cách click vào reCAPTCHA!',
    });
  }

  axios
    .get(getCaptchaUrl(req))
    .then((response) => {
      if (response.data.success === true) {
        return next();
      }
      res.json({ message: 'Xác thực không phải là rôbốt thất bại. Vui lòng thử lại!' });
    })
    .catch((error) => res.json(error));
}

function ensureCaptchaClickedRender(req, res, next) {
  const url = new URL(req.headers.referer);
  const curTab = url.pathname;
  if (
    req.body['g-recaptcha-response'] === undefined ||
    req.body['g-recaptcha-response'] === '' ||
    req.body['g-recaptcha-response'] === null
  ) {
    req.flash(
      'error_msg',
      'Vui lòng xác nhận bạn không phải là rôbốt bằng cách click vào reCAPTCHA!',
    );
    return res.redirect(curTab);
  }

  axios
    .get(getCaptchaUrl(req))
    .then((response) => {
      if (response.data.success === true) {
        return next();
      }
      req.flash('error_msg', 'Xác thực không phải là rôbốt thất bại. Vui lòng thử lại!');
      return res.redirect(curTab);
    })
    .catch((error) => {
      req.flash('error_msg', error.message);
      return res.redirect(curTab);
    });
}

export { getCaptchaUrl, ensureCaptchaClicked, ensureCaptchaClickedRender };
