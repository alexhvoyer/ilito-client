import { Provider } from 'mobx-react'
import React from 'react'
import Layout from './layout/index'
import roomStore from './store/roomStore'
import authStore from './store/authStore'

class App extends React.Component {
  render() {
    return (
      <Provider roomStore={roomStore} authStore={authStore}>
        <Layout />
      </Provider>
    );
  }
}

export default App;
