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

function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user._doc.role === 'admin') {
    return next();
  }
  res.redirect('/');
}

function ensureAdminApi(req, res, next) {
  if (req.isAuthenticated() && req.user._doc.role === 'admin') {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

function forwardAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

export {
  ensureAuthenticated,
  ensureAuthenticatedOrRedirect,
  forwardAuthenticated,
  ensureAdmin,
  ensureAdminApi,
};
