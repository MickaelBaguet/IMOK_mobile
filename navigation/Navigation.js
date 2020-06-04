import React from 'react'
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {colors} from "../config/constants";
import {faCalendarAlt, faHome, faUsers} from "@fortawesome/free-solid-svg-icons";
import Logout from "../components/Logout";
/** IMPORT VIEWS HERE */
import Appointment from "../components/Appointment";
import CustomerSearch from "../components/CustomerSearch";
import AppointmentCreate from '../components/AppointmentCreate'
import CustomerDetails from "../components/CustomerDetails";
import EstateSearch from '../components/EstateSearch'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

/**
 * =====================
 * =====================
 *  STACK NAVIGATORS
 * =====================
 * =====================
 */
const screenOptions = {
    headerRight: () => (<Logout/>)
}
/** ===================
 * APPOINTMENT STACK */
const AppointmentStack = () => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
            name = 'Mes RDV'
            component = {Appointment}/>
        <Stack.Screen
            name = 'Ajouter un RDV'
            component = {AppointmentCreate}/>
        {/* ADD MORE STACK SCREENS HERE*/}
    </Stack.Navigator>
)

/** ================
 * CUSTOMER STACK */
const CustomerStack = () => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
            name = 'Rechercher un client'
            component = {CustomerSearch}/>
        <Stack.Screen
            name = 'Détails du client'
            component = {CustomerDetails}/>
        {/* ADD MORE STACK SCREENS HERE*/}
    </Stack.Navigator>
)

/** ==============
 * ESTATE STACK */
const EstateStack = () => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
            name = 'Rechercher un bien'
            component = {EstateSearch}/>
        {/* ADD MORE STACK SCREENS HERE*/}
    </Stack.Navigator>
)

/**
 * ==========================
 * ==========================
 *      MAIN NAVIGATION
 * ( BOTTOM TAB NAVIGATION )
 * ==========================
 * ==========================
 */
const tabBarOptions = {
    showLabel: false,
    activeTintColor: colors.primary
}
export default function BottomTabNavigator () {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBarOptions = {tabBarOptions}>
                <Tab.Screen
                    name='Appointments'
                    component={AppointmentStack}
                    options={{tabBarIcon: ({color}) => (<FontAwesomeIcon icon={faCalendarAlt} size={25} color={color} />)}}
                />
                <Tab.Screen
                    name="Estates"
                    component={EstateStack}
                    options={{tabBarIcon: ({color}) => (<FontAwesomeIcon icon={faHome} size={25} color={color} />)}}
                />
                <Tab.Screen
                    name="Customers"
                    component={CustomerStack}
                    options={{tabBarIcon: ({color}) => (<FontAwesomeIcon icon={faUsers} size={25} color={color}/>)}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}