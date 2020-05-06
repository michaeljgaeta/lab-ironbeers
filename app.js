// Require Packages
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// Set view engine paths
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// home route handler
app.get('/', (request, response) => {
  response.render('index');
});

//beers route handler
app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi)
      response.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

//random beer route handler
app.get('/random-beers', (request, response) => {
  punkAPI
    .getRandom()
    .then(randomBeerFromApi => {
      console.log('Random Beer: ', randomBeerFromApi)
      response.render('random-beers', { beer: randomBeerFromApi }),  
    })
    .catch(error => console.log(error));
});

/*//individual beer route handler
  app.get('/beers/:id', (request, response) => {
    const id = request.params.id;
    punkAPI
      .getBeer(id)
      .then(beerFromApi => {
        console.log('Beer from the database: ', beerFromApi);
        response.render('beers', { beer: beerFromApi });
      })
      .catch(error => console.log(error));
  });*/

app.listen(3000, () => console.log('🏃‍ on port 3000'));
