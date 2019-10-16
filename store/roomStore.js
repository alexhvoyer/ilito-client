import {observable, flow, action} from 'mobx';
import api from '../api';

const getMockRoom = roomName => ({
  id: 1,
  roomName,
  roomLink: 'https://www.google.com',
});

class RoomStore {
  @observable isFetching = false;
  @observable error = null;
  @observable roomData = null;

  @action
  clearStorage = () => {
    this.error = null;
    this.roomData = null;
  };

  createRoom = flow(function*(roomName, ownerId) {
    const query = `
        mutation($roomName: String!, $ownerId: String!){
            createRoom(roomName: $roomName, ownerId: $ownerId) {
                id,
                roomName,
                ownerId
            }
        }
        `;
    const variables = {
        roomName,
        ownerId
    }
    try {
      this.isFetching = true;
      this.roomData = yield api(query, variables);
    } catch (error) {
      this.error = error;
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

const roomStore = new RoomStore();
export default roomStore;
