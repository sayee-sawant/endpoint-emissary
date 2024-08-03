const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  requestId: {
    type: mongoose.Types.ObjectId,
    ref: "Request",
    required: true,
    unique: true,
  },
  headers: [
    {
      key: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
});

const headerModel = mongoose.model("Headers", schema);

module.exports = headerModel;
