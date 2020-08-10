require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const requireAuth = require("./middlewares/requireAuth");
const keys = require("./config/keys");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
app.use(uploadRoutes);

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB");
});
mongoose.connection.on("error", (err) =>
  console.log("Error connecting to mongo", err)
);

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(process.env.PORT || 3000);
