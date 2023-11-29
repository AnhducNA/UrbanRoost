import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

const PlaceCard = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Image
                source={{uri: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'}}/>
            <Text>Son tra, Viet Nam</Text>
            <View>
                <FontAwesomeIcon icon={faStar} size={20} color={'gray'}/>
                <Text>5</Text>
            </View>
            <Text className="text-gray-600">134 Kilometer away</Text>
            <Text className="text-gray-600">11-16 Jan</Text>
            <Text>
                <Text className="text-gray-800 font-medium">30$</Text>
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
