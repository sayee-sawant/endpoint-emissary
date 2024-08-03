const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  requestId: {
    type: mongoose.Types.ObjectId,
    ref: "Request",
    required: true,
    unique: true,
  },
  params: [
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

const paramsModel = mongoose.model("Params", schema);

module.exports = paramsModel;
