const express = require('express');
const path = require('path');
const app = express();
const authCollection = require('./authShema');

const port = process.env.PORT || 3000;

app.use(express.json);

