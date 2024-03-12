import React, {useContext, useEffect, useState} from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../context/ThemeContext";
import {colors} from "../config/theme";
import {useNavigation} from "@react-navigation/native";
import request from "../api/request";
import RNPickerSelect from "react-native-picker-select";

const AdvancedSearchPage = () => {
    // get Theme
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    // router
    const navigation = useNavigation();
    // search
    const [searchData, setSearchData] =
        useState({'search_place_location': '', 'search_place_category': ''});
    // category
    let [nameCategoryList, setNameCategoryList] = useState([]);

    const getCategoryList = async () => {
        await request.getCategoryList(10, 1)
            .then((response) => {
                const categoryList = response.data.data;
                let newData = [];
                categoryList.map(category => {
                    newData.push({['label']: category.name, ['value']: category.id});
                })
                setNameCategoryList(newData);
            })
            .catch(error => {
                console.log('Error getCategoryList: ' + error.message);
            });
    }
    useEffect(() => {
        getCategoryList();
    }, []);

    return (
        <SafeAreaView className={' h-full bg-gray-300'}>
            <TouchableOpacity style={[styles.container_header, {backgroundColor: activeColors.primary}]}
                              onPress={() => {
                                  navigation.navigate('Home');
                              }}
            >
                    <Text style={[styles.heading1, {color: activeColors.heading1}]}>UrbanRoost</Text>
            </TouchableOpacity>
            <ScrollView style={styles.container_body}>
                <View className={'px-3 py-4 bg-white'}>
                    <Text className={'m-3 text-xl font-semibold '}>
                        Find a place anywhere
                    </Text>
                    <TextInput
                        className={"px-3 py-2 mb-5 bg-gray-200 text-base rounded"}
                        placeholderTextColor='gray'
                        placeholder={"Search an address or city"}
                        onChangeText={(value) => {
                            const newSearchData = {...searchData, ['search_place_location']: value};
                            setSearchData(newSearchData)
                        }}
                    />
                    <RNPickerSelect
                        placeholder={{label: "Select Category Place", value: null}}
                        onValueChange={(value) => {
                            const newSearchData =
                                {...searchData, ['search_place_category']: value};
                            setSearchData(newSearchData);
                        }}
                        items={nameCategoryList}
                        style={pickerSelectStyles}
                    />
                    <View className={'py-1 mt-4 rounded-full bg-blue-600'}>
                        <Button
                            title={'Search Advanced'}
                            color='#fff'
                            onPress={() => {
                                alert('Search for: ' + searchData.search_place_location + ' in ' + searchData.search_place_category);
                                navigation.navigate('PlaceList', {
                                    search: searchData.search_place_location,
                                    search_place_category: searchData.search_place_category,
                                });
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    }
});
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
export default AdvancedSearchPage;
