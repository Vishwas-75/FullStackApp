const mongoose = require('mongoose');
const Schema = mongoose.Schema

const bookSchema = new Schema({
     bookId: {
          type: Number,
          unique: true,
          required: true,
          primaryKey:true
     },
     name: String,
     genre: String,
     authorId: Number
})

const Book = mongoose.model('book', bookSchema)
Book.init();
module.exports = Book;
