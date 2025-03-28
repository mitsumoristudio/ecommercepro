
import ProductModel from "../modals/ProductModels.js";
import asyncHandler from "../middleware/asyncHandler.js";
import mongoose from "mongoose";

// @desc Fetch all products
// @route GET /api/products
// @access Public
 const getAllProducts = asyncHandler(async (req, res) => {
    const products = await ProductModel.find({})
    res.json(products);
})

// @desc Get a SingleProduct by ID
// @route GET /api/products/:id
// @access Public
 const getProductById = asyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({message: `Product was not found`})
    }
})

// @desc Create a Product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new ProductModel({
        name: "Sample Name",
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: "Sample Description",
    })
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc Update a Product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await ProductModel.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updateProduct = await product.save();
        res.json(updateProduct);

    } else {
        res.status(404).json({message:"No Product was found"})

    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = ProductModel.findById(req.params.id);

    if (product) {
        await ProductModel.deleteOne(product);

       // await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({message:"No Product was found"})
    }
})


export {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct};