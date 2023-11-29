import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

function PlaceCard(
    {
        title = '',
        star = 5,
        image,
        location,
        price = 0
    }
) {
    return (
        <TouchableOpacity style={styles.button}>
            <Image
                source={{uri: image}} alt={title}/>
            <Text>{location}</Text>
            <View>
                <FontAwesomeIcon icon={faStar} size={20} color={'gray'}/>
                <Text>{star}</Text>
            </View>
            <Text className="text-gray-600">{} Kilometer away</Text>
            <Text className="text-gray-600">11-16 Jan</Text>
            <Text>
                <Text className="text-gray-800 font-medium">{price}</Text>
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 10,
    },
})

export default PlaceCard;
