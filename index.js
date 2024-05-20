const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const server = express();
const productsRouter = require("./router/ProductRouter.js");
const brandsRouter = require("./router/BrandRouter.js");
const categoriesRouter = require("./router/CategoryRouter.js");
const UsersRouter = require("./router/UserRouter.js");
const AuthRouter = require("./router/AuthRouter.js");
const CartRouter = require("./router/CartRouter.js");
const OrderRouter = require("./router/OrderRouter.js");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const User = require("./model/User.js");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const { sanitizeUser, isAuth } = require("./Services/common.js");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secretKey = "SECRET_KEY";

// ---middleware---
server.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
server.use(passport.authenticate("session"));
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json());
server.use("/products", productsRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/users",isAuth(), UsersRouter.router);
server.use("/auth", AuthRouter.router);
server.use("/cart",isAuth(),  CartRouter.router);
server.use("/order",isAuth(),  OrderRouter.router);

// jwt options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;

// ---middleware---

// passport js localStorage
passport.use(
  
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ email: username }).exec();
      if (!user) {
        done(null, false, { message: "User not found invalid credentials" });
      }

      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            done(null, false, { message: "wrong credentials" });
          }
          const token = jwt.sign(sanitizeUser(user), secretKey);
          done(null, token);
        }
      );
    } catch (error) {
      done(error);
    }
  })
);

passport.use(

  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user=await User.findOne({ id: jwt_payload.sub })
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
       
      }
    } catch (error) {
       done(err, false);
    }
   
      
     
     
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, sanitizeUser(user));
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
// passport js localStorage

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/snapshop");
  console.log("connected");
};

main().catch((err) => console.log(err));

server.get("/", (req, res) => {
  res.json({ status: "working" });
});

server.listen(8080, () => {
  console.log("server is started on 8080 port");
});
