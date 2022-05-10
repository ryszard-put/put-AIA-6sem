const { Schema, model } = require('mongoose');
const { ItemSchema } = require('../Item');

const OrderSchema = Schema({
  user: {
    type: String,
    required: true,
  },
  items: [ItemSchema],
});

const Order = model('Order', OrderSchema);

module.exports = { Order, OrderSchema };
