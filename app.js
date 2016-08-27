var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger =  require('morgan');

var config = require('./config');

/**
  * Import controllers and middlewares
  */
var admin = require('./controllers/admin.js');

/**
  * Server setup
  */
const app = express();
const server = http.createServer(app);
const db = mongoose.connect(config.database);

/**
  * General setup
  */
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
  * Use controllers
  */
app.use('/admin', admin);

/**
  * Handdle if the none page is founded
  */
app.use(function(req, res, next){
    res.status(404);
    res.render('error', {
        errName: 'Page not found',
        errMessage: 'Check the URL that you did this request'
    });
});

// Start the server
server.listen(3000, function() {
    console.log('Server is running in localhost:3000');
});
