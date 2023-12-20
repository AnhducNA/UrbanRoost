import React, {useContext} from 'react';
import {StyleSheet, Text, useColorScheme, View} from "react-native";
import {colors} from "../config/theme";
import {ThemeContext} from "../context/ThemeContext";

const RoommateScreen = () => {
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    return (
        <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: activeColors.background}}>
            <Text>Roommate screen!</Text>
        </View>
    );
};

export default RoommateScreen;
