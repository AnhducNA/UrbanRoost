import React from 'react';
import {Button, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
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

const ProfileScreen = () => {
    const accountSettingsList = [
        {
            header: "Account Settings",
            menuItems: [
                {
                    title: "Personal Information",
                    icon: faHouse,
                    link: "/",
                },
                {
                    title: "Login & Security",
                    icon: faRightToBracket,
                    link: "/",
                },
                {
                    title: "Payments and payouts",
                    icon: faMoneyBill,
                    link: "/",
                },
                {
                    title: "Translation",
                    icon: faLanguage,
                    link: "",
                },
                {
                    title: "Notification",
                    icon: faBell,
                    link: "",
                },
                {
                    title: "DarkMode",
                    icon: faMoon,
                    link: "",
                },
                {
                    title: "Privacy and Sharing",
                    icon: faLock,
                    link: "",
                },
                {
                    title: "Travel for Work",
                    icon: faBriefcase,
                    link: "",
                },
            ],
        },
        {
            header: "Hosting",
            menuItems: [
                {
                    title: "List your Space",
                    icon: faHouse,
                    link: "/",
                },
                {
                    title: "Learn about hosting",
                    icon: faHouse,
                    link: "/",
                },
                {
                    title: "Host an Experience",
                    icon: faHouse,
                    link: "/",
                },
            ],
        },
        {
            header: "Legal",
            menuItems: [
                {
                    title: "Terms of Service",
                    icon: faBookOpen,
                    link: "/",
                },
                {
                    title: "Privacy Policy",
                    icon: faBookOpen,
                    link: "/",
                },
            ],
        },
    ];
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
            {/* Settings */}
            {/*
            <View className="py-10 space-y-3">
                {accountSettingsList?.map((accountItem) => {
                    return (
                        <View key={accountItem.header}>
                            <Text className="font-bold text-xl text-gray-500 ">{accountItem.header}</Text>
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
*/}
        </ScrollView>

    );
};

export default ProfileScreen;
