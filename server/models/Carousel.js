const { Schema, model } = require('mongoose');

const carouselSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false } // _v field को हटाने के लिए (optional)
);

module.exports = model('Carousel', carouselSchema);
