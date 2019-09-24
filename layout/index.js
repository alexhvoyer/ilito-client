import React, {Component} from 'react';

import {inject, observer} from 'mobx-react';

import {createStackNavigator, createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoginPage from '../components/LoginPage';
import RoomCreation from '../components/RoomCreation';
import RoomConnect from '../components/RoomConnect';
import Help from '../components/Help';
import PlayRoom from '../components/PlayRoom';
import Profile from '../components/Profile';

class Layout extends Component {
  render() {
    const RoomCreationStack = createStackNavigator(
      {
        RoomCreation: {screen: RoomCreation},
        PlayRoom: {screen: PlayRoom},
      },
      {
        navigationOptions: {
          tabBarIcon: <Icon name="add" size={22} />,
        },
        headerMode: 'none',
      },
    );

    const RoomConnectStack = createStackNavigator(
      {
        RoomConnect: {screen: RoomConnect},
        PlayRoom: {screen: PlayRoom},
      },
      {
        navigationOptions: {
          tabBarIcon: <Icon name="arrow-upward" size={22} />,
        },
        headerMode: 'none',
      },
    );

    const MainNavigator = createMaterialBottomTabNavigator(
      {
        RoomCreation: {screen: RoomCreationStack},
        RoomConnect: {screen: RoomConnectStack},
        Help: {screen: Help},
        Profile: {screen: Profile},
      },
      {
        shifting: true,
        initialRouteName: 'RoomCreation',
        swipeEnabled: true,
        animationEnabled: true,
      },
    );

    const AppContainer = createAppContainer(MainNavigator);
    return this.props.authStore.authData ? <AppContainer /> : <LoginPage />;
  }
}

export default inject('authStore')(observer(Layout));
