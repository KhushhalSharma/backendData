const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  age: Number,
  emial: String,
  gender: String,
});

const userModel = mongoose.model("user", userSchema);

const app = express();

app.get("/", async (req, res) => {
  const { page = 1, limit = 10, orderBy = "id", order = "asc" } = req.query;
  let u = await userModel
    .find({}, { _id: 0, id: 1, first_name: 1, age: 1, gender: 1 })
    .sort({ [orderBy]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.send(u);
});

app.listen(8000, async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/b19");
  console.log("http://localhost:8000");
});
