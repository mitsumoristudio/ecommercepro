
import {PRODUCTS_URL} from "../../urlconstants";
import {apiSlice} from "./apiSlice";

// For Asynchronous request
// injectEndpoints- will make a request to our backend API to get all of the products. keepUnsusedDataFor keeps the data in cache for 5 secs
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getProductDetailsById: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        })
    })
});

export const { useGetProductsQuery, useGetProductDetailsByIdQuery } = productsApiSlice;