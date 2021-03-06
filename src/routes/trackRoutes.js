const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");

const router = express.Router();

//router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  //const tracks = await Track.find({ userId: req.user._id });
  const tracks = await Track.find({});
  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations, landmarks } = req.body;
  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "You must provide a name and locations" });
  }

  try {
    //const track = new Track({ name, locations, userId: req.user._id });
    const track = new Track({ name, locations, landmarks });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/tracks/:id", async (req, res) => {
  const track = await Track.findOne({ _id: req.params.id });
  Object.assign(track, req.body);
  await track.save();
  res.send(track);
});

module.exports = router;
