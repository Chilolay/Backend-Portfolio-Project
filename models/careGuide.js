const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const careGuideSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: false,
  },
  timestamps: true,
});

const CareGuide = mongoose.model("CareGuide", careGuideSchema);
module.exports = CareGuide;
