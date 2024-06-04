const passport = require("passport");

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.isAuth = () => {
  return passport.authenticate("jwt");
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGIwMGQyMTVlNTIxZjBmZjFiNmQwZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjk3ODM4NX0.eoS2FtqAJDOShK6m12qBaezIJbr1zERrsQzj3vhukqY";
  return token;
};

