import React, {useContext, useEffect, useState} from 'react';
import request from "../../api/request";
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SearchComponent from "../../components/search/SearchComponent";
import PlaceCategory from "../../components/place/PlaceCategory";
import PlaceCard from "../../components/place/PlaceCard";
import {ThemeContext} from "../../context/ThemeContext";
import {colors} from "../../config/theme";
import {useNavigation} from "@react-navigation/native";

const PlaceList = ({route}) => {
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
    // category
    const [categoryList, setCategoryList] = useState([]);
    const [categoryIndex, setCategoryIndex] = useState(1);
    // Set PlaceList and pagination
    const [placeList, setPlaceList] = useState([]);
    const [totalData, setTotalData] = useState()
    const [totalPage, setTotalPage] = useState()
    const [page, setPage] = useState(1);
    const limit = 10;

    const getCategoryList = async () => {
        await request.getCategoryList(10, 1)
            .then((response) => {
                setCategoryList(response.data.data);
            })
            .catch(error => {
                console.log('Error getPlaceList: ' + error.message);
            });
    }
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
                    console.log('Error getPlaceList: ' + error.message);
                })
        }
    };
    useEffect(() => {
        getCategoryList();
        getPlaceList(limit, page, search);
    }, [limit, page, search]);
    return (
        <SafeAreaView style={[styles.container]} className="bg-gray-300">
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
                    <Text className="pl-5 font-bold text-xl">
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

export default PlaceList;
