const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/contactDB")
  .then(() => console.log("MongoDB connected"));

// Model
const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  phone: String,
  message: String
});

// Save contact
app.post("/api/contact", async (req, res) => {
  await Contact.create(req.body);
  res.send("Saved");
});

// Get contacts
app.get("/api/contact", async (req, res) => {
  const data = await Contact.find();
  res.json(data);
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
