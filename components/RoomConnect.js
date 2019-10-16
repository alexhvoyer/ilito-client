import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import { inject, observer } from 'mobx-react'

class RoomCreation extends React.Component {

  static navigationOptions = {
    title: 'Room connect',
  }

  state = {
      roomLink: ''
  }

  handleRoomGet = () => {
      const { roomLink } = this.state
      if (!roomLink) {
        return Alert.alert(
            null,
            'Please, paste the room link to continue'
        )
      }
      this.props.roomStore.getRoom(roomLink)
  }
  render() {

    if (this.props.roomStore.isFetching) {
        return <ActivityIndicator />
    }
    if (this.props.roomStore.roomData) {
      const { navigate } = this.props.navigation
      navigate('PlayRoom')
    }
    return (
      <View style={styles.container}>
          <Text>Введите сюда ссылку на комнату</Text>
          <TextInput
            placeholder="Ссылка на комнату"
            value={this.state.roomLink}
            onChangeText={text => this.setState({roomLink: text})}
            style={styles.TextInput}
          />
        <Button
          title="Войти в комнату"
          onPress={this.handleRoomGet}
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