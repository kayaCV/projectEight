// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("Hi");   // Log statement to indicate that this function is running 
  // next(createError(404));
  
  const err = new Error('err');
  err.status = 404;
  // err.message = 'Uh oh! Looks like this page doesn\'t exist.';
  res.render('books/page_not_found', {title: "Page Not Found"});  // try
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   // res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
// res.locals.error = err; <-----
//   // render the error page
  res.status(err.status || 500); // err.status); // || 
  // res.status = 500; /// <-------
//   // console.log(res.statusCode);
//   // if(res.statusCode === 404) {
//   // res.render('books/page_not_found', {title: "Page Not Found"});
//   //   // console.log(res.locals.error)
//   // } else if(res.statusCode === 500){
    console.log('all the others')
//   //   // res.render('error');
  
//   // }  
// res.send('500: Internal Server Error', 500);
res.render("error"); //, {title: "Page Not Found"});

// res.status(500);
// res.render('error', {title:'Page Not Found', error: err});
});


module.exports = app;
