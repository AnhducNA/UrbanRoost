import React from 'react';
import {ScrollView, View} from "react-native";
import PlaceCard from "../components/PlaceCard";
import {useGetPlacesQuery} from "../services/placesApi";

const ExploreScreen = () => {
    const {
        data: places,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPlacesQuery();
    return (
        <View>
            <ScrollView className="px-4 mt-5">
                {(places)?.map((placeItem, index) => {
                    console.log(placeItem)
                    return (
                        <PlaceCard
                            key={index}
                            title={placeItem.title}
                            star={placeItem.star}
                            image={placeItem.img}
                            location={placeItem.location}
                            price={placeItem.price}
                        />
                    )
                })}
            </ScrollView>
        </View>
    );
};

export default ExploreScreen;
