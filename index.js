const express = require('express');
require("dotenv").config();
const cors = require("cors");
const connectionDB = require('./connection/connectiondb.js');
const product = require('./routes/products.routes.js')
const users = require('./routes/auth.routes.js')

const app = express();
connectionDB();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use('/api/products', product);
app.use('/api/auth', users)

module.exports = app;