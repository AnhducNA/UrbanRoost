import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const placeApi = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // Set the baseUrl for every endpoint below
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.jsonkeeper.com',
    }),
    // The "endpoints" represent operations and requests for this server
    endpoints: (builder) => ({
        // The `getPosts` endpoint is a "query" operation that returns data
        getPlaces: builder.query({
            // The URL for the request is '/fakeApi/posts'
            query: () => '/b/5NPS',
        })
    })
})
// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {useGetPlacesQuery} = placeApi;


