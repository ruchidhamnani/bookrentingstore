const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let customerSchema = new Schema({
    name: String,
    age: Number,
    mobile: Number,
    address: Number
});
let customersModel = mongoose.model('customers', customerSchema);
customerSchema.index({ mobile: 1 });
module.exports = customersModel;