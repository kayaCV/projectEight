const express = require('express');
const router = express.Router();
const Book = require('../models').Book;


/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next);
      // if(res.statusCode === 404) {
      //   console.log("render to error");
      // }
      
    } catch(error){
      // console.log(res.statusCode);
      // console.log(res.statusCode);
       res.status(500).send(error);
      //  console.log('asyncHandler catch');
    }
  }
}

// get /books - Shows the full list of books.
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render("books/index", { books, title: "Books!" });
}));

/* Create new book form. */
router.get('/new-book', (req, res) => {  //asyncHandler(async 
    res.render("books/new-book", { book: {}, title: "New Book"});
});

// post /books/new - Posts a new book to the database.
router.post('/', asyncHandler(async (req, res) => {
  let book;
  try {
    book  = await Book.create(req.body);
    res.redirect("/books/");
  } catch(error) {
      if(error.name === "SequelizeValidationError") { // checking the error
        book = await Book.build(req.body);
        res.render("books/new-book", { book, errors: error.errors, title: "New Book" })
    } else {
        throw error; // error caught in the asyncHandler's catch block
    }
  }
}));
/*
router.post('/:id', asyncHandler(async (req, res) => {
  let book;
    book = await Book.findByPk(req.params.id);
  if(book) {
    await book.update(req.body);
    res.redirect("/books/" + book.id);
  } else {
    res.sendStatus(500);  //404
    // res.redirect("/error", {title: "Server Error"});
  }
*/

// get /books/:id - Shows book detail form.
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("books/update-book", { book: book, title: "Update Book" }); 
  } else {
    // res.sendStatus(500); // 404
    res.render("error", {title: "Page Not Found"});
    // res.redirect("/error");
    // throw Error(500);
  }  
}));

// post /books/:id - Updates book info in the database.
// router.post('/:id', asyncHandler(async (req, res) => {
//   let book;
//   try{
//     console.log("try")
//     book = await Book.findByPk(req.params.id);
//   // if(book) {
//     await book.update(req.body);
//     console.log("await")
//     res.redirect("/books/" + book.id);
//     console.log("redirect")
//   // }
// } catch(error) {
//   console.log("catch")
//   if(error.name === "SequelizeValidationError") { // checking the error
//     console.log(error.name)
//     book = await book.update(req.body);
//     console.log("await")
//     res.render("books/" + book.id, { book, title: "Update Book" })
// } else {
//   console.log("else")
//     throw error; // error caught in the asyncHandler's catch block
// }
// }

router.post('/:id', asyncHandler(async (req, res) => {
  let book;
  try{
    book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect("/books/" + book.id);
    } else {
        res.sendStatus(404);
    }
  } catch(error) {
    // console.log("catch")
    if(error.name === "SequelizeValidationError") { // checking the error
      console.log(error.name)
      book = await Book.build(req.body);
      console.log("await");
      book.id = req.params.id;
      res.render("books/update-book", { book, errors: error.errors, title: "Update Book" })
    } else {
      console.log("else")
      throw error; // error caught in the asyncHandler's catch block
}
}


  // let book;
  // try {
  //   book = await Book.findByPk(req.params.id);
  //   if(book) {
  //     await book.update(req.body);
  //     res.redirect("/books/" + book.id);
  //   }
  // } catch(error) {
  //     if(error.name === "SequelizeValidationError") { // checking the error
  //       book = await Book.build(req.body);
  //       res.render("books/" + book.id, { book, errors: error.errors, title: "Update Book" })
  //   } else {
  //       throw error; // error caught in the asyncHandler's catch block
  //   }
  // }


  // let book;
  // try {
  //   book = await Book.findByPk(req.params.id);
  //  // if(book) {
  //     await book.update(req.body);
  //     res.redirect("/books/" + book.id);
  //   //} //else {
  //   //   res.sendStatus(404);
  //   // }
  // } catch(error) {
  //   if(error.name === "SequelizeValidationError") { // checking the error
  //     book = await Book.build(req.body);
  //     res.render("books/" + book.id, { book, errors: error.errors, title: "Update Book" })
  // } else {
  //     throw error; // error caught in the asyncHandler's catch block
  // }

  // }
}));

// post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/books");
} else {
    // res.sendStatus(500); // 404
    res.render("error", {title: "Page Not Found"});
}
}));
module.exports = router;