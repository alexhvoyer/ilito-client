import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    Share
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { inject, observer } from 'mobx-react'

class RoomCreation extends React.Component {
  
  static navigationOptions = {
    tabBarIcon: <Icon name="plus" size={22} />
  }

  state = {
      roomName: ''
  }

  handleRoomCreate = () => {
      const { roomName } = this.state
      if (!roomName) {
        return Alert.alert(
            null,
            'Please, fill the room name to continue'
        )
      }
      this.props.roomStore.createRoom(roomName)
  }

  shareLink = async (roomLink) => {
    try {
      const result = await Share.share({
        message:
          `Приглашаю тебя поиграть в Или То! Вот ссылка на комнату: ${roomLink}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    if (this.props.roomStore.isFetching) {
      return <ActivityIndicator />
    }
    if (this.props.roomStore.roomData) {
      const { navigate } = this.props.navigation
      const { roomName, roomLink } = this.props.roomStore.roomData
      return (
        <View style={styles.container}>
          <Text>{roomName}</Text>
          <TouchableOpacity style={{ marginBottom:20 }} onPress={() => this.shareLink(roomLink)}>
            <Text>{roomLink}</Text>
          </TouchableOpacity>
          <Button
            title="Войти в комнату"
            onPress={() => navigate('PlayRoom')}
          />
        </View>
      )
    }
    return (
      <View style={styles.container}>
          <TextInput
            placeholder="Название комнаты"
            value={this.state.roomName}
            onChangeText={text => this.setState({roomName: text})}
            style={styles.TextInput}
          />
        <Button
          title="Создать комнату"
          color="#850886"
          onPress={this.handleRoomCreate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
      margin: 20
  }
});

export default inject('roomStore')(observer(RoomCreation))