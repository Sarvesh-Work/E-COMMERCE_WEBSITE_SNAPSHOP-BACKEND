const express = require("express");
const mongoose = require("mongoose");
const server = express();
const productsRouter = require("./router/ProductRouter.js");
const brandsRouter = require("./router/BrandRouter.js");
const categoriesRouter = require("./router/CategoryRouter.js");
const UsersRouter = require("./router/UserRouter.js");
const AuthRouter=require("./router/AuthRouter.js");
const CartRouter=require("./router/CartRouter.js")
const cors = require("cors");


// ---middleware---
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json());
server.use("/products", productsRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/users", UsersRouter.router);
server.use("/auth", AuthRouter.router);
server.use("/cart", CartRouter.router);
// ---middleware---

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
