import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

class PlayRoom extends React.Component {
  
  static navigationOptions = {
    title: 'Play Room',
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>Тут будет игровая комната</Text>
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
});

export default PlayRoom