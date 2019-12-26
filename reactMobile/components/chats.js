import React, {Component} from 'react';
import io from 'socket.io-client'
import MyStyle from "./style";
import {Text, FlatList, TextInput, Button, View} from 'react-native';


class Chats extends Component{
    constructor (props){
        super(props);
        this.myLogin = this.props.login;
        this.lastMessage = this.lastMessage.bind(this);
        this.senMessage = this.senMessage.bind(this);
        this.socket = io('https://fierce-beyond-69381.herokuapp.com/');
        this.state = {
            loading: true,
            arrMessage: [],
            text: ''
        }
    }
    render() {
        return(
            <>
                <View style={MyStyle.viewChats}>
                    {this.state.loading ? this.loading() : this.createMessages()}
                </View>
                <TextInput
                    placeholder={'send message...'}
                    value={this.state.text}
                    onChangeText={text => this.setState({text: text})}
                />
                <Button
                    title="Send message"
                    color="#f194ff"
                    onPress={() => this.senMessage()}
                />
            </>
        )
    }
    createMessages(){
        return <FlatList
            data={this.state.arrMessage}
            renderItem={({item, index}) => this.createMessage(item)}
            keyExtractor={(item, index) => index.toString()}
        />
    }
    senMessage(){
        this.socket.emit('send message', JSON.stringify({userLogin: this.myLogin ,messageValue: this.state.text, typeMessage: 'message'}));
        this.setState({text: ''});
    }
    createMessage(item){
        let isConnected = item.typeMessage == 'connected',
            isMyMessage = item.userLogin == this.myLogin;

        if (isConnected) return <Text style={MyStyle.connected}>{item.messageValue}</Text>;
        return <Text style={isMyMessage ? MyStyle.myMessage : MyStyle.notMyMessage }>{(isMyMessage) ? `${item.messageValue} :${this.myLogin}` : `${item.userLogin}: ${item.messageValue}`}</Text>
    }
    componentDidMount() {
        this.socket.emit('open user', this.myLogin);
        this.socket.on('firstMessageRender', (arrayMessage) => {this.renderMessageList(JSON.parse(arrayMessage))});
        this.socket.on('last message', (message) => this.lastMessage(JSON.parse(message)));
    }
    renderMessageList(arrayMessage){
        this.setState({loading: false, arrMessage: arrayMessage});
    }
    lastMessage(lastMessage){
        this.setState({arrMessage: this.state.arrMessage.concat(lastMessage)})
    }
    loading(){
        return (
            <><Text>Loading...</Text></>
        )
    }
}


export default Chats;