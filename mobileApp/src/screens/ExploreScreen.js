import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View} from "react-native";
import PlaceCard from "../components/place/PlaceCard";
import {useGetPlacesQuery} from "../features/placesApi";
import PlaceCategory from "../components/place/PlaceCategory";
import categoryList from "../data/categoryData";
import SearchExplore from "../components/SearchExplore";
import {ThemeContext} from "../context/ThemeContext";
import {colors} from "../config/theme";
import request from "../api/request";

const ExploreScreen = () => {

    const [categoryIndex, setCategoryIndex] = useState(1);
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    const [places, setPlaces] = useState([]);

    const getPlaces = async () => {
        try {
            await request.getPlaces().then((response) => {
                setPlaces(response.data);
            });
        } catch (error) {
            console.log(error.message)
        }
    };
    useEffect(() => {
        getPlaces();
    }, []);

    return (
        <View className={"mt-7"} style={{backgroundColor: activeColors.background}}>
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
