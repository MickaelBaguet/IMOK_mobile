import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faBell, faCalendarAlt, faHome, faUser, faUsers} from "@fortawesome/free-solid-svg-icons";

import EstateSearch from "./EstateSearch";
import Client from "./Client";
import Appointment from "./Appointment";


const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Appointment"
            tabBarOptions={{
                // activeTintColor: '#e91e63',
                showLabel: false,
                showIcon: true,
                activeBackgroundColor: '#fff',
                inactiveBackgroundColor: '#eee',
            }}
        >
            <Tab.Screen
                name="Appointment"
                component={Appointment}
                options={{
                    tabBarLabel: 'RDV',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faCalendarAlt} size={25} />
                    ),

                }}
            />
            <Tab.Screen
                name="EstateSearch"
                component={EstateSearch}
                options={{
                    tabBarLabel: 'Biens',
                    tabBarIcon: ({ color, size }) => (
                        // <MaterialCommunityIcons name="home" color={color} size={size} />
                        <FontAwesomeIcon icon={faHome} size={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="Client"
                component={Client}
                options={{
                    tabBarLabel: 'Clients',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faUsers} size={25} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}
