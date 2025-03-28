
import express from "express";
import ProductModel from "../modals/ProductModels.js";
import asyncHandler from "../middleware/asyncHandler.js";
import {getProductById, getAllProducts, createProduct, updateProduct} from "../controllers/productController.js";
import {protectRoutes, admin} from "../middleware/authMiddleware.js";

// import mockproducts from "../mockdata/mockproducts.js"; // for seeding data

const router = express.Router();


router.route("/").get(getAllProducts);
router.route("/").post(protectRoutes, admin, createProduct);
router.get("/:id", getProductById);
router.route("/:id").put(protectRoutes, admin, updateProduct);

// TODO Get All Products w/out controller
// Get All Products
// router.get('/', asyncHandler(async (req, res) => {
//     const products = await ProductModel.find({}); // pass in a empty object to get all of them
//     res.json(products);
// })
// );

// TODO Get ProductbyID w/out controller
// Get Single Product from id.
// router.get("/:id", asyncHandler(async (req, res) => {
//     const product = await ProductModel.findById(req.params.id);
//     if (product) {
//         res.json(product);
//     } else {
//         res.status(404).json({message: 'Product not found'});
//     }
// }))

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