const { Schema, model } = require('mongoose');

const ItemSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

const Item = model('Item', ItemSchema);

module.exports = { Item, ItemSchema };
