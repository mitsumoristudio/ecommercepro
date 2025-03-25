
import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./features/slices/apiSlice";
import cartSliceReducer from "./features/slices/cartSlice"
import authSliceReducer from "./features/slices/authSlice"

 const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cartslice: cartSliceReducer, // added from cartSlice
        auth: authSliceReducer, // added from autSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;