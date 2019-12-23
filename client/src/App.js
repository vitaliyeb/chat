import React from 'react';
import io from 'socket.io-client'
import Message from "./components/message";
import Loading from "./components/loading";
const socket = io();

class App extends React.Component{
    constructor() {
        super();
        this.sendMessage = this.sendMessage.bind(this);
        this.change = this.change.bind(this);
        this.myLogin = '';
        this.state = {
            loading: true,
            inputValue: '',
            arrMessage: []
        }
    }

    render(){
        let messages;
        messages = this.state.loading ? <Loading /> : this.state.arrMessage.map((item, index) => <Message key={index} message={item}  myLogin={this.myLogin} /> );

        return <div>
            <ul>
                {messages}
            </ul>
            <form onSubmit={this.sendMessage} action="">
                <input type="text" value={this.state.inputValue} placeholder={'Message...'} onChange={this.change}/>
                <button>➤</button>
            </form>
        </div>
    }
    getCookie(name) {
        return decodeURIComponent(document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ))[1]);
    };
    componentDidMount(){
        this.myLogin = this.getCookie("login");
        socket.emit('open user', this.myLogin);
        socket.on('firstMessageRender', (arrayMessage) => {this.renderMessageList(arrayMessage)});
        socket.on('last message', (message) => this.lastMessage(JSON.parse(message)));
    }
    change(e){
        this.setState({inputValue: e.target.value})
    }
    renderMessageList(arrayMessage){
        this.setState({loading: false, arrMessage: JSON.parse(arrayMessage)})
    }
    lastMessage(message){
        this.setState({arrMessage: this.state.arrMessage.concat(message)})
    }
    sendMessage(e){
        e.preventDefault();
        socket.emit('send message', JSON.stringify({userLogin: this.myLogin ,messageValue: this.state.inputValue, typeMessage: 'message'}));
        this.setState({inputValue: ''});
    }
}



export default App;
