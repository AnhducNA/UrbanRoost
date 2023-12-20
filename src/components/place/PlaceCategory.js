import React, {useContext} from 'react';
import {Image, ScrollView, Text, TouchableOpacity} from "react-native";
import {ThemeContext} from "../../context/ThemeContext";
import {colors} from "../../config/theme";

const PlaceCategory = ({
                           categoryList,
                           categoryIndex = 1,
                           setCategoryIndex
                       }) => {
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
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
                            categoryIndex === categoryItem.id ? "border-b pt-0 mb-1" : ""
                        }`}
                        onPress={()=> {setCategoryIndex(categoryItem.id)}}
                    >
                        <Image source={{uri: categoryItem.icon}}
                               className={`w-4 h-4 opacity-75${
                                   categoryIndex === categoryItem.id ? "opacity-100" : ""
                               }`}
                               style={{backgroundColor: activeColors.text, resizeMode: "cover"}}
                        />
                        <Text
                            className={
                                categoryIndex === categoryItem.id
                                    ? "text-black"
                                    : "text-gray-600"
                            }
                            style={{color: activeColors.text}}
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
