const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: [1, "wrong price"] },
    discountPercentage: {
      type: Number,
      required: true,
      min: [1, "wrong discountPercentage"],
      max: [99, "wrong discountPercentage"],
    },
  
    stock: {
      type: Number,
      required: true,
      min: [0, "wrong min stock"],
      default: 0,
    },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: [{ type: Schema.Types.Mixed, required: true }],
    deleted: { type: Boolean, default: false },
    color: [{ type: Schema.Types.Mixed }],
    highlights: [{ type: Schema.Types.Mixed, required: true }],
    discountPrice:{type:Number,required:true}
  },
  { timestamps: true }
);

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
