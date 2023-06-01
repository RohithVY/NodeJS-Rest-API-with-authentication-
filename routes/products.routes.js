
const express = require("express");

//Importing express router
const router = express.Router();

//Importing the product controller 
const { create, update, get, show, deleteProduct} =  require("../controllers/product.controller.js");


// Route for creating a product 
router.post("/create", create);

//Route to update a specfic product
router.put("/update/:id", update);

//route to get all products
router.get("/get", get);

//route to get or show only a specfic product
router.get("/show/:id", show);

//route to delete a specfic product
router.delete("/delete/:id", deleteProduct); 

//Exporting the routes 
module.exports = router;