var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/* ------------------------------ PACKAGE SETUP ----------------------------- */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
var cors = require('cors');
var session = require('express-session');
/* Redis Setup */
const RedisStore = require('connect-redis')(session);
var redis = require('redis');
/* Mongoose Setup */
var mongoose = require('mongoose');
/* Main  Config */
var ConfigStore = require('./config/StorageConfig');
var CorsConfig = require('./config/CorsConfig');

/* ---------------------------- TODO MONGOOSE RUN --------------------------- */

mongoose.connect(ConfigStore.mongodb.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, async (err) => {
  if (err) throw err
  console.log("Connected To Database MongoDB")
})

/* -------------------------------------------------------------------------- */
/* -------------------------- TODO CONNECTED REDIS -------------------------- */
const redisClient = redis.createClient(ConfigStore.redis.option);
redisClient.on('ready', () => {
  console.log('Successfully connected to Redis.')
});
ConfigStore.redis.client = redisClient;
/* -------------------------------------------------------------------------- */



/* ----------------------------- STUB MAIN ROUTE ---------------------------- */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiAdminRouter = require('./routes/apiAdmin');
/* -------------------------------------------------------------------------- */

var app = express();





/* --------------------------- TODO SESSION SETUP --------------------------- */
app.use(session({
  store: new RedisStore({ client: ConfigStore.redis.client }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // if true only transmit cookie over https
    httpOnly: false, // if true prevent client side JS from reading the cookie 
    maxAge: 1000 * 60 * 10 // session max age in miliseconds
  }
}))
/* -------------------------------------------------------------------------- */
app.use(cors(CorsConfig.option))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* main routes */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', apiAdminRouter);
/* End Main Route */

/* ------------------------------- DEPLOYMENT ------------------------------- */
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, "/client")));
//   app.use(express.static(path.join(__dirname, "/company")));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
//     res.sendFile(path.join(__dirname, '/company/build', 'index.html'));
//   });
// }
/* ------------------------------- END DEPLOYMENT ------------------------------- */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
