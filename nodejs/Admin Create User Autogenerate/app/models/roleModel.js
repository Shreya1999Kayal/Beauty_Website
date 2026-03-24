const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    empid: {
      type: Number,
      unique: true,
      default: () => Math.floor(100000 + Math.random() * 900000)
    },
    phno: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    address: {
      type: String,
      required: true
    },
    dept: {
      type: String,
      required: true
    },
    salary: {
      type: Number,
      required: true,
      min: 0
    },
    role: {
      type: String,
      enum: ["employee", "admin"],
      default: "admin"
    },
    is_verified: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

RoleSchema.pre("save", async function () {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

  } catch (error) {
    console.log(error)
  }
});

RoleSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

const RoleModel = mongoose.model("roleModel", RoleSchema);
module.exports = RoleModel;