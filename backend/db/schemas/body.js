const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  requestId: {
    type: mongoose.Types.ObjectId,
    ref: "Request",
    required: true,
    unique: true,
  },
  body: String,
});

const bodyModel = mongoose.model("Body", schema);

module.exports = bodyModel;
