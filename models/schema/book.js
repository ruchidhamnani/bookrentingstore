const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let booksSchema = new Schema({
    bookname: String,
    author: String,
    genre: String,
    price: Number,
    dateOfPublish: Date,
    noOfPages: Number,
    forAgeAbove: Number,
    totalQuantity: Number,
    availableCopies: Number
}, {
    timestamps: true
});
let booksModel = mongoose.model('books', booksSchema);
booksSchema.index({ author: 1, genre: 1 });
module.exports = booksModel;