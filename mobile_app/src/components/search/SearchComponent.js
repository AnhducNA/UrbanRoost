import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {ThemeContext} from "../../context/ThemeContext";
import {colors} from "../../config/theme";

const SearchComponent = () => {
    // get Theme
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    // navigation
    const navigation = useNavigation();
    // search
    const [searchData, setSearchData] =
        useState({'search_type': 'search_place', 'search_text': ''});
    return (
        <View style={[styles.container, {backgroundColor: '#fff'}]}>
            <TextInput
                className={"px-3 py-2 mb-2 bg-gray-200 rounded"}
                placeholder={"Search an address or city"}
                onChangeText={(value) => {
                    const newSearchData = {...searchData, ['search_text']: value};
                    setSearchData(newSearchData)
                }}
            >
            </TextInput>
            <Button
                title={'Search Now'}
                color={activeColors.primary}
                onPress={() => {
                    alert('Search for: ' + searchData.search_text);
                    navigation.navigate('PlaceList', {
                        search: searchData.search_text,
                    });
                }}
            />

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('AdvancedSearch')
                }}
            >
                <Text style={[styles.search_advanced]} className="text-blue-700 underline">Advanced Search</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingTop: 15,
        paddingBottom: 20,
        borderRadius: 8,
    },
    search_advanced: {
        marginTop: 8,
        textAlign: "right",
        fontWeight: 500,
        fontSize: 15,
        fontStyle: "normal",
    }

})
export default SearchComponent;
