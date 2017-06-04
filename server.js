const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//Port for Heroku
const port = process.env.PORT || 3000;
var app = express();
//console.log(__dirname);

//HBS Register Partials
hbs.registerPartials(__dirname + '/views/partials');

//Set the Rendering View Engine
app.set('view engine', 'hbs');

//Express middleware 1
app.use((request, respnose, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.path}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

//Express middleware 2
// app.use((request, respnose, next) => {
//   respnose.render('maintenance.hbs');
// });

//Express middleware 3
//Static directory
app.use(express.static(__dirname + '/public'));

//HBS Register Helper
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, respnose) => {
  // respnose.send('<h1>Hello Express!<h1/>');
  //Render the respnose
  respnose.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (request, respnose) => {
  respnose.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (request, respnose) => {
  respnose.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});

app.get('/bad', (request, respnose) => {
  //Send response
  respnose.send({
    errorMessage: 'Unable Handling Request'
  });
});

//Port on which page will be displayed/rendered
app.listen(port, () => {
  console.log(`Server is up on ${port} port.`);
});
