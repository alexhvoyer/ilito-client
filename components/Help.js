import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

class Help extends React.Component {
  
  static navigationOptions = {
    tabBarIcon: <Icon name="help" size={22} />
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>Тут будет текст помощи</Text>
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

export default Help