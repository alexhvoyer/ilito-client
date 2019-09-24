import {observable, flow, action} from 'mobx';
import { request } from 'graphql-request'
import _ from 'lodash'
import { Alert } from 'react-native'

class AuthStore {
  @observable isFetching = false;
  @observable error = null;
  @observable authData = {
    accessToken: 'scsvrheg',
    user: {
      id: '87a23864-5216-4463-b9d9-40bd4ccbce72',
      userName: null,
      email: 'alex@test.ru',
      avatar: null,
    }
  };

  @action
  logout = () => {
    this.authData = null;
  }

  signIn = flow(function*(signInData) {
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
      signInData = yield request('http://10.0.2.2:3000/graphql', query, variables);
      this.authData = signInData.validateUser;
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

  getRoom = flow(function*(roomLink) {
    try {
      this.isFetching = true;
      this.roomData = getMockRoom(roomLink);
      this.roomData = roomData;
    } catch (error) {
      this.error = error;
    } finally {
      this.isFetching = false;
    }
  });
}

const authStore = new AuthStore();
export default authStore;
