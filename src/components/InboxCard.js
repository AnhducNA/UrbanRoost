import React from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";

const InboxCard = ({
                       name,
                       image,
                       time,
                       description,
                       status
                   }) => {
    return (
        <TouchableOpacity className={"py-4 px-3 flex-row items-center space-x-3 border-b border-gray-400"}>
            <View>
                <Image
                    className={"w-16 h-16 rounded-full"}
                    source={{uri: image}}
                />
            </View>
            <View className={"flex-1"}>
                <View className={"flex-row items-center justify-between space-x-4"}>
                    <Text className={"text-lg text-gray-800 font-medium"}>{name}</Text>
                    <Text className={"text-base text-gray-500 font-light"}>{time}</Text>
                </View>
                <Text className={"font-medium text-base text-black-800"}>{description}</Text>
                <Text className={"text-base text-green-800 capitalize"}>{status}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default InboxCard;
