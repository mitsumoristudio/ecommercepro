
import {PRODUCTS_URL} from "../../urlconstants";
import {apiSlice} from "./apiSlice";

// For Asynchronous request
// injectEndpoints- will make a request to our backend API to get all of the products. keepUnsusedDataFor keeps the data in cache for 5 secs
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ( { pageNumber, keyword }) => ({
                url: PRODUCTS_URL,
                params: {
                    pageNumber: pageNumber,
                    keyword: keyword,
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Products"],
        }),
        getProductDetailsById: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation(({
            query: (data) => ({
                url: `${PRODUCTS_URL}/ ${data.productId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Products'], // clear cache the products
        })),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: "DELETE",
            })
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: "POST",
                body: data,
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ['Product'],
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`,
            }),
            keepUnusedDataFor: 5,
        })


    })
});

export const { useGetProductsQuery,
               useGetProductDetailsByIdQuery,
               useCreateProductMutation,
               useUpdateProductMutation,
               useDeleteProductMutation,
               useCreateReviewMutation,
               useGetTopProductsQuery,} = productsApiSlice;