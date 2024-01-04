import React, {useContext, useState} from 'react';
import {Button, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
    faChevronRight, faMoon, faUser
} from "@fortawesome/free-solid-svg-icons";
import SwitchDarkMode from "../components/SwitchDarkMode";
import accountSettingsListData from "../data/accountSettingListData";
import {ThemeContext} from "../context/ThemeContext";
import {colors} from "../config/theme";

const ProfileScreen = () => {
    const accountSettingsList = accountSettingsListData;
    const [isSystemTheme, setIsSystemTheme] = useState(true);
    const {theme} = useContext(ThemeContext);
    const activeColors = colors[theme.mode];
    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={true}
                className={"mt-5 px-4 py-7 space-y-5"}
                style={{backgroundColor: activeColors.background}}
            >
                <Text className={"text-4xl font-bold"} style={{color: activeColors.text}}>Profile</Text>
                <View className={"flex-row pb-2 justify-between items-center border-b border-gray-300"}>
                    <View className={"flex-row items-center space-x-3"}>
                        <FontAwesomeIcon icon={faUser} color={activeColors.text}/>
                        <View>
                            <Text className={"text-xl font-semibold"}
                                  style={{color: activeColors.text}}
                            >User name</Text>
                            <Text className={"text-sm"}
                                  style={{color: activeColors.text}}
                            >Show profile</Text>
                        </View>
                    </View>
                    <View>
                        <FontAwesomeIcon color={"black"} size={20} icon={faChevronRight}/>
                    </View>
                </View>
                <View className="px-3 py-2 flex-row justify-between border border-gray-200 rounded-2xl">
                    <View className="my-auto">
                        <Text className="text-xl font-medium"
                              style={{color: activeColors.text}}
                        >
                            Airbnb Your Place</Text>
                        <Text className="text-sm w-40" style={{color: activeColors.text}}>
                            It's simple to get up and start earning
                        </Text>
                    </View>
                    <View>
                        <Image
                            source={{
                                uri: "https://media.istockphoto.com/id/1158713117/photo/brown-two-story-all-american-home.jpg?s=612x612&w=0&k=20&c=PRsPVVX1JK8Dy0Aa_QQ46EKMO32G8QzK2x5nRjNlyhU=",
                            }}
                            className="w-28 h-28 rounded-md"
                        />
                    </View>
                </View>


                {/* Settings */}
                <View className="py-10 space-y-3">
                    {/*Login*/}
                    {/*
                    <Text className="text-lg text-gray-500">
                        Log in start planning your next up
                    </Text>
                    <View className="mt-5">
                        <Button
                            // onPress={onPressLearnMore}
                            title="Log In"
                            color="#F24B5B"
                            accessibilityLabel="Log In for Trip your way"
                        />
                    </View>
                    <Text>Don't have account ? Sign Up</Text>
                    */}
                    <View>
                        <Text className="font-bold text-xl" style={{color: activeColors.text}}>Theme Setting</Text>
                        <View
                            className="flex-row justify-between mt-3 items-center border-b border-gray-300 pb-3">
                            <View className="flex-row items-center space-x-2">
                                <FontAwesomeIcon icon={faMoon} size={25} color={activeColors.text_sub}/>
                                <Text className="text-xl "
                                      style={{color: activeColors.text_sub}}
                                >
                                    DarkMode
                                </Text>
                            </View>
                            <View>
                                <SwitchDarkMode/>
                            </View>
                        </View>
                    </View>
                    {accountSettingsList?.map((accountItem) => {
                        return (
                            <View key={accountItem.header}>
                                <Text className="font-bold text-xl"
                                      style={{color: activeColors.text}}
                                >{accountItem.header}</Text>
                                {accountItem.menuItems.map((menuItem) => {
                                    return (
                                        <TouchableOpacity key={menuItem.title}
                                                          className="flex-row justify-between mt-3 items-center border-b border-gray-300 pb-3">
                                            <View className="flex-row items-center space-x-2">
                                                <FontAwesomeIcon icon={menuItem.icon} size={25}
                                                                 color={activeColors.text_sub}/>
                                                <Text className="text-xl text-gray-500"
                                                      style={{color: activeColors.text_sub}}>
                                                    {menuItem.title}
                                                </Text>
                                            </View>
                                            <View>
                                                <FontAwesomeIcon icon={faChevronRight} color={activeColors.text_sub}
                                                                 size={25}/>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </>

    );
};

export default ProfileScreen;
