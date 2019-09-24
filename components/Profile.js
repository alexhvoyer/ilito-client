import React, {Fragment} from 'react';
import {StyleSheet, Text, View, Image, ToolbarAndroid} from 'react-native';
import {observer, inject} from 'mobx-react';
import defaultAvatar from '../assets/avatar_placeholder.png';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Profile extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Icon name="person" size={22} />,
  };

  handleLogout = () => {
    const {authStore, roomStore} = this.props;
    authStore.logout()
    roomStore.clearStorage()
  }

  render() {
    console.warn(this.props.authStore.authData.user);
    const {authStore} = this.props;
    const userAvatar = authStore.authData.user.avatar
      ? {
          uri: authStore.authData.user.avatar,
        }
      : defaultAvatar;

    return (
      <Fragment>
        <ToolbarAndroid
          style={styles.toolbar}
        >
          <Icon style={{marginLeft: '100%'}} name="exit-to-app" size={22} onPress={this.handleLogout} />
        </ToolbarAndroid>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={{
                width: 70,
                height: 70,
                borderRadius: 20,
              }}
              source={userAvatar}
            />
          </View>
          <View style={styles.mainData}>
            <Text>Тут будет текст помощи</Text>
          </View>
          <View style={styles.emptyContainer} />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
    flex: 1,
  },
  mainData: {
    flex: 2,
  },
  emptyContainer: {
    flex: 3,
  },
  toolbar: {
    height: 56,
    // flex: 1,
    // flexDirection: 'row-reverse',
    // alignSelf: 'auto',
    // textAlign: 'center',
  },
});

export default inject('authStore', 'roomStore')(observer(Profile));
