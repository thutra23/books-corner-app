const router = require("express").Router({mergeParams:true});
const { postBook, getBooks, findBook, deleteBook, addWantToRead, addHaveRead} = require("../controllers/bookController.js");

router.post("/", postBook);
router.get("/", getBooks);
router.get("/:id", findBook);
router.delete("/:id", deleteBook);
router.post("/WantToRead", addWantToRead );
router.post("/HaveRead", addHaveRead);

module.exports = router;