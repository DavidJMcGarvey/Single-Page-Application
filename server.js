require('dotenv').config(); // read .env files
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// Set public directory as root
app.use(express.static('public'));

// Allow front-end access to node_modules dir
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Parse POST data as URL encoded data
app.use(bodyParser.urlencoded({
    extended: true,
}));

// Parse POST data as JSON
app.use(bodyParser.json());

// Express Error handler
const errorHandler = (err, req, res) => {
    if (err.response) {
        // The request was made and the server responds with a status code
        // that falls out of the range of 2xx
        res.status(403).send({title: 'Server responded with an error', message: err.message});
    } else if (err.request) {
        // The request was made but no response was recieved
        res.status(503).send({title: 'Unbale to communicate with server', message: err.message});
    } else {
        // Something happened in setting up the request that triggered an Error
        res.status(500).send({title: 'An unexpected error occured', message: err.message});
    }
};

// Fetch Latest Currency Rates
app.get('/api/rates', async (req, res) => {
    try {
        const data = await getRates();
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Fetch Symbols
app.get('/api/symbols', async (req, res) => {
    try {
        const data = await getSymbols();
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Convert Currency
app.post('/api/convert', async (req, res) => {
    try {
        const { from, to } = req.body;
        const data = await convertCurrency(from, to);
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Listen for HTTP requests on port 3000
app.listen(port, () => {
    console.log('listening on %d', port);
});

const { getRates, getSymbols } = require('./lib/fixer-service');
const { convertCurrency } = require('./lib/free-currency-service');

// Server Tests

// TEST getRates
const test1 = async() => {
    const data = await getRates();
    console.log(data);
}

// test1();

// TEST Symbols Endpoint
const test2 = async() => {
    const data = await getSymbols();
    console.log(data);
}

// test2();

// TEST Currency Conversion Endpoints
const test3 = async() => {
    const data = await convertCurrency('USD', 'KES');
    console.log(data);
}

// test3();