const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    enum: ["get", "post", "put", "patch", "delete"],
  },
  url: {
    type: String,
    required: true,
  },
});

const requestModel = mongoose.model("Request", schema);

module.exports = requestModel;
