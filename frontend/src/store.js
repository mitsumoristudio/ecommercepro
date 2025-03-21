
import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./features/reduxslices/apiSlice";
import cartSliceReducer from "./features/reduxslices/cartSlice"
import authSliceReducer from "./features/reduxslices/authSlice"

 const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cartSlice: cartSliceReducer, // added from cartSlice
        auth: authSliceReducer, // added from autSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;