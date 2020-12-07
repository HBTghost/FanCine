// ------------ Routing via Auth ------------//
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Vui lòng đăng nhập trước!');
  // res.redirect('/login');
  res.send('notAuth');
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
