import { observable, flow, action } from 'mobx'

const getMockRoom = (roomName) => ({
        id: 1,
        roomName,
        roomLink: 'https://www.google.com'
    })

class RoomStore {
    @observable isFetching = false
    @observable error = null
    @observable roomData = null

    @action
    clearStorage = () => {
        this.error = null;
        this.roomData = null;
    }

    createRoom = flow(function*(creationData) {
        try {
            this.isFetching = true
            this.roomData = getMockRoom(creationData)
        } catch (error) {
            this.error = error
        } finally {
            this.isFetching = false
        }
    })

    getRoom = flow(function*(roomLink) {
        try {
            this.isFetching = true
            this.roomData = getMockRoom(roomLink)
            this.roomData = roomData
        } catch (error) {
            this.error = error
        } finally {
            this.isFetching = false
        }
    })
}

const roomStore = new RoomStore()
export default roomStore
