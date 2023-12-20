import React from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import InboxTab from "../components/inbox/InboxTab";
import NotificationTab from "../components/inbox/NotificationTab";

const Tab = createMaterialTopTabNavigator();
const InboxScreen = () => {
    return (
        <Tab.Navigator className={"mt-5"}>
            <Tab.Screen name="Message" component={InboxTab}/>
            <Tab.Screen name="Notification" component={NotificationTab}/>
        </Tab.Navigator>
    );
};

export default InboxScreen;
