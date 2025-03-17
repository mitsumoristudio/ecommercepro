
import mongoose from "mongoose";
import {reviewSchema} from "./ReviewModels.js";

export const productSchema = new mongoose.Schema(
        {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
            name: {
            type: String,
                required: true,
            },
            image: {
            type: String,
                required: true,
            },
            brand: {
            type: String,
                required: true,
            },
            category: {
            type: String,
                required: true,
            },
            description: {
            type: String,
                required: true,
            },
            review: [reviewSchema],
            rating: {
            type: Number,
                required: true,
                default: 0,
            },
            numReviews: {
            type: Number,
                required: true,
                default: 0,
            },
            price: {
            type: Number,
                required: true,
                default: 0,
            },
            countInStock: {
            type: Number,
                required: true,
                default: 0,
            },

    },
        {
            timestamps: true,
        })

export const ProductModel = mongoose.model('Product', productSchema);

    export default ProductModel;