const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const AddressSchema = new Schema({
//   Name: String,
//   Email: String,
//   Phone_number: String,
//   Address: String,
//   City: String,
//   State: String,
//   Postal_Code: String,
// });

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default:"user"
  },
  address: [Schema.Types.Mixed],
  name: { type: String },
  orders: { type: [Schema.Types.Mixed] },
});

const virtual = UserSchema.virtual("id");
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

const User = mongoose.model("User", UserSchema);
module.exports = User;
