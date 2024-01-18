import {configureStore} from '@reduxjs/toolkit'
import {placeApi} from "../features/placesApi";
import {wishlistSlice} from "../features/wishlistSlice";

export const store = configureStore({
    reducer: {
        wishlistPlace: wishlistSlice,
        [placeApi.reducerPath]: placeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(placeApi.middleware),
})
