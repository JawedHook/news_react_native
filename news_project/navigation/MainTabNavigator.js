import React from 'react'
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const tabNavigator = createMaterialBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions:{
            tabBarLabel: 'Accueil',
            tabBarIcon: ({tintColor}) => (
                <Icon color={tintColor} size={25} name={'ios-home'}/>
            ),
            barStyle: {backgroundColor: '#3D3D3D'}
        }
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions:{
            tabBarLabel: 'Settings',
            tabBarIcon: ({tintColor}) => (
                <Icon color={tintColor} size={25} name={'ios-settings'}/>
            ),
            barStyle: {backgroundColor: '#3D3D3D'}
        }
    }},
    { 
        initialRouteName:'Home'
    }
) 

export default createAppContainer(tabNavigator)