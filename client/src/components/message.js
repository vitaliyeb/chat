import React from 'react';

class Message extends React.Component{
    constructor(props){
        super(props);
        this.isConnected = this.props.message.typeMessage != 'connected' ? true : false;
    }
    render() {
        return <li className={(this.isConnected ? (this.props.message.userLogin == this.props.myLogin ? 'myMessage ' : 'notMyMessage ') : 'connected') }>
            <p>
                {this.isConnected ? <span>{this.props.myLogin}:<br/></span> : null}
                {this.props.message.messageValue}
            </p>
            </li>
    }
}

export default Message;