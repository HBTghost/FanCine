// ------------ Routing via Auth ------------//
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please log in first!');
  res.redirect('/login');
}
function forwardAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

export {
  ensureAuthenticated,
  forwardAuthenticated,
};
