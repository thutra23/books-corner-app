const router = require("express").Router({mergeParams:true});

const bookRouter = require("./books.js");

router.use("/books", bookRouter);

module.exports = router;