import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHeart, faStar} from "@fortawesome/free-solid-svg-icons";
import {useNavigation} from "@react-navigation/native";

function PlaceCard(
    {
        title = '',
        star = 5,
        image,
        location,
        price = 0
    }
) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity className="py-2 relative" onPress={(event) => {
            navigation.navigate('PlaceDetail');
        }}>
            <Image
                source={{uri: image}} alt={title}
                className="w-full h-64 rounded-2xl"
            />
            <TouchableOpacity
                className="p-3 absolute top-5 right-4"
                onPress={() => {
                    console.log(465)
                }}
            >
                <FontAwesomeIcon icon={faHeart} size={25} color={'gray'}/>
            </TouchableOpacity>
            <View className="flex-col justify-between">
                <View className="flex-row items-center justify-between">
                    <Text className="font-medium">{location}</Text>
                    <View className="flex-row items-center justify-between space-x-2">
                        <FontAwesomeIcon icon={faStar} size={20} color={'gray'}/>
                        <Text>{star}</Text>
                    </View>
                </View>
                <Text className="text-gray-600">100 Kilometer away</Text>
                <Text className="text-gray-600">11-16 Jan</Text>
                <Text>
                    <Text className="text-gray-800 font-medium">{price}</Text>
                </Text>
            </View>
        </TouchableOpacity>
    );
}


export default PlaceCard;
