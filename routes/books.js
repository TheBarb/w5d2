const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/books', (req, res) => {
  // get all the books
  Book.find().then(booksFromDB => {
    // render a view and pass in the books
    // console.log(booksFromDB);
    res.render('books', { booksList: booksFromDB })
  })
});

router.get('/books/add', (req, res) => {
  res.render('bookForm');
});

router.get('/books/:bookId', (req, res) => {
  const id = req.params.bookId;
  Book.findById(id).then(bookFromDB => {
    console.log(bookFromDB);
    res.render('bookDetails', { book: bookFromDB });
  });
});

router.post('/books', (req, res) => {
  // const title = req.body.title;
  // const author = req.body.author;
  // const description = req.body.description;
  // const rating = req.body.rating;
  const { title, author, description, rating } = req.body;
  Book.create({
    title: title,
    author: author,
    description: description,
    rating: rating
  }).then(book => {
    console.log(`New book was created: ${book}`);
    // 
    res.redirect(`/books/${book._id}`);
  }).catch(error => {
    console.log(error);
  })
});

router.get('/books/edit/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  console.log(id);
  Book.findById(id)
    .then(bookFromDB => {
      // render an edit form with the data from the book
      console.log(bookFromDB);
      res.render('bookEditForm', { book: bookFromDB })
    })
    .catch(error => {
      next(error);
    })
});

router.get('/books/delete/:bookId', (req, res) => {
  const id = req.params.bookId;
  Book.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/books');
    })
    .catch(error => {
      console.log(error);
    })
});

router.post('/books/edit/:bookId', (req, res) => {
  const { title, author, description, rating } = req.body;
  const id = req.params.bookId;
  Book.findByIdAndUpdate(id, {
    title: title,
    author: author,
    description: description,
    rating: rating
  })
    .then(book => {
      res.redirect(`/books/${book._id}`);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;