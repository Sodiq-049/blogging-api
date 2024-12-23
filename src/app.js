const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Welcome to the Blogging API!');
});

module.exports = app; // Export for testing
