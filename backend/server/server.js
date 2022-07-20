const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const { validateRequest } = require('../validation/validation');
const { houseEmissions, transportationEmissions } = require('./constants');

app.use(bodyParser.json());

app.post('/house', (req, res) => {
    const categories = validateRequest(req, res);

    for(const category in categories) {
        const data = categories[category];
        const input = data.input;
        const output = houseEmissions[category] * 365 * input;
        categories[category].carbonValue = Math.ceil(output);
    }
    res.set('Content-Type','application/json');
    res.status(200).json(categories);
})


app.post('/travel', (req, res) => {
    const categories = validateRequest(req, res);

    for(const category in categories) {
        const data = categories[category];
        const input = data.input;
        const transportFactor = category === 'Flying' ? 1.09 : 1;
        const output = transportationEmissions[category] * 365 * input * transportFactor; 
        categories[category].carbonValue = Math.ceil(output);
    }
    res.json(categories);
})


app.post("/calculate", (req, res) => {
    const categories = validateRequest(req, res);

    let sum = 0;
    for(const category in categories) {
        const data = categories[category];
        sum += data.carbonValue;
    }
    res.json(sum);
});


module.exports = app;
