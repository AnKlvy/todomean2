const express = require("express");
const User = require("../models/UserModel");
const Review = require("../models/ReviewModel");
const router = new express.Router();
const cors = require("cors");

router.get("/", (req, res) => {
  res.json({ text: "text" });
});

router.use(cors());
router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/api/reviews", async (req, res) => {
  try {
    const review = await Review.find({});
    res.send(review);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/api/users", async (req, res) => {
  const { username, age, email, password } = req.body;
  try {
    const user = new User({ username, age, email, password });
    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
