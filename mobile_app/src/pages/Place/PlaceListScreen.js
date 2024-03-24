import React, {useContext, useEffect, useState} from 'react';
import request from "../../api/request";
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SearchComponent from "../../components/search/SearchComponent";
import PlaceCard from "../../components/place/PlaceCard";
import {ThemeContext} from "../../context/ThemeContext";
import {colors} from "../../config/theme";
import {useNavigation} from "@react-navigation/native";

const PlaceListScreen = ({route}) => {
    // search
    const search = (route.params && route.params.search) ? (route.params.search) : '';
    const search_place_category = (route.params && route.params.search_place_category) ?
        (route.params.search_place_category) : '';
    // console.log(search_place_category)
    // get Theme
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    // navigation
    const navigation = useNavigation();
    // Set PlaceList and pagination
    const [placeList, setPlaceList] = useState([]);
    const [totalData, setTotalData] = useState()
    const [totalPage, setTotalPage] = useState()
    const [page, setPage] = useState(1);
    const limit = 10;


    const getPlaceList = async (limit, page, search) => {
        if (!!search_place_category) {
            await request.getPlaceListBySearchAdvanced(limit, page, search, search_place_category)
                .then((response) => {
                    setPlaceList(response.data.data);
                    limit = setTotalData(response.data.pagination.limit) ? setTotalData(response.data.pagination.limit) : limit
                    page = setTotalData(response.data.pagination.page) ? setTotalData(response.data.pagination.page) : page
                    setTotalData(response.data.pagination.totalData)
                    setTotalPage(response.data.pagination.totalPage)
                })
                .catch(error => {
                    console.log('Error getPlaceListBySearchAdvanced: ' + error.message);
                })
        } else {
            await request.getPlaceList(limit, page, search)
                .then((response) => {
                    setPlaceList(response.data.data);
                    limit = setTotalData(response.data.pagination.limit) ? setTotalData(response.data.pagination.limit) : limit
                    page = setTotalData(response.data.pagination.page) ? setTotalData(response.data.pagination.page) : page
                    setTotalData(response.data.pagination.totalData)
                    setTotalPage(response.data.pagination.totalPage)
                })
                .catch(error => {
                    console.log('Error getPlaceList1: ' + error.message);
                })
        }
    };
    useEffect(() => {
        getPlaceList(limit, page, search);
    }, [limit, page, search]);
    return (
        <SafeAreaView style={[styles.container]} className="bg-gray-300">
            <TouchableOpacity
                style={[styles.container_header, {backgroundColor: activeColors.primary}]}
                onPress={() => {
                    navigation.navigate('Home');
                }}
            >
                <Text style={[styles.heading1, {color: activeColors.heading1}]}>UrbanRoost</Text>
            </TouchableOpacity>
            <ScrollView style={styles.container_body}>
                <SearchComponent/>
                <View style={{borderRadius: 4}}>
                    <Text className="pl-5 py-5 bg-blue-100 font-bold rounded text-xl">
                        Place ({totalData})
                    </Text>
                    {(placeList)?.map((placeItem, index) => {
                        return (
                            <PlaceCard
                                key={index}
                                placeId={placeItem.id}
                                title={placeItem.title}
                                description={placeItem.description}
                                image={placeItem.img}
                                location={placeItem.location}
                                star={placeItem.star}
                                price={placeItem.price}
                                state={placeItem.state}
                                user_name={placeItem.user_name}
                                user_avatar={placeItem.user_avatar}
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

export default PlaceListScreen;
