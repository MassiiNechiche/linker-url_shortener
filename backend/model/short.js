const mongoose = require("mongoose");

const shortId = require("shortid");

const shortUrlSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  full: {
    type: String,
    required: true,
  },

  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
});

module.exports = mongoose.model("shortURL", shortUrlSchema);
