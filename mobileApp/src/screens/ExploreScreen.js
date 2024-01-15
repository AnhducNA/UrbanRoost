import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import PlaceCard from "../components/place/PlaceCard";
import PlaceCategory from "../components/place/PlaceCategory";
import categoryList from "../data/categoryData";
import SearchComponent from "../components/search/SearchComponent";
import {ThemeContext} from "../context/ThemeContext";
import {colors} from "../config/theme";
import request from "../api/request";
import {Card} from "@rneui/themed";

const ExploreScreen = () => {
    // get Theme
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    const [categoryIndex, setCategoryIndex] = useState(1);
    const [places, setPlaces] = useState([]);
    const getPlaces = async () => {
        try {
            await request.getPlaces().then((response) => {
                setPlaces(response.data);
            });
        } catch (error) {
            console.log('Error getPlaces: ' + error.message);
        }
    };
    useEffect(() => {
        getPlaces();
    }, []);

    return (
        <SafeAreaView style={[styles.wrapper, {backgroundColor: activeColors.background}]}>
            <View style={[styles.container_header, {backgroundColor: activeColors.primary}]}>
                <Text style={[styles.heading1, {color: activeColors.heading1}]}>UrbanRoost</Text>
            </View>
            <ScrollView style={styles.container_body}>
                <SearchComponent/>
                <PlaceCategory
                    categoryList={categoryList}
                    categoryIndex={categoryIndex}
                    setCategoryIndex={setCategoryIndex}
                />
                <Card containerStyle={{borderRadius: 4}}>
                    <Card.Title>
                        Recently Added Room
                    </Card.Title>
                    {(places)?.map((placeItem, index) => {
                        return (
                            <PlaceCard
                                key={index}
                                title={placeItem.title}
                                star={placeItem.star}
                                image={placeItem.img}
                                location={placeItem.location}
                                price={placeItem.price}
                                latitude={placeItem.lat}
                                longitude={placeItem.long}
                                state={placeItem.state}
                            />
                        )
                    })}
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
};
// define styles
const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        position: "relative",
    },
    container_header: {
        width: '100%',
        minHeight: 200,
        position: "absolute",
        top: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderWidth: 1,
        borderColor: '#000',
        shadowRadius: 4,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
    },
    heading1: {
        textAlign: 'center',
        fontSize: 24,
        fontStyle: 'normal',
        marginTop: 40
    },
    container_body: {
        marginTop: 90,
        marginHorizontal: 15,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    }
});

export default ExploreScreen;
