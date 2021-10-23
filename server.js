require('dotenv').config(); // read .env files
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Set public folder as root
app.use(express.static('public'))

// Allow front-end access to node_modules dir
app.use('/scripts', express.static(`${__dirname}/node_modules/`));