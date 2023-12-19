import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import PlaceDetailScreen from "./src/screens/PlaceDetailScreen";
import SearchScreen from "./src/screens/SearchScreen";
import FilterScreen from "./src/screens/FilterScreen";
import {Provider} from "react-redux";
import {store} from "./src/store/store";
import React, {useEffect, useState} from "react";
import {Appearance} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {getData, storeData} from "./src/config/asyncStorage";
import {ThemeContext} from "./src/context/ThemeContext";

const RootStack = createStackNavigator();
//creating simple splash screen
SplashScreen.preventAutoHideAsync();
export default function App() {
    //Appearance.getColorScheme() will return
    //the current theme of the device and save it in theme state.
    const [theme, setTheme] = useState({mode: Appearance.getColorScheme()});
    //updateTheme function takes newTheme as a parameter
    //if newTheme is not passed then it will toggle the theme
    //and store the new theme in async storage
    const updateTheme = (newTheme) => {
        let mode;
        if (!newTheme) {
            mode = (theme.mode === "dark") ? "light" : "dark";
            newTheme = {mode};
        }
        setTheme(newTheme);
        storeData("homeTheme", newTheme);
    };
    //fetchStoredTheme function will fetch the theme
    //from async storage and update the theme of the app
    //async storage is used to store the last theme that the user chose
    //so that the theme will be the same when the user opens the app next time
    const fetchStoredTheme = async () => {
        try {
            const themeData = await getData('homeTheme');
            if (themeData) {
                updateTheme(themeData);
            }
        } catch ({message}) {
            alert(message);
        } finally {
            //hiding the splash screen after 1 second
            await setTimeout(() => SplashScreen.hideAsync(), 1000);
        }
    }
    //fetchStoredTheme function will be called when the app starts
    useEffect(() => {
        fetchStoredTheme();
        //if the theme of the device changes then
        //updateTheme function will be called using
        //Appearance.addChangeListener method
        Appearance.addChangeListener(({colorScheme}) => {
            updateTheme();
            setTheme({mode: colorScheme});
        });
    }, [theme.mode]);
    return (
        //we will pass the theme and updateTheme function
        //to the ThemeContext.Provider so that it can be
        //used in all the screens of the app.
        <Provider store={store}>
            <ThemeContext.Provider value={{theme, updateTheme}}>
                <NavigationContainer>
                    <RootStack.Navigator screenOptions={{headerShown: false}}>
                        <RootStack.Group>
                            <RootStack.Screen name="Home" component={HomeScreen}/>
                            <RootStack.Screen name="PlaceDetail" component={PlaceDetailScreen}/>
                        </RootStack.Group>
                        <RootStack.Group screenOptions={{presentation: 'modal'}}>
                            <RootStack.Screen name="Search" component={SearchScreen}/>
                            <RootStack.Screen name="Filter" component={FilterScreen}/>
                        </RootStack.Group>
                    </RootStack.Navigator>
                </NavigationContainer>
            </ThemeContext.Provider>
        </Provider>
    );
}

