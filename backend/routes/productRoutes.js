
import express from "express";
import ProductModel from "../modals/ProductModels.js";
import asyncHandler from "../middlewares/asyncHandler";

// import mockproducts from "../mockdata/mockproducts.js";

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const products = await ProductModel.find({});
    res.json(products);
})
);

router.get("/:id", asyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({message: 'Product not found'});
    }
}))

// TODO Mockdata
// Getting Multiple Product from backend URL mockdata
// router.get("/", async (req, res) => {
//     res.json(mockproducts);
// })

// TODO MockData Single Product
// Getting Single Product from backend URL
//
// router.get("/:id", async (req, res) => {
//     const product = mockproducts.find((p) => p._id === req.params.id);
//     res.json(product); // if the id matches the id in the url, return json product
// })

export default router;