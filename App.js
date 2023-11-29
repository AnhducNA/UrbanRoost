import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import PlaceDetailScreen from "./src/screens/PlaceDetailScreen";
import SearchScreen from "./src/screens/SearchScreen";
import FilterScreen from "./src/screens/FilterScreen";
import {Provider} from "react-redux";
import {store} from "./src/app/store";

const RootStack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
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
        </Provider>
    );
}

