const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();
console.log( 'Conectando ...' )

// connect to mongodb & listen for requests
// const dbURI = "mongodb+srv://netninja:test1234@net-ninja-tuts-del96.mongodb.net/node-tuts";
// connect to mongodb & listen for requests
// const dbURI = "mongodb+srv://prevision:DatosDePrueb4@cluster0.70cpq.mongodb.net/db_admin_bor?retryWrites=true&w=majority";
const dbURI = 'mongodb+srv://ndgDemo:pagBl0g@cluster0.ba4cc.mongodb.net/ninja-tut?retryWrites=true&w=majority'

const puerto = 3456
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    result => {
      app.listen(puerto);
      console.log('BD Conectada\nCorriendo http://localhost:',puerto)
    } )
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'Acerca de' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: 'Hubo un error' });
});
