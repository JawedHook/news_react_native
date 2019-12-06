import React from 'react'
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';

const homeNavigator = createStackNavigator(
    {
        Home: { screen: HomeScreen },
        Detail: { screen: DetailScreen }
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    }
);

const tabNavigator = createMaterialBottomTabNavigator({
    Home: {
        screen: homeNavigator,
        navigationOptions:{
            tabBarLabel: 'Accueil',
            tabBarIcon: ({tintColor}) => (
                <Icon color={tintColor} size={25} name={'ios-home'}/>
            ),
            barStyle: {backgroundColor: '#3D3D3D'}
        }
    }},
    { 
        initialRouteName:'Home'
    }
) 

export default createAppContainer(tabNavigator)