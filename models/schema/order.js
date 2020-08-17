const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ordersSchema = new Schema({
    customerId: { type: Schema.ObjectId, ref: 'customer' },
    bookId: { type: Schema.ObjectId, ref: 'books' },
    doi: { type: Date }
}, { timestamps: true });
let ordersModel = mongoose.model('orders', ordersSchema);
module.exports = ordersModel;