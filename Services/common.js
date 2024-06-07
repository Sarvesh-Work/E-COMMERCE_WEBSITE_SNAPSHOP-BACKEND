const passport = require("passport");
const nodemailer = require("nodemailer");

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "sarveshmunde10@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

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

exports.sendMail = async function ({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: '"snapShop" <sarveshmunde10@gmail.com>', // sender address
    to,
    subject,
    text,
    html,
  });
  return info;
};
