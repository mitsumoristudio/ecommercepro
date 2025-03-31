
import ProductModel from "../modals/ProductModels.js";
import asyncHandler from "../middleware/asyncHandler.js";
import mongoose from "mongoose";

// @desc Fetch all products
// @route GET /api/products
// @access Public
 const getAllProducts = asyncHandler(async (req, res) => {

     const pageSize = 5;
     const page = Number(req.query.pageNumber) || 1;


     const keyword = req.query.keyword ? { name : {$regex: req.query.keyword, $options: "i" } } : { };
     const countpage = await ProductModel.countDocuments({...keyword});

    const products = await ProductModel.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({products, page, pages: Math.ceil(countpage/pageSize)})
   // res.json(products);
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

// @desc    Create a New Review
// @route   POST /api/products/:id/review
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body;
    const product = await ProductModel.findById(req.params.id)

    if (product) {
        const alreadyReviews = product.review.find(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviews) {
            res.status(400);
            throw new Error("Product was already reviewed")
        }
        const updatedReview = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            user: req.user._id,
        };

        product.review.push(updatedReview);

        product.numReviews = product.review.length;

        product.rating =
            product.review.reduce((acc, review) => acc + review.rating, 0) /
            product.review.length;

        await product.save();

        res.status(201).json({message:"Product reviewed added"})
    } else {
        res.status(404)
        throw new Error('Resource was not found')
    }
})

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await ProductModel.find({}).sort({ rating: -1}).limit(3);
    res.status(200).json(products);
});


export {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, createProductReview, getTopProducts};