const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
