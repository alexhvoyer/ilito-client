import {observable, flow, action} from 'mobx';
import _ from 'lodash'
import { Alert } from 'react-native'
import api from '../api'
import AsyncStorage from '@react-native-community/async-storage';

class AuthStore {
  @observable isFetching = false;
  @observable error = null;
  @observable authData = {
    accessToken: null,
    user: {}
  };

  @action
  logout = () => {
    AsyncStorage.setItem('userId', '').then(() => {
      this.authData = {
        accessToken: null,
        user: {},
        isLoggedOut: true
      };
    });
  }

  updateUser = flow(function*(userData) {
    const query = `
    mutation($userData: UserUpdate!){
      updateUser(userData: $userData){
        id,
        email,
        avatar,
        description,
        userName
      }
    }
    `;
    const variables = {
      userData,
    }
    try {
      this.isFetching = true;
      const { updateUser } = yield api(query, variables);
      this.authData = {
        ...this.authData,
        user: updateUser
      };
    } catch (error) {
      this.error = _.get(error, 'response.errors[0].message', 'Update user error');
      Alert.alert(
        null,
        this.error
    )
    } finally {
      this.isFetching = false;
    }
  })

  signIn = flow(function*(signInData) {
    const saveLogged = async (userId) => {
      try {
        await AsyncStorage.setItem('userId', userId)
      } catch(e) {
        console.warn('e', e)
      }
    }
    const query = `
      query Auth($email: String!, $password: String!){
        validateUser(email: $email, password: $password) {
          id,
          accessToken,
          user {
            id,
            email,
            userName,
            avatar
          }
        }
      }`;
    const variables = {
      email: signInData.email,
      password: signInData.password
    }
    try {
      this.isFetching = true;
      signInData = yield api(query, variables);
      this.authData = signInData.validateUser;
      saveLogged(this.authData.user.id);
    } catch (error) {
      this.error = _.get(error, 'response.errors[0].message', 'Auth error');
      Alert.alert(
        null,
        this.error
    )
    } finally {
      this.isFetching = false;
    }
  });

}

const authStore = new AuthStore();
export default authStore;
