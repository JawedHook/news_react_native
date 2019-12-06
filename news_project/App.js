import React from 'react';

import MainTabNavigator from './navigation/MainTabNavigator';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default class App extends React.Component {
  render(){
    return (
      <Provider store={Store}>
        <MainTabNavigator/>
      </Provider>
    );
  }
}