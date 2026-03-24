const mongoose = require("mongoose")

const Schema = mongoose.Schema

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    empid: {
      type: Number,
      default: () => Math.ceil(Math.random() * 900000) + 100000

    },
    phno: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
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
      enum: ["employee", "admin", "manager"],
      default: "employee"
    }

  },
  {
    timestamps: true,
    versionKey: false,
  },
);



const RoleModel = mongoose.model("Role", RoleSchema);

module.exports = RoleModel;