import {createSlice} from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
    name: 'wishlistPlaceList',

    initialState: {
        places: [],
    },
    reducers: {
        addWishlistPlace: (state, action) => {
            console.log(465465)
            const isWishlist = state.places.findIndex(
                (place) => place.title == action.payload.title
            );
            console.log('isWishlist  ' + isWishlist);

            if (isWishlist <= 0) {
                state.places = [...state.places, action.payload];
            }
            console.log('addWishlistPlace state: ' + state);
        },
        removeWishlistPlace: (state, action) => {
            console.log('removeWishlistPlace state: ' + state);
        },
    },
});

// Action creators are generated for each case reducer function
export const {addWishlistPlace, removeWishlistPlace} = wishlistSlice.actions;
export const selectedWishlistPlaces = (state) => state.wishlistPlace.places;
export default wishlistSlice.reducer;
