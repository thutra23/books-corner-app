const router = require("express").Router({mergeParams:true});
const { postBook, getBooks, findBook, deleteBook, addWantToRead, addHaveRead, deleteHaveRead, deleteWantToRead} = require("../controllers/bookController.js");
const bookValidator = require("../src/validators");

router.post("/", bookValidator, postBook);
router.get("/", getBooks);
router.get("/:id", findBook);
router.delete("/:id", deleteBook);
router.post("/WantToRead", addWantToRead );
router.post("/HaveRead", addHaveRead);
router.delete("/WantToRead/:id", deleteWantToRead);
router.delete("/HaveRead/:id", deleteHaveRead);

module.exports = router;