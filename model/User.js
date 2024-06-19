const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Buffer,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  address: [Schema.Types.Mixed],
  name: { type: String },
  orders: { type: [Schema.Types.Mixed] },
  salt: Buffer,
  resetPasswordToken: { type: String, default: "" },
},{timestamps:true});

const virtual = UserSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
