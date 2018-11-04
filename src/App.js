/** @format */

import React from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import {tokenUrl, instanceLocator} from './config';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      message: [],
      joinableRooms: [],
      joinRooms: [],
    };
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'anuj',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl,
      }),
    });

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.getRooms();
    });
  }

  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinRooms: this.currentUser.rooms,
        });
      })
      .catch(err => console.log('err in joinRooms', err));
  }

  subscribeToRoom(roomId) {
    this.setState({message: []});
    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            //console.log('message.text', message.text);
            this.setState(() => {
              return {
                message: this.state.message.concat(message),
              };
            });
          },
        },
      })
      .then(room => {
        this.setState({
          roomId: room.id,
        });
        this.getRooms();
      })
      .catch(err => console.log('err in subscribeing to room', err));
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId,
    });
  }

  createRoom(name) {
    this.currentUser
      .createRoom({
        name,
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log(err, 'error occure during the creating room'));
  }

  render() {
    // console.log(this.state.message);
    return (
      <div className="app">
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinRooms]}
        />
        <MessageList roomId={this.state.roomId} messages={this.state.message} />
        <SendMessageForm disabled={!this.state.roomId} sendMessage={this.sendMessage} />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;
