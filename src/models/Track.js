const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const landmarksSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  type: String,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  shortDescription: String,
  description: String,
  image: String,
  video: String,
  locations: [pointSchema],
  landmarks: [landmarksSchema],
});

mongoose.model("Track", trackSchema);
