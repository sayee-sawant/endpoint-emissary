const express = require("express");
const postmanRoutes = require("./routes/postmanRoutes");
const connectDb = require("./db/db");
const cors = require("cors");

const PORT = 5000;
const app = express();
connectDb();

app.use(
  cors({
    credentials: true,

    enablePreflight: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", postmanRoutes);

app.listen(PORT, () => {
  console.log("backend is running at port ", PORT);
});
