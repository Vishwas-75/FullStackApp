const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const authorSchema = new Schema({
     authorId: {
          type: Number,
          unique: true,
          required: true,
          primaryKey: true
     },
     name: String,
     age: Number
})

const Author = mongoose.model('author', authorSchema);
Author.init();
module.exports = Author;
