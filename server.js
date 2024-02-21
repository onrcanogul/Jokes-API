const express = require("express");
const env = require("dotenv");
const colors = require("colors");
const connectDB = require("./db/db");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

env.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

const auth = require("./routes/auth");
const jokes = require("./routes/jokes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorHandler);

app.use("/auth", auth);
app.use("/jokes", jokes);

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} node on port ${PORT}`.yellow.bold
  );
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  serverv.close(() => process.exit(1));
});
