import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../../context/ThemeContext";
import {colors} from "../../config/theme";

const PlaceCategory = (
    {
        categoryList,
        categoryIndex = 1,
        setCategoryIndex
    }
) => {
    // get color
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style={[styles.container, {
                backgroundColor: activeColors.background,
                borderColor: activeColors.primary,
            }]}
        >
            {categoryList?.map((categoryItem, index) => {
                return (
                    <TouchableOpacity
                        key={categoryItem.id}
                        className={`px-2 py-3 items-center ${
                            categoryIndex === categoryItem.id ? "border-b pt-0 mb-1" : ""
                        }`}
                        onPress={() => {
                            setCategoryIndex(categoryItem.id)
                        }}
                    >
                        <Text
                            className={`w-4 h-4 opacity-75 ${
                                categoryIndex === categoryItem.id ? "opacity-100" : "opacity-20"
                            }`}
                            style={{color: activeColors.primary, }}
                        >{categoryItem.icon}</Text>
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

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingTop: 10,
        paddingBottom: 3,
        borderRadius: 8,
        borderBottomWidth: 1,
    }
})
export default PlaceCategory;
