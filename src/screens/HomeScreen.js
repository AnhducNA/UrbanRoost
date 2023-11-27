import React from 'react';
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

const Tab = createBottomTabNavigator();
const HomeScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarActiveTintColor: '#0b6839',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarIcon: ({focused, color, size}) => {
                    let colorName = "gray";
                    let opacity = 0.9;
                    let iconSize = 25;
                    if (focused) {
                        colorName = "#0b6839";
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
