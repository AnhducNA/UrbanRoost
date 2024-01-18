import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PlaceCard from "../components/place/PlaceCard";
import PlaceCategory from "../components/place/PlaceCategory";
import categoryList from "../data/categoryData";
import SearchComponent from "../components/search/SearchComponent";
import {ThemeContext} from "../context/ThemeContext";
import {colors} from "../config/theme";
import request from "../api/request";
import {useNavigation} from "@react-navigation/native";

const HomeScreen = () => {
    // get Theme
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    // navigation
    const navigation = useNavigation();
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
        <SafeAreaView style={[styles.container, {backgroundColor: activeColors.background}]}>
            <TouchableOpacity style={[styles.container_header, {backgroundColor: activeColors.primary}]}
                              onPress={() => {
                                  navigation.navigate('Home');
                              }}
            >
                <Text style={[styles.heading1, {color: activeColors.heading1}]}>UrbanRoost</Text>
            </TouchableOpacity>
            <ScrollView style={styles.container_body}>
                <SearchComponent/>
                <PlaceCategory
                    categoryList={categoryList}
                    categoryIndex={categoryIndex}
                    setCategoryIndex={setCategoryIndex}
                />
                <View style={{paddingTop: 20, backgroundColor: activeColors.background, borderRadius: 4}}>
                    <Text style={{fontSize: 20, paddingLeft: 15}}>
                        Recently Added Room
                    </Text>
                    {(places)?.map((placeItem, index) => {
                        return (
                            <PlaceCard
                                key={index}
                                placeId = {placeItem.id}
                                title={placeItem.title}
                                description={placeItem.description}
                                image={placeItem.img}
                                location={placeItem.location}
                                star={placeItem.star}
                                type_place={placeItem.type_name}
                                price={placeItem.price}
                                latitude={placeItem.lat}
                                longitude={placeItem.long}
                                state={placeItem.state}
                            />
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
// define styles
const styles = StyleSheet.create({
    container: {
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

export default HomeScreen;
