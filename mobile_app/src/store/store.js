import {configureStore} from '@reduxjs/toolkit'
import {placeApi} from "../features/placesApi";

export const store = configureStore({
    reducer: {
        [placeApi.reducerPath]: placeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(placeApi.middleware),
})
