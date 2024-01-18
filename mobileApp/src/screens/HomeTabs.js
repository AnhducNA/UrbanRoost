import React, {useContext} from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import WishlistsScreen from "./WishlistsScreen";
import InboxScreen from "./InboxScreen";
import ProfileScreen from "./ProfileScreen";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
    faHeart,
    faMagnifyingGlass,
    faMessage, faSearchLocation,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import {ThemeContext} from "../context/ThemeContext";
import {colors} from "../config/theme";
import AdvancedSearchScreen from "./AdvancedSearchScreen";

const Tab = createBottomTabNavigator();
const HomeTabs = () => {
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarStyle: {backgroundColor: activeColors.background, minHeight: 55, paddingTop:5},
                tabBarItemStyle: {},
                tabBarActiveTintColor: activeColors.primary,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarLabelStyle: {fontSize:13},
                tabBarIcon: ({focused, color, size}) => {
                    let colorName = "gray";
                    let opacity = 0.9;
                    let iconSize = 22
                    if (focused) {
                        colorName = activeColors.primary;
                    }
                    if (route.name === "Home") {
                        return (
                            <FontAwesomeIcon icon={faMagnifyingGlass}
                                             color={colorName}
                                             opacity={opacity}
                                             size={iconSize}
                            />
                        )
                    } else if (route.name === "Search") {
                        return (
                            <FontAwesomeIcon icon={faSearchLocation}
                                             color={colorName}
                                             opacity={opacity}
                                             size={iconSize}
                            />
                        )
                    } else if (route.name === "Wishlists") {
                        return (
                            <FontAwesomeIcon icon={faHeart}
                                             color={colorName}
                                             opacity={opacity}
                                             size={iconSize}
                            />
                        )
                    } else if (route.name === "Inbox") {
                        return (
                            <FontAwesomeIcon icon={faMessage}
                                             color={colorName}
                                             opacity={opacity}
                                             size={iconSize}
                            />
                        )
                    } else if (route.name === "Profile") {
                        return (
                            <FontAwesomeIcon icon={faUser}
                                             color={colorName}
                                             opacity={opacity}
                                             size={iconSize}
                            />
                        )
                    }
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Search" component={AdvancedSearchScreen}/>
            <Tab.Screen name="Wishlists" component={WishlistsScreen}/>
            <Tab.Screen name="Inbox" component={InboxScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    );
};

export default HomeTabs;
