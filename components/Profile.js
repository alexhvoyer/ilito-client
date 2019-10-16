import React, {Fragment} from 'react';
import {StyleSheet, Text, View, Image, ToolbarAndroid} from 'react-native';
import {observer, inject} from 'mobx-react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import _ from 'lodash'

import defaultAvatar from '../assets/avatar_placeholder.png';
import Editable from '../ui/Editable'

class Profile extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Icon name="person" size={22} />,
  };

  state = {
    isEdit: false,
    userData: {
      userName: '',
      description: '',
      avatar: ''
    },
  };

  handleUserEdit = () => {
    const {user} = this.props.authStore.authData;
    this.setState({
      isEdit: !this.state.isEdit,
      userData: {
        ...user,
      },
    });
  };

  handleTextChange = (fieldName, value) => {
    this.setState({
      userData: {
        ...this.state.userData,
        [fieldName]: value
      }
    })
  };

  handleUpdateUser = () => {
    const {userData} = this.state;
    const {authStore} = this.props;
    authStore.updateUser(userData);
  };

  handleLogout = () => {
    const {authStore, roomStore} = this.props;
    authStore.logout();
    roomStore.clearStorage();
  };

  imageEdit = () => {
    const {authStore} = this.props;
    const {user} = authStore.authData;
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({
          userData: {
            ...user,
            avatar: response.uri
          }
        }, () => authStore.updateUser(this.state.userData))
      } else {
        console.warn(response);
      }
    });
  };

  onActionSelected = actionIndex => {
    switch (actionIndex) {
      case 0: {
        this.handleUserEdit();
        return;
      }
      case 1: {
        this.handleLogout();
        return;
      }
      case 2: {
        this.handleUpdateUser();
        return;
      }
    }
  };

  render() {
    const user = _.defaultTo(_.get(this, 'props.authStore.authData'), {});
    const userAvatar = user.avatar
      ? {
          uri: user.avatar,
        }
      : defaultAvatar;
    const {avatarSource, isEdit, userData} = this.state;
    const commonOptions = [
      {
        title: isEdit ? 'Cancel' : 'Edit',
        show: 'never',
      },
      {
        title: 'Logout',
        show: 'never',
      },
    ];
    const actionsArray = isEdit
      ? [
          ...commonOptions,
          {
            title: 'Save',
            show: 'always',
          },
        ]
      : [...commonOptions];
    return (
      <Fragment>
        <ToolbarAndroid
          style={styles.toolbar}
          actions={actionsArray}
          onActionSelected={this.onActionSelected}
        />
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Image
                style={styles.avatar}
                source={avatarSource || userAvatar}
              />
              <Icon
                style={styles.plusIcon}
                name="add-circle"
                size={25}
                onPress={this.imageEdit}
              />
            </View>
            <Editable
              isEdit={isEdit}
              handleTextChange={this.handleTextChange}
              fieldName="userName"
              editableValue={userData.userName}
              savedValue={user.userName}
              placeholder="Guest"
              customTextStyle={styles.userName}
            />
          </View>
          <View style={styles.mainData}>
            <Text style={{fontWeight: 'bold'}}>Description:</Text>
            <Editable
              isEdit={isEdit}
              handleTextChange={this.handleTextChange}
              fieldName="description"
              editableValue={userData.description}
              savedValue={user.description}
              placeholder="No description provided"
            />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainData: {
    flex: 2,
    marginTop: 20,
    backgroundColor: '#fff',
    marginLeft: 20,
  },
  emptyContainer: {
    flex: 3,
  },
  toolbar: {
    height: 56,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  plusIcon: {
    marginTop: -22,
    marginLeft: '33%',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});

export default inject('authStore', 'roomStore')(observer(Profile));
