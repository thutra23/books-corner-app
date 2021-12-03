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

app.get("*", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.get('*', (req,res)=>{
    res.render('index', {url:req.originalUrl})
  })




