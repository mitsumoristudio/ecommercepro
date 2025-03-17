
import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./features/reduxslices/apiSlice";
import cartSliceReducer from "./features/reduxslices/cartSlice"

 const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cartSlice: cartSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;