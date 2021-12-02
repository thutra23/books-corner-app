const express = require('express');
const app = express();
// const bookValidator = require('./src/validators');

const connection = require('./db/connection.js');

connection.once('open', ()=>{
    const server = app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Connected and listening on port ${process.env.PORT || 8080}`);
    });
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

const Book = require('./models/Book.js');

const router = require("./routes/index.js");
app.use("/", router);

// get books from server side
// app.get("/books", (req,res)=>{
//     Book.find({}).exec()
//     .then(results=>{
//         res.json(results);
//     })
//     .catch(error=>{
//         res.status(500).send(error.response);
//     })
// })

//post books to the server and save in a database
// app.post("/books", bookValidator, (req,res)=>{
//     let newBook = new Book({
//         name: req.body.name,
//         author: req.body.author
//     })

//     newBook.save()
//     .then(results=>{
//         res.status(201).json({data: newBook});
//     })
//     .catch(error=>{
//         console.log(error);
//     })

// })


// when refresh page in a react router, it will give a request in the back end to fetch a particular page, this route will redirect to index.html

app.get("*", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.get('*', (req,res)=>{
    res.render('index', {url:req.originalUrl})
  })




