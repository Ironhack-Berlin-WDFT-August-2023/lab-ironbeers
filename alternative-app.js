// This is just an alternative solution using async/await instead of .then/.catch. 

const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const beers = await punkAPI.getBeers();
    res.render('beers', { beers });
  } catch (error) {
    console.log(error);
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const beer = await punkAPI.getRandom();
    console.log(beer);
    res.render('beer', { beer });
  } catch (error) {
    console.log(error);
  }
});

//Bonus Iteration 6:

app.get('/beers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const beer = await punkAPI.getBeer(id);
    res.render('random-beer', { beer });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));