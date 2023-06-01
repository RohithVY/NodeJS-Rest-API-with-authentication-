const express = require('express');
require("dotenv").config()
const cors = require("cors") 
const path = require("path")
const connectionDB = require('./connection/connectiondb.js')

const app = express();
connectionDB();
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true}));
app.use(cors());

module.exports = app;