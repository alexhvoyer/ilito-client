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

import _ from 'lodash'
import AsyncStorage from '@react-native-community/async-storage';

class Layout extends Component {
  state = {
    currentUser: '',
  };

  componentDidMount() {
    AsyncStorage.getItem('userId').then(value =>
      this.setState({
        currentUser: value,
      }),
    );
  }

  componentDidUpdate(prevProps) {
    console.warn(this.props.authStore)
    if (this.props.authStore.authData && this.props.authStore.authData.isLoggedOut) {
      AsyncStorage.getItem('userId').then(value => {
        if (!value) {
          this.setState({
            currentUser: '',
          });
        }
      })
    }
  }

  render() {
    const {authData} = this.props.authStore;
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
    console.warn('cc', this.state.currentUser, authData.id);
    return this.state.currentUser || authData.id ? (
      <AppContainer />
    ) : (
      <LoginPage />
    );
  }
}

export default inject('authStore')(observer(Layout));
