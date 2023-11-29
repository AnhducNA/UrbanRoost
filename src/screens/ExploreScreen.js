import React from 'react';
import {ScrollView, View} from "react-native";
import PlaceCard from "../components/PlaceCard";

const ExploreScreen = () => {

    return (
        <View>
            <ScrollView>
                <PlaceCard/>
                <PlaceCard/>
            </ScrollView>
        </View>
    );
};

export default ExploreScreen;
