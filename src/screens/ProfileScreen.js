import React, {useState} from 'react';
import {Button, Image, ScrollView, Switch, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
    faBell, faBookOpen, faBriefcase,
    faChevronRight,
    faHouse,
    faLanguage, faLock,
    faMoneyBill, faMoon,
    faRightToBracket,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import SwitchDarkMode from "../components/SwitchDarkMode";
import accountSettingsListData from "../data/accountSettingListData";

const ProfileScreen = () => {
    const accountSettingsList = accountSettingsListData;
    const [isSystemTheme, setIsSystemTheme] = useState(true);

    return (
        <ScrollView
            showsVerticalScrollIndicator={true}
            className={"mt-5 px-4 space-y-5 bg-white"}
        >
            <Text className={"font-semibold text-4xl text-black"}>Profile</Text>
            <View className={"flex-row pb-2 justify-between items-center border-b border-gray-300"}>
                <View className={"flex-row items-center space-x-3"}>
                    <FontAwesomeIcon icon={faUser}/>
                    <View>
                        <Text className={"text-xl font-semibold"}>User name</Text>
                        <Text className={"text-sm text-gray-600"}>Show profile</Text>
                    </View>
                </View>
                <View>
                    <FontAwesomeIcon color={"black"} size={20} icon={faChevronRight}/>
                </View>
            </View>
            <View className="px-3 py-2 flex-row justify-between border border-gray-200 rounded-2xl">
                <View className="my-auto">
                    <Text className="text-xl font-medium">Airbnb Your Place</Text>
                    <Text className="text-sm w-40">
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


            {/* Settings */}
            <View className="py-10 space-y-3">
                {accountSettingsList?.map((accountItem) => {
                    return (
                        <View key={accountItem.header}>
                            <Text className="font-bold text-xl text-gray-500 ">{accountItem.header}</Text>
                            <TouchableOpacity key={0}
                                              className="flex-row justify-between mt-3 items-center border-b border-gray-300 pb-3">
                                <View className="flex-row items-center space-x-2">
                                    <FontAwesomeIcon icon={faMoon} size={25} color="gray"/>
                                    <Text className="text-xl text-gray-500">
                                        DarkMode
                                    </Text>
                                </View>
                                <View>
                                    <SwitchDarkMode/>
                                </View>
                            </TouchableOpacity>
                            {accountItem.menuItems.map((menuItem) => {
                                return (
                                    <TouchableOpacity key={menuItem.title}
                                                      className="flex-row justify-between mt-3 items-center border-b border-gray-300 pb-3">
                                        <View className="flex-row items-center space-x-2">
                                            <FontAwesomeIcon icon={menuItem.icon} size={25} color="gray"/>
                                            <Text className="text-xl text-gray-500">
                                                {menuItem.title}
                                            </Text>
                                        </View>
                                        <View>
                                            <FontAwesomeIcon color={"gray"} size={25} icon={faChevronRight}/>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        </ScrollView>

    );
};

export default ProfileScreen;
