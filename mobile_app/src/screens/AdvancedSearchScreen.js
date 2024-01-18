import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../context/ThemeContext";
import {colors} from "../config/theme";
import AdvancedSearchComponent from "../components/search/AdvancedSearchComponent";
import {useNavigation} from "@react-navigation/native";

const AdvancedSearchScreen = () => {
    // get Color
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    // navigation
    const navigation = useNavigation();
    return (
        <SafeAreaView style={[styles.wrapper, {backgroundColor: activeColors.background}]}>
            <TouchableOpacity style={[styles.container_header, {backgroundColor: activeColors.primary}]}
                              onPress={() => {
                                  navigation.navigate('Home');
                              }}
            >
                    <Text style={[styles.heading1, {color: activeColors.heading1}]}>UrbanRoost</Text>
            </TouchableOpacity>
            <ScrollView style={styles.container_body}>
                <AdvancedSearchComponent/>
            </ScrollView>
        </SafeAreaView>
    );
};
// define styles
const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        position: "relative",
    },
    container_header: {
        width: '100%',
        minHeight: 200,
        position: "absolute",
        top: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderWidth: 1,
        borderColor: '#000',
        shadowRadius: 4,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
    },
    heading1: {
        textAlign: 'center',
        fontSize: 24,
        fontStyle: 'normal',
        marginTop: 40
    },
    container_body: {
        marginTop: 90,
        marginHorizontal: 15,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    }
});
export default AdvancedSearchScreen;
