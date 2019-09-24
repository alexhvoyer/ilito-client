import React from "react";
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Welcome",
    headerRight: (
      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate('Help')
      }}>
        <View style={{ marginRight: 10 }}>
          <Icon name="help" size={32} />
        </View>
      </TouchableWithoutFeedback>
    )
  });

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.helloText}>
          Привет! Создай комнату или войди в уже существующую чтобы поиграть в
          эту чудесную игру с друзьями!
        </Text>
        <View style={styles.buttonsContainer} >
          <Button
            title="Создать комнату"
            color="#850886"
            onPress={() => navigate("RoomCreation")}
          />
          <Button
            title="Войти в комнату"
            onPress={() => navigate("RoomConnect")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  helloText: {
    margin: 40,
    fontSize: 18
  },
  buttonsContainer: {
    flex: 0.15,
    flexDirection: "column",
    justifyContent: "space-between"
  }
});
