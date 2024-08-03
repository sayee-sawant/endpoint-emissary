const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(
      // "mongodb://0.0.0.0:27017/EndpointEmmisaryDB",
      "mongodb+srv://chaitanya:1234@vitdata.pe0psmh.mongodb.net/Postman?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((val) => {
      console.log("db connected..");
    })
    .catch((err) => {
      console.log("failed to connect db ", err);
    });
};

module.exports = connectDb;
