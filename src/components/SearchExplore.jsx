import React from 'react';
import {Text, Touchable, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAdjust, faSearch} from "@fortawesome/free-solid-svg-icons";
import {useNavigation} from "@react-navigation/native";

const SearchExplore = () => {
    const navigation = useNavigation();
    return (
        <View
            className="flex-row justify-between px-3 py-2 mx-3 border-2 rounded-full border-gray-200 shadow items-center">
            <FontAwesomeIcon icon={faSearch} size={20} color='black'/>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Search')
                }}
            >
                <Text className="font-semibold text-lg text-gray-600" >
                    Where To ?
                </Text>
                <Text className="text-gray-300">AnyWhere Any Week Add Guests</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="rounded-full border-2 border-gray-300 p-2"
                onPress={() => {
                    navigation.navigate('Filter')
                }}
            >
                <FontAwesomeIcon icon={faAdjust} size={20} color='black'
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchExplore;
