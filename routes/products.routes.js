const express = require("express");
const upload = require("../connection/multer");
//Importing express router
const router = express.Router();
//Importing the JWT verifyer from auth middleware 
const verifyToken = require("../middleware/auth.middleware")

//Importing the product controller 
const { create, update, get, show, deleteProduct} =  require("../controllers/product.controller.js");

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
})
// Route for creating a product 
router.post("/create", verifyToken, upload.array('files', 10), create);

//Route to update a specfic product
router.put("/update/:id", verifyToken, upload.array('files', 10), update);

//route to get all products
router.get("/get", get);

//route to get or show only a specfic product
router.get("/show/:id", verifyToken, show);

//route to delete a specfic product
router.delete("/delete/:id", verifyToken, deleteProduct); 

//Exporting the routes 
module.exports = router;