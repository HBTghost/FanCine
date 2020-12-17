// ------------ Routing via Auth ------------//
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Vui lòng đăng nhập trước!');
  res.send('notAuth');
}

function ensureAuthenticatedOrRedirect(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
function forwardAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

export { ensureAuthenticated, ensureAuthenticatedOrRedirect, forwardAuthenticated };
