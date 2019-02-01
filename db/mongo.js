const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/compare', {useNewUrlParser: true});
const Schema = mongoose.Schema;
const thingSchema = new Schema({}, { strict: false });
let Compare = mongoose.model('product', thingSchema);
module.exports = {Compare};