/** @format */

import React from 'react';

class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
    this.handlechange = this.handlechange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlechange(e) {
    this.setState({
      message: e.target.value,
    });
    //console.log(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: '',
    });
  }

  render() {
    //console.log(this.state.message);
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          disabled={this.props.disabled}
          onChange={this.handlechange}
          value={this.state.message}
          placeholder="Typr your message and hit Enter"
          type="text"
        />
      </form>
    );
  }
}

export default SendMessageForm;
