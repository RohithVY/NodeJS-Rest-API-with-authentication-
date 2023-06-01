
const asyncHandler = require("express-async-handler");
const productModel = require("../models/product.model");
const uid = require('../middleware/uid');

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

    const { name, description, price } = req.body
    const productId = uid();

    try {
        //creating the product
        const product = await new productModel({
            productId: productId,
            name: name,
            description: description,
            price: price
        })
        //save the product
        product.save();

        return res.status(201).json({
            success: true,
            message: "product created sucessfully",
            data: product
        })
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
});

const update = asyncHandler(async (req, res) => {

    const { name, description, price } = req.body
    //Destructing the id from req.params
    const { id } = req.params

    let product = await productModel.findOne({ productId: id });

    try {
        if (product) {
            //updating the datas of that product
            product.updateOne(
                {
                    $set: {
                        name: name,
                        description: description,
                        price: price,
                    }
                },
                {}, { new: true }
            )
            return res.status(201).json({
                success: true,
                message: "product updated sucessfully",
                data: product
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "product not found",
            })
        }
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
