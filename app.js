// Dependencies
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import storeDb from './database/database.js';

// Route imports
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import { exit } from 'process';

// load .env variables
dotenv.config();

var app = express();

// view engine setup
app.set('views', path.join(path.dirname(fileURLToPath(import.meta.url)), '/public/views'));
app.set('view engine', 'pug');

// Middleware 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));

// // Database Authentication
storeDb.getConnection()
.then( () => {
  console.log('Database connection has been authenticated');
})
.catch((err) => {
  console.log('Unable to authenticate database ' + err);
  exit(-1);
});

// Sync models
if (process.env.NODE_ENV === 'development') {
      await storeDb.sync();
}




// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;