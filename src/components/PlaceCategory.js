import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity} from "react-native";

const PlaceCategory = ({
                           categoryList,
                           categoryIndex = 1,
                           setCategoryIndex
                       }) => {
    return (
        <ScrollView
            contentContainerStyle={{paddingHorizontal: 5, paddingTop: 10}}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            className="border-b pb-3 border-gray-300"
        >
            {categoryList?.map((categoryItem, index) => {
                return (
                    <TouchableOpacity
                        key={categoryItem.id}
                        className={`px-2 py-3 items-center ${
                            categoryIndex === categoryItem.id ? "border-b pb-5" : ""
                        }`}
                        onPress={()=> {setCategoryIndex(categoryItem.id)}}
                    >
                        <Image source={{uri: categoryItem.icon}}
                               className={`w-3 h-3 opacity-75${
                                   categoryIndex === categoryItem.id ? "opacity-100" : ""
                               }`}
                        />
                        <Text
                            className={
                                categoryIndex === categoryItem.id
                                    ? "text-black"
                                    : "text-gray-600"
                            }
                        >
                            {categoryItem.name}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    );
};

export default PlaceCategory;
