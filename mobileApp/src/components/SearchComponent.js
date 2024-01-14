import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {useNavigation} from "@react-navigation/native";
import SearchScreen from "../screens/SearchScreen";
import {SearchBar, Button} from '@rneui/themed';
import {ThemeContext} from "../context/ThemeContext";
import {colors} from "../config/theme";

const SearchComponent = () => {
    // get Theme
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    const navigation = useNavigation();
    return (
        <View style={[styles.container, {backgroundColor: '#fff'}]}>
            <Text style={[styles.search_label, {color: '#616161'}]}>
                Find a room anywhere
            </Text>
            <SearchBar
                placeholder={"Enter an address"}
                platform="android"
                searchIcon={<FontAwesomeIcon icon={faLocationDot} size={20} color={activeColors.primary}/>}
                containerStyle={{borderRadius: 5}}
                inputStyle={{fontSize: 16}}
            />

            <Button title={'Search Now'}
                    color={activeColors.primary}
                    buttonStyle={{marginTop: 9}}
                    onPress={() => {
                        navigation.navigate('Search')
                    }}
            />

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Filter')
                }}
            >
                <Text style={[styles.search_advanced, {color: activeColors.text}]}>Advanced Search</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingTop: 15,
        paddingBottom: 20,
        borderRadius: 8,
    },
    search_label: {
        marginLeft: 18.5,
        marginBottom: 8,
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: 700,
    },
    search_advanced: {
        marginTop: 8,
        textAlign: "right",
        fontWeight: 500,
        fontSize: 15,
        fontStyle: "normal",
    }

})
export default SearchComponent;
