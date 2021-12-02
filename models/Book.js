const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name:{type:String, required:true, maxlength: 30, minlength: 3},
    author:{type:String, required: true, maxlength: 20, minlength: 3}, 
    summary:{type: String, required: true,  maxlength: 30, minlength: 3}, 
    wantToRead:{type: Boolean, default: false},
    haveRead: {type: Boolean, default: false}
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;