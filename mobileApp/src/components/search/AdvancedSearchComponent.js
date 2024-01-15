import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
    faDollar, faDollarSign, faHome, faHomeAlt,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {useNavigation} from "@react-navigation/native";
import {SearchBar, Button} from '@rneui/themed';
import {ThemeContext} from "../../context/ThemeContext";
import {colors} from "../../config/theme";

const AdvancedSearchComponent = () => {
    // get Theme
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    // router
    const navigation = useNavigation();
    return (
        <View style={[styles.container, {backgroundColor: '#fff'}]}>
            <Text style={[styles.search_label, {color: '#616161'}]}>
                Find a room anywhere
            </Text>
            <SearchBar
                placeholder={"Enter an address or city"}
                platform="android"
                searchIcon={<FontAwesomeIcon icon={faLocationDot} size={20} color={activeColors.primary}/>}
                containerStyle={{borderRadius: 5, backgroundColor: '#F7F7F7'}}
                inputStyle={{fontSize: 16}}
            />
            <SearchBar
                placeholder={"Enter price range"}
                platform="android"
                searchIcon={<FontAwesomeIcon icon={faDollar} size={20} color={activeColors.primary}/>}
                containerStyle={{borderRadius: 5, backgroundColor: '#F7F7F7'}}
                inputStyle={{fontSize: 16}}
            />

            <SearchBar
                placeholder={"Enter room type"}
                platform="android"
                searchIcon={<FontAwesomeIcon icon={faHome} size={20} color={activeColors.primary}/>}
                containerStyle={{borderRadius: 5, backgroundColor: '#F7F7F7'}}
                inputStyle={{fontSize: 16}}
            />

            <Button title={'Search Now'}
                    color={activeColors.primary}
                    buttonStyle={{marginTop: 9}}
                    onPress={() => {
                        navigation.navigate('AdvancedSearch')
                    }}
            />
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
    }

})
export default AdvancedSearchComponent;
