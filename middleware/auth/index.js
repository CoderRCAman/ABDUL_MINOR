const isAuthenticated = (req, res, next) => {
  if (req.cookies.isLoggedIn) {
    return next();
  }
  req.session.redirectUrl = req.originalUrl;
  return res.redirect("/login");
};

module.exports = { isAuthenticated };
