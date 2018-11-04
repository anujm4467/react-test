/** @format */

import React from 'react';
import Message from './Message';
import ReactDOM from 'react-dom';

// --- Testing purpose ---
// const Dummy_Data = [
//   {
//     sender_id: 'anuj',
//     text: 'hii',
//   },
//   {
//     sender_id: 'vishal',
//     text: 'hii',
//   },
//   {
//     sender_id: 'vinod',
//     text: 'hii',
//   },
//   {
//     sender_id: 'bkjsd',
//     text: 'hiinkcklcn',
//   },
// ];

class MessageList extends React.Component {
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }

  componentDidMount() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    if (!this.props.roomId) {
      return (
        <div className="message-list">
          <div className="join-room">Please Join room First !!</div>
        </div>
      );
    }
    return (
      <div className="message-list">
        {this.props.messages.map((message, index) => {
          return <Message key={index} userName={message.sender_id} text={message.text} />;
        })}
      </div>
    );
  }
}

export default MessageList;
