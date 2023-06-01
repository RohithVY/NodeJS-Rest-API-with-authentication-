const asyncHandler = require("express-async-handler");
const productModel = require("../models/product.model");
const uid = require('../middleware/uid');
const cloudinary = require("../connection/cloudinary")
const fs = require("fs");

const get = asyncHandler(async (req, res) => {

    const products = await productModel.find();

    return res.status(200).json({
        success: true,
        data: products.reverse()
        //I use .reverse() function to get the latest datas at first  
    })
})


const show = asyncHandler(async (req, res) => {

    const { id } = req.params
    const product = await productModel.findOne({ productId: id });

    try {
        if (product) {
            return res.status(200).json({
                success: true,
                data: product
            })
        }
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
})

const create = asyncHandler(async (req, res) => {
    //Destruct the data sent from req.body 
    const { name, description, price } = req.body
    const uploader = async (path) => await cloudinary.uploads(path, "Images")

    try {

        if (req.method === 'POST') {
            const urls = []
            if (req.files) {
                const files = req.files;
                for (const file of files) {
                    const { path } = file;
                    const newPath = await uploader(path)
                    urls.push(newPath)
                    fs.unlinkSync(path)
                }
            }

            //we use uuidv4 to generate a random and unique id for the products
            const productId = uid();

            //creating the product
            const product = await new productModel({
                productId: productId,
                name: name,
                description: description,
                price: price,
                files: urls
            })

            product.save()
            return res.status(201).json({
                success: true,
                message: "product created sucessfully",
                data: product
            })
        } else {
            return res.status(405).json({
                err: `${req.method} method not allowed`
            })
        }

    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error
        })
    }
});

const update = asyncHandler(async (req, res) => {
    //Destruct the data sent from req.body 
    const uploader = async (path) => await cloudinary.uploads(path, "Images")

    //Destructing the id from req.params
    const { id } = req.params
    //assigning the specfic product to variable called product
    const product = await productModel.findOne({ productId: id });

    console.log("id", id)
    if (req.method !== 'PUT') {
        return res.status(405).json({
            err: `${req.method} method not allowed`
        })
    }

    try {

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "product not found",
            })
        }

        //updating the datas of that product
        const urls = []
        if (req.files) {
            const files = req.files;
            for (const file of files) {
                const { path } = file;
                const newPath = await uploader(path)
                urls.push(newPath)
                fs.unlinkSync(path)
            }

        }

        product.updateOne(req.body, { useFindAndModify: false }).then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update product with id=${id}. Maybe product was not found!`
                });
            } else return res.status(201).json({ message: "Product was updated successfully.", data: req.body });
        })

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
});

//Delete a single product
const deleteProduct = asyncHandler(async (req, res) => {
    //Destructing id from req.params
    const { id } = req.params

    try {
        //Fetching single product using the id in the req.params from the database and assigning it to product
        await productModel.deleteOne({ productId: id });

        //Since there is no data to be responde we simple send a message
        return res.status(410).json({
            success: true,
            message: "product deleted sucessfully",
        })

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }

})

module.exports = {
    get,
    show,
    create,
    update,
    deleteProduct,
}