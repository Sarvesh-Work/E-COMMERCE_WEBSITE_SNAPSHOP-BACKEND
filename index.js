const express = require("express");
const mongoose = require("mongoose");
const server = express();
const productsRouter = require("./router/ProductRouter.js");
const brandsRouter=require("./router/BrandRouter.js")
const categoriesRouter=require("./router/CategoryRouter.js")


server.use(express.json());
server.use("/products", productsRouter.router);
server.use("/brand", brandsRouter.router);
server.use("/category",categoriesRouter)


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
