// imports
const path = require('path');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

// create express app 
var app = express();
app.use(cors())

// setup handlebars view engine
app.engine('handlebars', 
    handlebars({defaultLayout: 'main_logo'})); 
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// parsing json requests 
app.use(bodyParser.json());
// parsing url encoded requests
app.use(bodyParser.urlencoded({ extended: false }));

// routing
var routes = require('./routes/index');
// using routes defined in index.js
app.use('/', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// 404 error handler 
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

// starting server on port 3000 
app.listen(3000, function(){
  console.log('http://localhost:3000');
});

