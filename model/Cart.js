const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  quantity: { type: Number, required: true },
  color:{type:String}
});

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
