import React, {useContext} from 'react';
import {Text, View} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
    faHeart,
    faMagnifyingGlass,
    faMessage,
    faUser,
    faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import ExploreScreen from "./ExploreScreen";
import RoommateScreen from "./RoommateScreen";
import WishlistsScreen from "./WishlistsScreen";
import InboxScreen from "./InboxScreen";
import ProfileScreen from "./ProfileScreen";
import {ThemeContext} from "../context/ThemeContext";
import {colors} from "../config/theme";

const Tab = createBottomTabNavigator();
const HomeScreen = () => {
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarStyle: {backgroundColor: activeColors.background, minHeight: 55, paddingTop:5},
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
                    if (route.name === "Explore") {
                        return (
                            <FontAwesomeIcon icon={faMagnifyingGlass}
                                             color={colorName}
                                             opacity={opacity}
                                             size={iconSize}
                            />
                        )
                    } else if (route.name === "Roommate") {
                        return (
                            <FontAwesomeIcon icon={faUserGroup}
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
            <Tab.Screen name="Explore" component={ExploreScreen}/>
            <Tab.Screen name="Roommate" component={RoommateScreen}/>
            <Tab.Screen name="Wishlists" component={WishlistsScreen}/>
            <Tab.Screen name="Inbox" component={InboxScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    );
};

export default HomeScreen;
