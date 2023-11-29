import React, {useState} from 'react';
import {ScrollView, View} from "react-native";
import PlaceCard from "../components/PlaceCard";
import {useGetPlacesQuery} from "../services/placesApi";
import PlaceCategory from "../components/PlaceCategory";
import categoryList from "../data/categoryData";
import SearchExplore from "../components/SearchExplore";

const ExploreScreen = () => {
    const {
        data: places,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPlacesQuery();
    const [categoryIndex, setCategoryIndex] = useState(1);
    return (
        <View className={"mt-7"}>
            <SearchExplore/>
            <PlaceCategory
                categoryList={categoryList}
                categoryIndex={categoryIndex}
                setCategoryIndex={setCategoryIndex}
            />
            <ScrollView className="px-4 mt-5">
                {(places)?.map((placeItem, index) => {
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
