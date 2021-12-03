const Book = require("../models/Book.js");

exports.postBook = (req,res)=>{
    let newBook = new Book(req.body);

    newBook.save()
    .then(result=>{
        res.set('content-location', `/books/${newBook._id}`);
        res.status(200).json({
            url: `/books/${newBook._id}`,
            data: newBook
        })
    })
    .catch(error=>{
        res.status(500).send(error.response);
    });
}

exports.getBooks = (req,res)=>{
    Book.find({}).exec()
    .then(allBooks=>{
        res.json(allBooks);
    })
    .catch(error=>{
        res.status(500).send(error.response);
    })
}

exports.findBook = (req,res)=>{
    Book.findOne({"_id": req.params.id}).exec()
    .then(result=>res.json(result))
    .catch(error=>res.status(500).send(error));  
}

exports.deleteBook = (req,res)=>{
    Book.deleteOne({'_id':req.params.id}).exec()
    .then(result=>res.json(result))
    .catch(error=>res.status(500).send(error));
}

exports.addWantToRead = (req,res)=>{
    Book.findOneAndUpdate({_id: req.body.id}, {wantToRead: true}).exec()
    .then(result=>console.log(result))
    .catch(error=>console.log(error))
}


exports.addHaveRead = (req,res)=>{
    Book.findOneAndUpdate({_id: req.body.id}, {haveRead: true}).exec()
    .then(result=>console.log(result))
    .catch(error=>console.log(error))
}


    
