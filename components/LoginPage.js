import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import logo from '../assets/icon.png';
import {inject, observer} from 'mobx-react';

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (type, value) => {
    this.setState({
      [type]: value,
    });
  };

  handleSubmit = () => {
    const {email, password} = this.state;
    if (!email || !password) {
      return Alert.alert(null, 'Please, enter email and password to login');
    }
    this.props.authStore.signIn({
      email,
      password,
    });
  };
  render() {
    if (this.props.authStore.isFetching) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <TextInput
          placeholder={this.props.authStore.error ? this.props.authStore.error : "email"}
          value={this.state.email}
          onChangeText={text => this.handleChange('email', text)}
          style={{
            ...styles.TextInput,
            borderColor: this.props.authStore.error ? "red" : "grey"
          }}
        />
        <TextInput
          placeholder={this.props.authStore.error ? this.props.authStore.error : "password"}
          value={this.state.password}
          type="password"
          onChangeText={text => this.handleChange('password', text)}
          style={{
            ...styles.TextInput,
            borderColor: this.props.authStore.error ? "red" : "grey"
          }}
        />
        <View style={styles.loginButton}>
          <Button onPress={this.handleSubmit} title="Login" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  TextInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    minWidth: 200,
  },
  loginButton: {
    margin: 20,
    minWidth: 200,
  },
});

export default inject('authStore')(observer(LoginPage));
